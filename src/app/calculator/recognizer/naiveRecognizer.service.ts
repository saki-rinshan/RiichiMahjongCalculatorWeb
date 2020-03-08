import { Injectable } from '@angular/core';
import { Hand } from '../../models/hand';
import { Set, SetType } from '../../models/set';
import { Tile, TileSuit } from '../../models/tile';

import { CalculatorService } from '../../calculator/calculator.service';
import { ExtraInfoService } from '../../extra-info/extra-info.service';
import { Yaku } from '../../models/yaku'
import { YakuList } from '../../models/yakuList'

import { PredictionGrouping, PredictionCorrector } from './recognizerHelpers'

export class SimpleMapping {
	
	set: Set;
	numMatchingTiles: number;
	
	constructor(set: Set, numMatchingTiles: number) {
		this.set = set;
		this.numMatchingTiles = numMatchingTiles;
	}
	
	toString(): String {
		return this.set + " :: " + this.numMatchingTiles;
	}
}

@Injectable()
export class NaiveRecognizerService {
	
	predictionCorrector:PredictionCorrector = new PredictionCorrector();
	
	possibleHands:Hand[] = [];
	
	constructor(public extraInfoService: ExtraInfoService,  public calculatorService: CalculatorService) {
	}
	
	resetAll(): void {
		this.possibleHands = [];
	}
	recognizeNaive(tiles: Tile[], setsX: Set[]): void {
		
		this.predictionCorrector.sortTiles(tiles);
		
		var predictionGroupingArr: PredictionGrouping[] = [];
		
		var manzuTiles = tiles.filter(tile => tile.suit == TileSuit.Manzu);
		var pinzuTiles = tiles.filter(tile => tile.suit == TileSuit.Pinzu);
		var souzuTiles = tiles.filter(tile => tile.suit == TileSuit.Souzu);
		var windTiles = tiles.filter(tile => tile.suit == TileSuit.Wind); 
		var jiTiles  = tiles.filter(tile => tile.suit == TileSuit.Dragon);
		
		var suitSets: Tile[][] = [ manzuTiles, pinzuTiles, souzuTiles, windTiles, jiTiles ];
		var copySuitSets = suitSets.slice(0);
		
		
		var allPossibleSets: Map<Tile[][],Set> = this.predictionCorrector.removePairsUpdated(suitSets);
		if(allPossibleSets.size == 0) {
			allPossibleSets = this.forceAllPossiblePairs(suitSets);
		}
		
		allPossibleSets.forEach((currentPair: Set,suitSets: Tile[][]) => {
			var sets: Set[] = [ new Set(currentPair.tile, SetType.Jantou, false, "", -1, [new Tile(currentPair.tile.value, currentPair.tile.suit, currentPair.tile.name, currentPair.tile.isAka), new Tile(currentPair.tile.value, currentPair.tile.suit, currentPair.tile.name, currentPair.tile.isAka)]) ];
			
			for(let set of setsX) {
				sets.push(set);
			}
			
			for(let suitSet of suitSets) {
				if(!suitSet) {
					continue;
				}
				if(suitSet.length == 0) {
					continue;
				}
				for(var i = 0; i < 5; i++) {
				//while(suitSet.length > 0) {
					var pon: Set = this.findPon(suitSet);
					var chi: Set = this.findChi(suitSet);
					if(pon) {
						sets.push(pon);
						this.predictionCorrector.differenceTileArrays(suitSet, pon.getTiles());
					} else {
						if(chi) {
							sets.push(chi);
							this.predictionCorrector.differenceTileArrays(suitSet, chi.getTiles());
						}
					}
				}
			}
			predictionGroupingArr.push(new PredictionGrouping(sets, suitSets));
		});
		
		for(let predictionGrouping of predictionGroupingArr) {
			this.predict(predictionGrouping);
		}
		
	}
	
	
	predict(predictionGrouping: PredictionGrouping): void {
		var allPossibleSetsInSuits: Set[][][] = this.generateAllPossibleSets(predictionGrouping);
		var simpleMatchSuits: SimpleMapping[][][] = [];
		for(let suitSets of allPossibleSetsInSuits) {
			//console.log("#################");
			var suitMappings: SimpleMapping[][] = [];
			for(let possibleSets of suitSets) {
				//console.log("===");
				var simpleMatch: SimpleMapping[] = [];
				for(let possibleSet of possibleSets) {
					//console.log(possibleSet.toString());
					var numMatchingTiles: number = this.predictionCorrector.matchingNumSetTiles(possibleSet, predictionGrouping.remainingTilesInSets[possibleSet.tile.suit]);
					var mapping: SimpleMapping = new SimpleMapping(possibleSet, numMatchingTiles);
					simpleMatch.push(mapping);
				}
				simpleMatch.sort((a,b) => {
					var aDiff: number = a.numMatchingTiles;
					var bDiff: number = b.numMatchingTiles;
					if(aDiff > bDiff) {
						return -1;
					}  
					if(aDiff < bDiff) {
						return 1;
					}
					return 0;
				});
				suitMappings.push(simpleMatch);
			}
			simpleMatchSuits.push(suitMappings);
		}
		
		var topMatchesBySuit: SimpleMapping[][][] = simpleMatchSuits;
		
		
		var addedSets: Set[] = [];
		
		predictionGrouping.expectedSuitSets = predictionGrouping.calculateExpectedSuitSets(predictionGrouping.remainingTilesInSets);
		
		
		
		while(!this.isEmpty(predictionGrouping.expectedSuitSets)) {
			
			for(let suitSet of topMatchesBySuit) {
			suitSet.sort((a,b) => {
					var aDiff: number = a[0].numMatchingTiles;
					var bDiff: number = b[0].numMatchingTiles;
					if(aDiff > bDiff) {
						return -1;
					}  
					if(aDiff < bDiff) {
						return 1;
					}
					return 0;
			});
		}
		
			var expectedSuitSets: number[] = predictionGrouping.expectedSuitSets;
			var suitToRemove: number = -1;
			var debugSuit = 0;
			for(var i = 0; i < expectedSuitSets.length; i++) {
				if(expectedSuitSets[i] != 0) {
					suitToRemove = this.findMatchingIndex(i, topMatchesBySuit);
					debugSuit = i;
				}
			}
			/*
			for(let suitSets of topMatchesBySuit) {
			console.log('########');
			for(let possibleSets of suitSets) {
				console.log('====');
				for(let set of possibleSets) {
					console.log(set.toString());
					}
				}
			} 
			console.log(debugSuit);
			console.log(suitToRemove);
			console.log(predictionGrouping.expectedSuitSets);
			*/ 
			
			var choice = topMatchesBySuit[suitToRemove][0][0];
			//console.log("CHOICE :::::::::::: " + choice.toString());
			addedSets.push(choice.set);
			topMatchesBySuit[suitToRemove].splice(0,1);
			predictionGrouping.expectedSuitSets[debugSuit]--;
			this.predictionCorrector.printTileArray(this.predictionCorrector.getAllTiles(predictionGrouping.remainingTilesInSets));
		
			for(let tile of choice.set.getTiles()) {
				var index: number = this.predictionCorrector.fuckIndexOfTiles(tile, predictionGrouping.remainingTilesInSets[tile.suit]);
				if(index != -1) {
					predictionGrouping.remainingTilesInSets[tile.suit].splice(index, 1);
				}
			}
		
			for(let suitMappings of topMatchesBySuit) {
				for(let possibleMappings of suitMappings) {
					for(let mapping of possibleMappings) {
						mapping.numMatchingTiles = this.predictionCorrector.matchingNumSetTiles(mapping.set, predictionGrouping.remainingTilesInSets[mapping.set.tile.suit]);
					}
					possibleMappings.sort((a,b) => {
						var aDiff: number = a.numMatchingTiles;
						var bDiff: number = b.numMatchingTiles;
						if(aDiff > bDiff) {
							return -1;
						}  
						if(aDiff < bDiff) {
							return 1;
						}
						return 0;
					});
				}
			}
		}
		
		console.log(predictionGrouping.toString());
		
		for(let set of addedSets) {
			for(let tile of set.getTiles()) {
				predictionGrouping.tiles.push(tile);
			}
			predictionGrouping.sets.push(set);
		}
		
		var hand = new Hand(predictionGrouping.tiles, predictionGrouping.sets, undefined, undefined, this.extraInfoService.buttonList.isToggled("Ron"));
		this.calculatorService.yakuList.validate(hand);
		hand.payout = this.calculatorService.calculatePayout(hand);
		this.possibleHands.push(hand);
		
		if(this.possibleHands.length >= 1) {
			setTimeout(this.smorcScroll, 1);
		}
	}
	
	smorcScroll() {
		var element = document.getElementById("calculator");
		element.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
	}
	
	findMatchingIndex(suit: number, simpleMapping: SimpleMapping[][][]): number {
		for(var i = 0; i < simpleMapping.length; i++) {
			var suitMapping = simpleMapping[i];
			if(suitMapping[0]) {
				if(suitMapping[0][0].set.tile.suit == suit) {
					return i;
				}
			}
		}
		return -1;
	}
	
	isEmpty(arr: number[]): boolean {
		for(let num of arr) {
			if(num != 0) {
				return false;
			}
		}
		return true;
	}
	
	difference(hand: Hand, suitCount: number[]): number {
		var diff:number = 0;
		for(var i = 0; i < 5; i++) {
			diff += hand.suitCount[i] - suitCount[i];
		}
		
		var s = "";
		for(let set of hand.sets) {
			s += set.toString() + ", ";
		}
		console.log(s + " :: " + diff);
		return diff;
	}
	
	 
	generateAllPossibleSets(predictionGrouping: PredictionGrouping) : Set[][][] {
		var allPossibleSets: Set[][][] = [];
		var remainingTilesInSets: Tile[][] = predictionGrouping.remainingTilesInSets;
		for(let tiles of remainingTilesInSets) {
			var currentSuitSets: Set[][] = [];
			if(!tiles) {
				continue;
			}
			if(tiles.length == 0) {
				continue;
			}
			for(let tile of tiles) {
				var currentSets: Set[] = this.generateAllPossibleSetsForTile(tile, false);
				currentSuitSets.push(currentSets);
			}
			allPossibleSets.push(currentSuitSets);
		}
		return allPossibleSets;
	}
	
	generateAllPossibleSetsForTile(tile: Tile, generatePair: boolean): Set[] {
		var possibleSets: Set[] = [];
		
		if(generatePair) {
			possibleSets.push(new Set(tile, SetType.Jantou, false, "", -1, [tile, new Tile(tile.value, tile.suit, tile.name, tile.isAka)]));
		}
		
		var possibleChi: Set[] = this.generateAllChi(tile);
		var possiblePon: Set = this.generatePon(tile);
		possibleSets.push(possiblePon);
		
		for(let chi of possibleChi) {
			possibleSets.push(chi);
		}
		return possibleSets;
	}
	
	generateAllChi(tile: Tile): Set[] {
		var possibleChi: Set[] = [];
		var tilesInChi: Tile[] = [];
		if(tile.value > 9) {
			return possibleChi;
		}
		//1
		//123
		if(tile.value == 1) {
			possibleChi.push(this.createChiStartingXTilesBehind(tile, 0));
		}
		//2
		//123
		//234
		else if(tile.value == 2) {
			possibleChi.push(this.createChiStartingXTilesBehind(tile, -1));
			possibleChi.push(this.createChiStartingXTilesBehind(tile, 0));
		} 
		//9
		//789
		else if(tile.value == 9) {
			possibleChi.push(this.createChiStartingXTilesBehind(tile, -2));
		}
		//8
		//789
		//678
		else if(tile.value == 8) {
			possibleChi.push(this.createChiStartingXTilesBehind(tile, -2));
			possibleChi.push(this.createChiStartingXTilesBehind(tile, -1));
		} 
		
		else {
			possibleChi.push(this.createChiStartingXTilesBehind(tile, -2));
			possibleChi.push(this.createChiStartingXTilesBehind(tile, -1));
			possibleChi.push(this.createChiStartingXTilesBehind(tile, 0));
		}
		
		return possibleChi;
	}
	
	createChiStartingXTilesBehind(tile: Tile, index: number): Set {
		var chi: Set = undefined;
		var tilesInChi: Tile[] = [];
		if(index == -2) {
			tilesInChi.push(tile.getNextTile(-2));
			tilesInChi.push(tile.getNextTile(-1));
			tilesInChi.push(tile);
		} else if(index == -1) {
			tilesInChi.push(tile.getNextTile(-1));
			tilesInChi.push(tile);
			tilesInChi.push(tile.getNextTile(1));
		} else if(index == 0) {
			tilesInChi.push(tile);
			tilesInChi.push(tile.getNextTile(1));
			tilesInChi.push(tile.getNextTile(2));
		} 
		
		chi = new Set(tilesInChi[0], SetType.Shuntsu, false, "", -1, tilesInChi);
		return chi;
	}
	
	generatePon(tile: Tile): Set {
		var tilesInPon: Tile[] = [];
		tilesInPon.push(new Tile(tile.value, tile.suit, tile.name, tile.isAka));
		tilesInPon.push(new Tile(tile.value, tile.suit, tile.name, tile.isAka));
		tilesInPon.push(new Tile(tile.value, tile.suit, tile.name, tile.isAka));
		var possiblePon: Set = new Set(tile, SetType.Koutsu, false, "", -1, tilesInPon);
		return possiblePon;
	}
	
	
	
	findPon(tiles: Tile[]): Set {
		var ponTiles: Tile[] = [];
		var pon: Set = undefined;
		
		if(tiles.length < 3) {
			return pon;
		}
		
		for(var i = 0; i < tiles.length; i++) {
			var currentTile: Tile = tiles[i];
			if(i+2 > tiles.length -1) {
				return pon;
			}
			if(currentTile.equals(tiles[i+1]) && currentTile.equals(tiles[i+2])) {
				ponTiles.push(tiles[i]);
				ponTiles.push(tiles[i+1]);
				ponTiles.push(tiles[i+2]);
				pon = new Set(tiles[i], SetType.Koutsu, false, undefined, -1, ponTiles);
				return pon;
			}
		}
		return pon;
	}
	
	findChi(tiles: Tile[]): Set {
		var chiTiles:Tile[] = [];
		var chi: Set = undefined;
		
		if(tiles.length < 3) {
			return chi;
		}
		
		for(var i = 0; i < tiles.length; i++) {
			var currentTile: Tile = tiles[i];
			
			if(i+2 > tiles.length -1) {
				return chi;
			}
			
			if(currentTile.value >= 8) {
				break;
			}
			
			if((currentTile.value + 1) == tiles[i+1].value &&
				(currentTile.value + 2) == tiles[i+2].value) {
					chiTiles.push(tiles[i]);
					chiTiles.push(tiles[i+1]);
					chiTiles.push(tiles[i+2]);
					chi = new Set(tiles[i], SetType.Shuntsu, false, undefined, -1, chiTiles);
					return chi;
			}
			
		}
		
		return chi;
	}
	
	
	removePairs2(suitSetsx: Tile[][]): Map<Tile[][],Set> {
		var suitSets = suitSetsx.slice(0);
		var pairTilesMap: Map<Tile[][],Set> = new Map<Tile[][],Set>();
		for(var suit = 0; suit < suitSets.length; suit++) {
			for(var i = 0; i < suitSets[suit].length - 1; i++) {
				var pairTile = suitSets[suit][i];
				var newPairSet: Tile[] = [pairTile, new Tile(pairTile.value, pairTile.suit, pairTile.name, pairTile.isAka)];
				var pair = new Set(pairTile, SetType.Jantou, false, pairTile.name, -1, newPairSet);
				
				if((i+2) > (suitSets[suit].length - 2)) {
					if(suitSets[suit][i].equals(suitSets[suit][i+1])) {
						var substituteArray = this.getSubstituePairArray(suit, i, suitSets, false);
						pairTilesMap.set(substituteArray, pair);
					}
					continue;
				}
				
				if(suitSets[suit][i].equals(suitSets[suit][i+1]) && !suitSets[suit][i].equals(suitSets[suit][i+2])) {
					var substituteArray = this.getSubstituePairArray(suit, i, suitSets, false);
					pairTilesMap.set(substituteArray, pair);
				}
			}
		}
		return pairTilesMap;
	}
	
	
	forceAllPossiblePairs(suitSets: Tile[][]): Map<Tile[][],Set> {
		var pairTilesMap: Map<Tile[][],Set> = new Map<Tile[][],Set>();
		for(var suit = 0; suit < suitSets.length; suit++) {
			for(var i = 0; i < suitSets[suit].length; i++) {
				var pairTile = suitSets[suit][i];
				var newPairSet: Tile[] = [pairTile, new Tile(pairTile.value, pairTile.suit, pairTile.name, pairTile.isAka)];
				
				var pair = new Set(pairTile, SetType.Jantou, false, pairTile.name, -1, newPairSet);
				
				 
				if(suitSets[suit].length >= 2) {
					var substituteArray = this.getSubstituePairArray(suit, i, suitSets, false);
					pairTilesMap.set(substituteArray, pair);
				}
				
				var addArray = this.getSubstituePairArray(suit, i, suitSets, true);
				pairTilesMap.set(addArray, pair);
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
	
	chooseAll(choice: Set[], explore: Set[][], depth: number, limit: number): any {
	  if(choice.length >= limit) {
		  return choice;
	  }
	  if(depth >= explore.length) {
		  depth %= explore.length;
	  }
	  var results: Set[][] = []; 
	  for(var i = 0; i < explore[depth].length; i++) {
		  var newChoice = choice.slice(0);
		  newChoice.push(explore[depth][i]);
		  results.push(this.chooseAll(newChoice, explore, depth+1, limit));
	  }
	  return results;
  }
  
  
  
	//https://www.geeksforgeeks.org/combinations-from-n-arrays-picking-one-element-from-each-array/
	//aditit sharma
	print(possibleSets: Set[][], limit: number): Set[][] {

		var combos: Set[][] = [];
		
		var indicies: number[] = [];
		for(var i = 0; i < limit; i++) {
			indicies[i] = 0;
		}
		
		while(true) {
			var currentCombo: Set[] = [];
			for(var i = 0; i < limit; i++) {
				//s += possibleSets[i][indicies[i]].toString() + " :: "
				currentCombo.push(possibleSets[i][indicies[i]]);
			}
			combos.push(currentCombo);
			
			var next = limit - 1;
			while((next >= 0) && (indicies[next] + 1 >= possibleSets[next].length)) {
				next--;
			}
			
			if(next < 0) {
				return combos;
			}
			
			indicies[next]++;
			
			for(var i = next+1; i < limit; i++) {
				indicies[i] = 0;
			}
		}
	}	
	

	
}

