import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Tile, TileList} from '../../models/tile';
import { MainTilesService } from '../main-tiles.service'
import { Button, SetButtonType } from '../../button/button';
import { Set, SetType } from '../../models/set';

@Component({
  selector: 'tiles', 
  templateUrl: './tiles.component.html',
  styleUrls: ['./tiles.component.css', '../tiles-buttons.component.css',]
})

export class TilesComponent {
	
	public imgFolder = "assets\\img\\tiles\\Export\\Regular\\";
	
	public setButtons: Button[];
	public tileList: TileList;
	@Output() clicked: EventEmitter<Tile> = new EventEmitter<Tile>();
	@Input() shouldDisableFromParent;
	@Input() isDoraSelection = false;
	
	constructor(public mainTilesService: MainTilesService) {
			this.setButtons = this.mainTilesService.setButtonList.buttons;
			this.tileList = this.mainTilesService.tileList;
	}
	
	shouldDisableTile(tile: Tile): boolean {
		if(tile.instances == 4) {
			return true;
		}
		if(this.isDoraSelection) {
			return false;
		}
		if(tile.instances >= 1 && (this.setButtons[SetButtonType.OpenKan].isToggled 
		|| this.setButtons[SetButtonType.ClosedKan].isToggled)) {
			return true;
		}
		if(tile.isAka) {
			if(tile.instances >= 2) {
				return true;
			}
			
			if(this.setButtons[SetButtonType.OpenKan].isToggled 
			|| this.setButtons[SetButtonType.ClosedKan].isToggled 
			|| this.setButtons[SetButtonType.Pon].isToggled) {
				return true;
			}
		}
		
		if(tile.instances >= 2 && (this.setButtons[SetButtonType.Pon].isToggled)) {
			return true;
		}
		if(this.setButtons[SetButtonType.Chi].isToggled) {
			//can't chi if it is honor tile or greater than 7
			var value = Number(tile.name.charAt(3));
			if(value > 7 || tile.isHonor()) {
				return true;
			}
			
			var tileIndex = this.tileList.tiles.indexOf(tile);
			var tile1 = this.mainTilesService.tileList.tiles[tileIndex+1];
			var tile2 = this.mainTilesService.tileList.tiles[tileIndex+2];
			
			if(tile1.isAka) {
				tile1= this.mainTilesService.tileList.tiles[tileIndex+2];
				tile2 = this.mainTilesService.tileList.tiles[tileIndex+3];
			} else if(tile2.isAka) {
				tile2 = this.mainTilesService.tileList.tiles[tileIndex+3];
			}
			var tilesAround = [tile1, tile2];
			for(let tileAround of tilesAround) {
				if(tileAround == undefined) {
					continue;
				}
				if(!tileAround.isHonor() && tileAround.instances == 4 ) {
					return true;
				}
			}
		}
		return false;
	}
	
	tileClicked(tile: Tile): void {
		this.clicked.emit(tile);
	}
}
