import { Hand } from '../../models/hand';
import { Set, SetType } from '../../models/set';
import { Tile, TileSuit } from '../../models/tile';

export class PredictionGrouping {
	
	tiles: Tile[] = [];
	sets: Set[] = [];
	expectedNumberOfSets: number = 0;
	containsPair: boolean = false;
	remainingTilesInSets: Tile[][];  
	predictionCorrector: PredictionCorrector = new PredictionCorrector();
	numRemainingTiles: number;
	
	expectedSuitSets: number[];
	
	constructor(sets: Set[], remainingTilesInSets: Tile[][]) {
		this.remainingTilesInSets = remainingTilesInSets.slice();
		this.numRemainingTiles = this.predictionCorrector.getAllTiles(this.remainingTilesInSets).length;
		this.sets = sets.slice(0);
		for(let set of sets) {
			for(let tile of set.getTiles()) {
				this.tiles.push(tile);
			}
		}
		this.containsPair = ((this.tiles.length) % 3) == 2;
		this.expectedNumberOfSets = 5 - Math.round(this.tiles.length/3);
	}
	
	calculateExpectedSuitSets(suitSets: Tile[][]): number[] {
		var expectedNumberOfSetsPerSuit: number[] = [];
		var excessNumTiles: number[] = [];
		
		for(var i = 0; i < 5; i++) {
			expectedNumberOfSetsPerSuit[i] = 0;
			excessNumTiles[i] = 0;
		} 
		
		for(var i = 0; i < suitSets.length; i++) {
			if(!suitSets[i]) {
				continue;
			}
			expectedNumberOfSetsPerSuit[i] = Math.round(suitSets[i].length/3);
			excessNumTiles[i] = suitSets[i].length%3;
		}
		console.log(expectedNumberOfSetsPerSuit);
		console.log(excessNumTiles);
		
		var sum = this.sum(expectedNumberOfSetsPerSuit);
		
		if(sum != this.expectedNumberOfSets) {
			var diff = Math.abs(sum - this.expectedNumberOfSets);
			var maxIndex: number = this.maxIndex(excessNumTiles);
			var minIndex: number = this.minIndexNonZero(excessNumTiles);
			console.log(maxIndex);
			console.log(minIndex);
			if(sum > this.expectedNumberOfSets) {
				expectedNumberOfSetsPerSuit[maxIndex] -= diff;
			} else if(sum < this.expectedNumberOfSets) {
				expectedNumberOfSetsPerSuit[maxIndex] += diff;
			}
		}
		
		return expectedNumberOfSetsPerSuit;
	}
	
	toString(): void {
		console.log("---Prediction---");
		console.log("Expecting " + this.expectedNumberOfSets + " set(s)");
		console.log("Contains pair :: " + this.containsPair);
		
		console.log("Current Sets");
		for(let set of this.sets) {
			console.log(set.toString());
		}
		console.log("Remaining Tiles");
		this.predictionCorrector.printTileArray(this.predictionCorrector.getAllTiles(this.remainingTilesInSets));
		console.log("---");
	}
	
	sum(arr: number[]): number {
		var sum = 0;
		for(let num of arr) {
			sum += num;
		}
		return sum;
	}
	
	maxIndex(arr: number[]): number {
		var max: number = arr[0];
		var maxIndex = 0;
		for(var i = 1; i < arr.length; i++) {
			if(arr[i] > max) {
				max = arr[i];
				maxIndex = i;
			}
		}
		return maxIndex;
	}
	
	minIndexNonZero(arr: number[]): number {
		var min: number = arr[arr.length-1];
		var minIndex = arr.length-1;
		for(var i = arr.length-2; i >= 0; i--) {
			if(arr[i] == 0) {
				continue;
			}
			if(arr[i] < min) {
				min = arr[i];
				minIndex = i;
			}
		}
		return minIndex;
	}
}

//used for correcting excess or not enough tiles from detector
export class PredictionCorrector {
	
	correctTiles(tiles: Tile[], verbose?: boolean): Tile[] {
		var correctedTiles = new Array<Tile>();
		
		var allTiles = new Array<Tile[]>();
		var manzuTiles = tiles.filter(tile => tile.suit == TileSuit.Manzu);
		var pinzuTiles = tiles.filter(tile => tile.suit == TileSuit.Pinzu);
		var souzuTiles = tiles.filter(tile => tile.suit == TileSuit.Souzu);
		var honorTiles = tiles.filter(tile => tile.suit == TileSuit.Wind || tile.suit == TileSuit.Dragon);
		allTiles.push(manzuTiles);
		allTiles.push(pinzuTiles);
		allTiles.push(souzuTiles);
		allTiles.push(honorTiles);
		this.sortTileArrays(allTiles);
		
		//console.log(allTiles);
		
		//choose one suit to have the pair at random and then fill all the other tiles to complete sets
		//then trim everything down to 14 tiles
		var determinedPair = this.determineRandomPairSuit(allTiles);
		if(verbose) {
			//console.log("determinedPair:: " + determinedPair + " :: " + allTiles[determinedPair][0].toString());  
		}
		var i = -1;
		for(let tileSuitArr of allTiles) {
			i++;
			if(verbose) {
				if(tileSuitArr[0])	{
					//console.log(i + "::" + tileSuitArr[0].toString());
				}
			}
			if(i == determinedPair) {
				continue;
			}
			var mod3 = tileSuitArr.length % 3;
			if(tileSuitArr[0]) {
				var suit = tileSuitArr[0].suit;
			}
			if(mod3 == 0) {
				continue;
			} else {
				for(var i = 0; i < (3-mod3); i++) {
					tileSuitArr.push(this.generateRandomTile(suit));
				}
				if(verbose) {
					this.printTileArray(tileSuitArr);
				}
			}
		}
		correctedTiles = this.getAllTiles(allTiles);
		//console.log("eeeeeeeeeeeeeee");
		this.printTileArray(correctedTiles);
		//console.log("EEEEE");
		if(correctedTiles.length == 14) {
				return correctedTiles;
		} else if(correctedTiles.length > 14) {
			//(expecting everything to be in multiples of 3 + 14, becuase we have filled everything)
			//trim sets from the tiles from largest to sets first, end if 14 tiles
		
			for(var j = allTiles.length; j > 0; j--) {
				if(!allTiles[j]) {
					continue;
				}
				var k = allTiles[j].length-1;
				//console.log(allTiles[j][k]);
				allTiles[j].splice(k--, 1);
				allTiles[j].splice(k--, 1);
				allTiles[j].splice(k--, 1);
				correctedTiles = this.getAllTiles(allTiles);
				if(correctedTiles.length == 14) {
					return correctedTiles;
				}
			}
		} else {
			//console.log("hello");
			//pad the suit with the most tiles
			while(correctedTiles.length < 14) {
				var mostSuit = allTiles[allTiles.length-1][0].suit;
				correctedTiles.push(this.generateRandomTile(mostSuit));
			}
		}
		return correctedTiles;
	}
	
	sortTiles(tiles: Tile[]): void {	
		for(var i = 1; i < tiles.length; i++) {	
			var key = tiles[i];	
			var j = i-1;	
			while(j >=0 && tiles[j].compare(key) >= 1) {	
				tiles[j+1] = tiles[j];	
				j = j-1;	
			}	
			tiles[j+1] = key;	
		}	
	}
	
	//sort tile arrats by length
	sortTileArrays(tiles: Tile[][]): void {	
		for(var i = 1; i < tiles.length; i++) {	
			var key = tiles[i];	
			var j = i-1;	
			while(j >=0 && tiles[j].length > key.length) {	
				tiles[j+1] = tiles[j];	
				j = j-1;	
			}	
			tiles[j+1] = key;	
		}	
	}
	
	//doesnt take into account honorTiles
	generateRandomTile(suit: number): Tile {
		var randValue = Math.floor(Math.random() * 9) + 1;
		return new Tile(randValue, suit);
	}
	
	printTileArray(tiles: Tile[]): void {
		for(let tile of tiles) {
			console.log(tile.toString());
		}
	}
	
	determineRandomPairSuit(tiles: Tile[][]): number  {
		var chosenIndex = -1;
		var randomIndexArray = [];
		//try to not use honor tiles as pairs unless absolutely neccesary
		var honorIndex = -1;
		for(var i = 0; i < tiles.length; i++) {	
			if((tiles[i].length % 3) == 2) {
				if(tiles[i][0]) {
					var suit = tiles[i][0].suit;
					if(suit == TileSuit.Wind || TileSuit.Dragon) {
						honorIndex = i;
					}
				}
				randomIndexArray.push(i);
			}
		}
		
		//only pair was honor suit, we will use it as the chosen pair
		if(honorIndex != -1 && randomIndexArray.length == 1) {
			chosenIndex = Math.floor(Math.random() * randomIndexArray.length);
		} else {
			//keep going until we get a nonhonor pair, cause we want the honor pair to correct into a set
			while(true) {
				chosenIndex = Math.floor(Math.random() * randomIndexArray.length);
				//console.log(randomIndexArray.length);
				if(chosenIndex != honorIndex) {
					break;
				}
			}
		}
		return randomIndexArray[chosenIndex];
	}
	
	getAllTiles(tiles: Tile[][]): Tile[] {
		var allTiles = new Array<Tile>();
		for(var i = 0; i < tiles.length; i++) {
			if(tiles[i]) {
				for(var j = 0; j < tiles[i].length; j++) {
					allTiles.push(tiles[i][j]);
				}
			}
		}
		return allTiles;
	}
	
	differenceTileArrays(arr1: Tile[], arr2: Tile[]): void {
		for(let tile of arr2) {
			for(var i = 0; i < arr1.length; i++) {
				if(tile.equals(arr1[i])) {
					arr1.splice(i, 1);
				}
			}
		} 
	}
	
	removePairs(tiles: Tile[]): Map<Tile,Tile[]> {
		var pairTilesMap: Map<Tile,Tile[]> = new Map<Tile,Tile[]>();
		for(var i = 0; i < tiles.length - 1; i++) {
			if(i+2 > tiles.length-2) {
				if(tiles[i].equals(tiles[i+1])) {
					pairTilesMap.set(tiles[i], this.copyWithoutPair(tiles[i],tiles));
				}
				continue;
			}
			if(tiles[i].equals(tiles[i+1]) && !tiles[i].equals(tiles[i+2])) {
					pairTilesMap.set(tiles[i], this.copyWithoutPair(tiles[i],tiles));
			}
		}
		return pairTilesMap;
	}
	
	
	
	copyWithoutPair(pair: Tile, tiles: Tile[]): Tile[] {
		var tilesWithoutPair: Tile[] = new Array<Tile>();
		var tilesWithoutPairCounter = 0;
		var pairCounter = 0;
		for(var i = 0; i < tiles.length; i++) {
			if(tiles[i].equals(pair) && pairCounter < 2) {
				pairCounter++;
				continue;
			}
			tilesWithoutPair[tilesWithoutPairCounter++] = tiles[i];
		}
		return tilesWithoutPair;
	}
	
	
	fuckIndexOfTiles(tile: Tile, tiles: Tile[]): number {
		for(var i =0; i < tiles.length; i++) {
			if(tiles[i].equals(tile)) {
				return i;
			}
		}
		return -1;
	}
	
	removePairsUpdated(suitSets: Tile[][]): Map<Tile[][],Set> {
		var pairTilesMap: Map<Tile[][],Set> = new Map<Tile[][],Set>();
		for(var suit = 0; suit < suitSets.length; suit++) {
			var tiles: Tile[] = suitSets[suit];
			for(var i = 0; i < tiles.length - 1; i++) {
				var pairTile: Tile = tiles[i];
				var newPairSet: Tile[] = [pairTile, new Tile(pairTile.value, pairTile.suit, pairTile.name)];
				var pair = new Set(pairTile, SetType.Jantou, false, pairTile.name, -1, newPairSet);
				if(i+2 > tiles.length-2) {
					if(tiles[i].equals(tiles[i+1])) {
						var substituteArray = this.getSubstituePairArray(suit, i, suitSets, false);
						pairTilesMap.set(substituteArray, pair);
					}
					continue;
				}
				if(tiles[i].equals(tiles[i+1]) && !tiles[i].equals(tiles[i+2])) {
					var substituteArray = this.getSubstituePairArray(suit, i, suitSets, false);
					pairTilesMap.set(substituteArray, pair);
				}
			}
		}
		return pairTilesMap;
	}
	
	getSubstituePairArray(suitIndex: number, pairIndex: number, suitSets: Tile[][], removeOnlySelf: boolean): Tile[][] {
		var substituteArray: Tile[][] = [];
		
		for(var suit = 0; suit < suitSets.length; suit++) {
			for(var i = 0; i < suitSets[suit].length; i++) {
				if(suitIndex == suit) {
					if(i == pairIndex) {
						continue;
					}
					if(!removeOnlySelf) {
						if(i == pairIndex + 1) {
							continue;
						}
						if(i == 0 && (pairIndex+1) == suitSets[suit].length) {
							continue;
						}
							
					}						
				}
				if(!substituteArray[suit]) {
					substituteArray[suit] = [];
				}
				substituteArray[suit].push(suitSets[suit][i]);
			}
		}
		return substituteArray;
	}
	
	matchingNumSetTiles(set: Set, tiles: Tile[]): number {
		var copyTiles = tiles.slice();
		var setTiles: Tile[] = set.getTiles();
		var match: number = 0;
		for(let tile of setTiles) {
			var index = this.fuckIndexOfTiles(tile, copyTiles);
			if(index != -1) {
				match++;
				copyTiles.splice(index, 1);
			}
		}
		return match;
	}
}