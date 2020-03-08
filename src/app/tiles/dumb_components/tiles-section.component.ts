import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Tile, TileList } from '../../models/tile';
import { Set, SetType } from '../../models/set';
import { MainTilesService } from '../main-tiles.service'

@Component({
  selector: 'tiles-section', 
  templateUrl: './tiles-section.component.html',
  styleUrls: ['./tiles-section.component.css']
})

export class TilesSectionComponent {
	
	//reference for html code
	setType = SetType;
	imgFolder = "assets\\img\\tiles\\Export\\Regular\\";
	@Input()tiles: Tile[];
	@Input()sets: Set[];
	@Output() clickedTile: EventEmitter<Tile> = new EventEmitter<Tile>();
	@Output() clickedSet: EventEmitter<Set> = new EventEmitter<Set>();
	
	constructor(public mainTilesService: MainTilesService) {
		
	}
	
	tileClicked(tile: Tile): void {
		this.clickedTile.emit(tile);
	}
	
	setClicked(set: Set): void {
		this.clickedSet.emit(set);
	}
}