import {  Injectable } from '@angular/core';
import { Hand } from '../../models/hand';
import { Set, SetType } from '../../models/set';
import { Tile, TileSuit } from '../../models/tile';

import { ExtraInfoService } from '../../extra-info/extra-info.service';
import { Yaku } from '../../models/yaku'
import { YakuList } from '../../models/yakuList'

import { PredictionGrouping } from './recognizerHelpers';
import { PredictionCorrector } from './recognizerHelpers'
import { CalculatorService } from '../../calculator/calculator.service';
import { NaiveRecognizerService } from './naiveRecognizer.service'

@Injectable()
export class RecognizerService {
	tiles: number;
	used: boolean[] = [];
	pairTilesMap: {[pair: number]: number[]};
	sets: Set[] = [];
	possibleHands:Hand[] = [];
	//spaghetti
	chi: Tile[];
	predictionCorrector: PredictionCorrector = new PredictionCorrector();
	
	resetAll(): void {
		this.possibleHands = [];
		this.resetArrays();
	}
	
	//spahgetthi
	constructor(public extraInfoService: ExtraInfoService, public calculatorService: CalculatorService, public naiveRecognizerService: NaiveRecognizerService) {
		this.chi = new Array<Tile>();
	}
	
	
	printTileArray(tiles: Tile[]): void {
		for(let tile of tiles) {
			//console.log(tile.toString());
		}
	}
	
	
	recognize(tiles: Tile[], calls: Set[], agari?: Tile, verbose?: boolean): void {
		
		if(tiles.length == 0) {
			return;
		}
		
		//clear yaku
		var agariSet: Set;
		var possibleSets: Map<Tile,Tile[]> = this.predictionCorrector.removePairs(tiles);
		var yaku: Yaku[] = new Array<Yaku>();
		possibleSets.forEach((currentTiles: Tile[], pair: Tile) => {
			agariSet = undefined;
			this.resetArrays();
			if(verbose) {
				//console.log("Removed pair:: " + pair.name);
				var oneLineString = "";
				for(let tile of currentTiles) {
					oneLineString += tile.name + " ";
				}
				//console.log("Remaining tiles" + oneLineString);
			}
			
			//find akadora from the tiles
			var pairDoraIndex = -1;
			
			//console.log(pair.toString());
			//this.printTileArray(tiles);
			//console.log(this.fuckIndexOfTiles(pair, tiles));
			
			var currentPair = new Set(pair, SetType.Jantou, false, pair.name, pairDoraIndex, tiles.slice(this.predictionCorrector.fuckIndexOfTiles(pair, tiles), this.predictionCorrector.fuckIndexOfTiles(pair, tiles) + 2));
			
			if(pair.equals(agari)) {
				agariSet = currentPair;
			}
			
			this.sets.push(currentPair);
			
			//add sets
			for(var i = 0; i < currentTiles.length -1; i++) {
				if(!this.used[i]) {
					if(this.existsPon(currentTiles[i],i, currentTiles, false)) {
						var akaIndex = this.findAkaIndexInTiles(currentTiles.slice(i, 4));
						var set = new Set(currentTiles[i], SetType.Koutsu, false, undefined, akaIndex, currentTiles.slice(i, i+3));
						if(!agariSet) {
							for(let tile of set.getTiles()) {
								if(tile.equals(agari)) {
									agariSet = set;
								}
							}
						}
						this.sets.push(set);
					}
					if(this.existsChi(currentTiles[i],i, currentTiles, false)) {
						var akaIndex = this.findAkaIndexInTiles(currentTiles.slice(i, 3 +1));
						var set = new Set(currentTiles[i], SetType.Shuntsu, false, undefined, akaIndex, this.chi.slice(0, this.chi.length));
						if(!agariSet) {
							for(let tile of set.getTiles()) {
								if(tile.equals(agari)) {
									agariSet = set;
								}
							}
						}
						this.sets.push(set);
					}
				}
			}
			//add calls
			for (let set of calls) {
				//console.log(set.is_open);
				this.sets.push(set);
			}

			//console.log(this.sets.length);
			if(this.sets.length == 5) {
				//console.log("Removed pair:: " + pair.name);
				var oneLineString = "";
				for(let tile of currentTiles) {
					oneLineString += tile.name + " ";
				}
				//console.log(" ");
				//console.log("Remaining tiles:: " + oneLineString);

				var hand = new Hand(currentTiles, this.sets, agari, agariSet);
				//console.log(hand.toString());
				yaku = this.calculatorService.yakuList.validate(hand);
				//temp
				//for(var i = 0; i<yaku.length;i++) {
					//this.possibleHands.push(new Hand(tiles, this.sets));
					//call calculate here
					hand.payout = this.calculatorService.calculatePayout(hand);
					this.possibleHands.push(hand);
				//}
			} 
				
		});
		
		//hand is special
		if(yaku.length == 0) {
		//try to make 7 pairs
			var sevenPairs = this.makeSevenPairs(tiles);
			if(sevenPairs.length == 7) {
				var hand = new Hand(tiles, sevenPairs, agari, agariSet);
				yaku = this.calculatorService.yakuList.validateSpecial(hand);
				hand.payout = this.calculatorService.calculatePayout(hand);
				this.possibleHands.push(hand);
			}
			//hand is kokushi or nothing
			if(sevenPairs.length != 7) {
				this.printTileArray(tiles);
				var hand = new Hand(tiles);
				yaku = this.calculatorService.yakuList.validateSpecial(hand);
				if(hand.containsYaku("Koku")) {
					hand.payout = this.calculatorService.calculatePayout(hand);
					this.possibleHands.push(hand);
				} else {
					//try the recognizer
					//fuck this shit
					//this.naiveRecognizerService.recognizeNaive(tiles);
				}
			}
		}
		if(this.possibleHands.length >= 1) {
			setTimeout(this.smorcScroll, 1);
		}
	}
	
	smorcScroll() {
		var element = document.getElementById("calculator");
		element.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
	}
	
	resetArrays(): void {
		for(var i = 0; i < this.used.length; i++) {
			this.used[i] = false;
		}
		this.sets = [];
	}
	
	existsPon(tile: Tile, index: number, tiles: Tile[], verbose?: boolean): boolean {
		if(index+2 > tiles.length -1) {
			return false;
		}
		if(tiles[index+1].equals(tile) && tiles[index+2].equals(tile) && !this.used[index+1] && !this.used[index+2]) {
			this.used[index] = true;
			this.used[index+1] = true;
			this.used[index+2]=true;
			if(verbose) {
				//console.log("isPon:: " + tile.name + " At index:: " + index + "-" + (index+2));
			}
			return true;
		}
		return false;
	}
	
	existsChi(tile: Tile, index: number, tiles: Tile[], verbose?: boolean): boolean {
		if(this.used[index]) {
			return false;
		}
		
		
		//is honor
		if(tile.value >= 8) {
			return false;
		}
		
		var counter = index+1;
		var currentTile = tile;
		var chiCounter = 1;
		var startChiTilePosition = index;
		var middleChiTilePosition = -1; 
		var endChiTilePosition = -1;
		
		
		
		while(counter < tiles.length) {
			if(currentTile.isNextInSequence(tiles[counter]) && !this.used[counter]) {
				currentTile=tiles[counter];
				chiCounter++;
				if(chiCounter==2) {
					middleChiTilePosition = counter;
				}
				if(chiCounter==3) {
					endChiTilePosition = counter;
				}
			}
			if(chiCounter==3) {
				this.used[startChiTilePosition] = true;
				this.used[middleChiTilePosition] = true;
				this.used[endChiTilePosition] = true;

				
				this.chi[0] = tiles[startChiTilePosition];
				if(middleChiTilePosition != -1) {
					this.chi[1] = tiles[middleChiTilePosition];
				}
				if(middleChiTilePosition != -1) {
					this.chi[2] = tiles[endChiTilePosition];
				}
				
				if(verbose) {
					//console.log("isChi:: " + tile.name + " At index:: " + startChiTilePosition +"," +middleChiTilePosition+"," +endChiTilePosition);
				}
				return true;
			}
			counter++;
		}
		return false;
	}
	
	
	makeSevenPairs(tiles: Tile[]): Set[] {
		var pairs = new Array<Set>();
		for(var i = 1; i < tiles.length; i+=2) {
			if(tiles[i].equals(tiles[i-1])) {
				pairs.push(new Set(tiles[i], SetType.Jantou, false, "Jantou", -1, tiles.slice(i-1, i+1)));
			}
		}
		return pairs;
	}
	
	findAkaIndexInTiles(tiles: Tile[]): number {
		for(var i = 0; i < tiles.length; i++) {
			if(tiles[i].isAkaTile()) {
				return i;
			}
		}
		return -1;
	}
}


