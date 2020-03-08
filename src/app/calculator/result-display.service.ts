import { Injectable } from '@angular/core';
import { Tile } from '../models/tile';
import { Set } from '../models/set';
import { RecognizerService } from './recognizer/recognizer.service'
import { NaiveRecognizerService } from './recognizer/naiveRecognizer.service'

@Injectable()
export class ResultDisplayService {
	
	previousTiles: Tile[] = [];
	previousSets: Set[];
	previousAgari: Tile;
	
	constructor(public recognizerService: RecognizerService, public naiveRecognizerService: NaiveRecognizerService) {
		
	}
	
	clearAll(): void {
		this.previousTiles = [];
		this.previousSets = [];
		this.previousAgari = undefined;
		this.recognizerService.resetAll();
		this.naiveRecognizerService.resetAll();
	}
	
	updateResults(tiles: Tile[], sets: Set[], agari: Tile): void {
		this.previousTiles = tiles;
		this.previousSets = sets;
		this.previousAgari = agari;
		this.recognizerService.recognize(tiles, sets, agari); 
		if(this.recognizerService.possibleHands.length == 0) {
			this.naiveRecognizerService.recognizeNaive(tiles, sets);
		}
	}
	
	//used in ExtraInfo to notify a change
	onChange(): void {
		if(this.previousTiles.length != 0) {
			this.clear();
			this.updateResults(this.previousTiles, this.previousSets, this.previousAgari);
		}
	}
	
	clear(): void { 
		this.recognizerService.possibleHands = [];
		this.naiveRecognizerService.resetAll();
		//this.naiveRecognizerService.possibleHands = [];
		//console.log(this.recognizerService.possibleHands);
	}
}