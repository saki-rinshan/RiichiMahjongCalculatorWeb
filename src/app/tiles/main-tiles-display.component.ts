import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { Tile, TileList } from '../models/tile';
import { MainTilesService } from './main-tiles.service'
import { Set, SetType } from '../models/set';
import { NaiveRecognizerService } from '../calculator/recognizer/naiveRecognizer.service';
import { LanguageService } from '../language/language-service';

@Component({
  selector: 'main-tiles-display', 
  template: `<tiles-section
	[sets]="this.mainTilesService.user_sets"  
	[tiles]="this.mainTilesService.user_tiles"
	(clickedTile)="remove($event)" 
	(clickedSet)="removeSet($event)"></tiles-section> 
	<button *ngIf="this.mainTilesService.totalTiles > 0" class="clearButton" (click)="trashTiles()">{{this.languageService.strings.clearTilesText}}</button>
	`,
  styleUrls: ['./dumb_components/tiles-section.component.css']
})
//<button (click)="forcePredict()">ForcePredict </button>
export class MainTilesDisplayComponent {
	
	//reference for html code
	setType = SetType;
	imgFolder = "assets\\img\\tiles\\Export\\Regular\\";
	user_tiles: Tile[];
	user_sets: Set[];
	constructor(public mainTilesService: MainTilesService, public naiveRecognizerService: NaiveRecognizerService, public languageService: LanguageService) {
		this.user_tiles = mainTilesService.user_tiles;
		this.user_sets = mainTilesService.user_sets;
	}
	
	remove(tile: Tile): void {
		this.mainTilesService.remove(tile);
	}
	 
	removeSet(set: Set): void {
		this.mainTilesService.removeSet(set);
	}
	
	trashTiles() {
		this.mainTilesService.clearAll();
	}
	
}