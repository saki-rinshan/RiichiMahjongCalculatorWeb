import { Tile } from './tile';

export enum SetType {
	Jantou = 2, //Pair
	Koutsu = 3, //Triple
	Kantsu = 4, //Quad
	Shuntsu, //Sequence
}

export class Set {
	tile: Tile;
	tiles: Tile[];
	stype: number = -1;
	is_open: boolean = false;
	akaIndex = -1;
	
	constructor(t: Tile, st?: number, openX?:boolean, name?:String, akaIndex?: number, tilesX?: Tile[]) {
		this.stype = st;
		this.is_open = openX;
		this.akaIndex = akaIndex;
		if(tilesX) {	
			this.tiles = tilesX;
		}
		
		if(name) {
			switch(name) {
				case "Chi": {
					this.stype = SetType.Shuntsu;
					break;
				}
				case "Pon": {
					
					this.stype = SetType.Koutsu;
					break;
				}
				case "Open Kan": {
					this.stype = SetType.Kantsu;
					this.is_open = true;
					break;
				}
				case "Closed Kan": {
					this.stype = SetType.Kantsu;
					this.is_open = false;
					break;
				}
				case "Jantou": {
					this.stype = SetType.Jantou;
					this.is_open = false;
					break;
				}
			}
		}
		this.tile = tilesX[0];
	}
	
	getTiles(): Tile[] {
		return this.tiles;
	}

	equals(s:Set): boolean {
		//return (this.tile.equals(s.tile) && this.stype == s.stype && this.is_open == s.is_open);
		return (this.tile.equals(s.tile) && this.stype == s.stype);
	}
	
	compare(s:Set): number {
		
		//special case for pairs, we want them to be last
		if(s.stype == SetType.Jantou) {
			return -1;
		}
		
		if(this.stype == SetType.Jantou) {
			return 1;
		}
		
		//if(s.stype == this.stype)
		return this.tile.compare(s.tile);
	}
	
	containsAka(): boolean {
		for(let tile of this.tiles) {
			if(tile.isAka) {
				return true;
			}
		}
	}
	
	toString(): String {
		var suit = "";
		if(this.stype == SetType.Shuntsu) {
			suit = "Chi";
		}
		if(this.stype == SetType.Jantou) {
			suit = "Pair";
		}
		if(this.stype == SetType.Koutsu) {
			suit = "Pon";
		}
		if(this.stype == SetType.Kantsu) {
			suit = "Kan";
		}
		return this.tile.toString() + " :: " + suit;
	}
	
	printTileArray(): void {
		if(!this.tiles) {
			return;
		}
		for(let tile of this.tiles) {
			//console.log(tile.toString());
		}
		//console.log("x");
	}
}
