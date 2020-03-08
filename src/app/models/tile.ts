export enum TileValue {
	//10 & 11 left blank to ensure getHands doesn't place honors in sequences
	East = 12,
	South,
	West,
	North,
	Haku = 16,
	Hatsu,
	Chun
};

export enum TileSuit {
	Manzu = 0,
	Pinzu,
	Souzu,
	Wind,
	Dragon,
};
export class TileList {
	 
	
	
	tileNames: String[] = [
		"Chun", "Haku", "Hatsu", "Ton", "Nan", "Shaa" , "Pei", "Man1", "Man2", 
		"Man3", "Man4", "Man5", "Man5-Dora", "Man6", "Man7", "Man8", "Man9", "Pin1", "Pin2", "Pin3", "Pin4", 
		"Pin5", "Pin5-Dora", "Pin6", "Pin7", "Pin8", "Pin9", "Sou1", "Sou2", "Sou3", "Sou4", "Sou5", "Sou5-Dora", "Sou6", "Sou7", "Sou8", "Sou9",
	];
	
	honorTiles: Tile[];
	manzuTiles: Tile[];
	pinzuTiles: Tile[];
	souzuTiles: Tile[];
	
	suitTiles: Tile[][];
	tiles:Tile[];
	
	constructor() {
		
		this.honorTiles = [];
		this.manzuTiles = [];
		this.pinzuTiles = [];
		this.souzuTiles = [];
		this.suitTiles = [];
		this.tiles = [];
		
		for(let tileName of this.tileNames) {
			this.tiles.push(new Tile(-1, -1, tileName));
		}
		
		this.honorTiles = this.tiles.filter(tile => tile.suit == TileSuit.Wind || tile.suit == TileSuit.Dragon);
		this.manzuTiles = this.tiles.filter(tile => tile.suit == TileSuit.Manzu);
		this.pinzuTiles = this.tiles.filter(tile => tile.suit == TileSuit.Pinzu);
		this.souzuTiles = this.tiles.filter(tile => tile.suit == TileSuit.Souzu);
	
		this.suitTiles.push(this.manzuTiles);
		this.suitTiles.push(this.pinzuTiles);
		this.suitTiles.push(this.souzuTiles);
	
		this.suitTiles.push(this.honorTiles);
	}
	
	getTile(name: String) : Tile {
		return this.tiles.filter(tile => tile.name === name)[0];
	}
}

export class Tile {
	value: number = -1;
	suit: number = -1;
	name: String  = "";
	instances: number = 0;
	isAka = false;
	isDora = false;
	
	constructor(v?: number, s?: number, name?: String, isAka?: boolean) {
		this.isAka = isAka;
		if(v != -1 && s != -1) {
			this.value = v;
			this.suit = s;
			if(name) {
				this.name = name;
			} else {
				//no honor tile Support yet
				if(s == TileSuit.Manzu) {
					this.name = "Man"+v;
				} else if(s == TileSuit.Pinzu) {
					this.name = "Pin"+v;
				} else if(s == TileSuit.Souzu) {
					this.name = "Sou"+v;
				} 
			}
			return;
		}
		this.name = name;
		if(name) {
			if(name.indexOf('Dora') >= 0) {
				this.isAka = true;
			}
			switch(name.substring(0, 3)) {
				case "Man": { //Manzu Tile
					this.value = Number(name.charAt(3));
					this.suit = TileSuit.Manzu;
					break;
				}
				case "Pin": { // Pinzu Tile
					this.value = Number(name.charAt(3));
					this.suit = TileSuit.Pinzu;
					break;
				}
				case "Sou": { // Souzu Tile
					this.value = Number(name.charAt(3));
					this.suit = TileSuit.Souzu;
					break;
				}
				case "Chu": { // Chun Tile
					this.value = TileValue.Chun;
					this.suit = TileSuit.Dragon;
					break;
				}
				case "Hak": { // Haku Tile
					this.value = TileValue.Haku;
					this.suit = TileSuit.Dragon;
					break;
				}
				case "Hat": { // Hatsu Tile
					this.value = TileValue.Hatsu;
					this.suit = TileSuit.Dragon;
					break;
				}
				case "Nan": { // South Tile
					this.value = TileValue.South;
					this.suit = TileSuit.Wind;
					break;
				}
				case "Pei": { // North Tile
					this.value = TileValue.North;
					this.suit = TileSuit.Wind;
					break;
				}
				case "Sha": { // West Tile
					this.value = TileValue.West;
					this.suit = TileSuit.Wind;
					break;
				}
				case "Ton": { // East Tile
					this.value = TileValue.East;
					this.suit = TileSuit.Wind;
					break;
				}
			}
		}
	}

	equals(t:Tile): boolean {
		return (this.value == t.value && this.suit == t.suit);
	}
	
	
	compare(t:Tile): number {
		if (this.suit == t.suit) {
			return (this.value - t.value);
		} else if (this.suit < t.suit) {
			return (this.suit - t.suit);
		}
	}
	
	isNextInSequence(t:Tile, index?: number): boolean {
		if(index != undefined) {
			if((this.value+index) == t.value && this.suit == t.suit) {
				return true;
			}
		} else {
			if((this.value+1) == t.value && this.suit == t.suit) {
				return true;
			}
		}
		return false;
	}
	
	isSimple(): boolean {
		var value = Number(this.name.charAt(3));
		if(Number.isNaN(value) || value == 0 || value == 1 || value == 9) {
			return false;
		}
		return true;
	}
	
	isHonor(): boolean {
		var value = Number(this.name.charAt(3));
		if(Number.isNaN(value) || value == 0) {
			return true;
		}
		return false;
	}
	
	//naive
	getNextTile(position: number): Tile {
		//console.log(this.value + position);
		if(position == undefined) {
			position = 1;
		}
		if((this.value + position) < 1) {
			return undefined;
		}
		if((this.value + position) > 9) {
			return undefined;
		}
		//console.log( this.name.replace(/[0-9]/g, '') + ""+ (this.value + position));
		var replacedName = (this.name.replace(/[0-9]/g, '') + (this.value + position)).replace("-Dora", "");
		return new Tile((this.value + position), this.suit, replacedName);
	}
	
	isAkaTile(): boolean {
		return this.name.indexOf("Dora") !== -1;
	}
	
	toString(): String {
		return this.name;
	}
}


