import { Tile } from './tile';
import { Set } from './set';
import { SetType } from './set';
import { Yaku } from './yaku';
import { Fu } from './fu';
import { Payout } from './payout';

export class Hand {
	
	tiles: Tile[];
	sets: Set[];
	isOpen: boolean = false;
	//standard yaku from completing hands
	validYaku: Yaku[];
	//things like tsumo, rinshankaihou
	otherYaku: Yaku[];
	payout: Payout;
	
	agari: Tile;
	agariSet: Set;
	machi: number;
	
	han: number = 0;
	fu: number = 0;
	
	
	fus: Fu[];
	
	//man, pin, sou, wind, dragon
	suitCount: number[];
	
	constructor(t?: Tile[], s?: Set[], agari?: Tile, agariSet?: Set, isOpen?: boolean) {
		//this.isOpen = isOpen;
		this.tiles = [];
		if(t) {
			this.tiles = t;
		}
		this.sets = [];
		this.validYaku = [];
		this.otherYaku = [];
		this.fus = [];
		
		if(s != null) {
			this.suitCount = [];
			for(var i = 0; i < 5; i++) {
				this.suitCount[i] = 0;
			}
			for(let set of s) {
				if(set.is_open) {
					this.isOpen = true;
				}
				this.addSet(set);
			}
		}
		if(agari) {
			this.agari = agari;
		} else {
			this.agari = t[t.length-1];
		}
		
		if(agariSet) {
			this.agariSet = agariSet;
		} else {
			if(s) {
				this.agariSet = s[s.length-1];
			}
		}
	}
	
	addSet(s:Set): void {
		//check if set is less than other sets
		for(var i = 0; i < this.sets.length; i++) {
				if(s.compare(this.sets[i]) == -1) {
					this.sets.splice(i, 0, s);
					this.addToSuitCount(s);
					return;
				} 
		}
		//if set is greater then add to end
		this.sets.push(s);
		this.addToSuitCount(s);
	}
	
	addToSuitCount(set: Set): void {
		this.suitCount[set.tile.suit]++;
	}
	
	getAllTiles(): Tile[] {
		var tiles: Tile[] = [];
		for(let set of this.sets) {
			if(set.tiles) {
				for(let tile of set.tiles) {
					tiles.push(tile);
				}
			}
		}
		if(this.sets.length == 5) {
			return tiles;
		}
		if(tiles.length == 14) {
			return tiles;
		}
		for(let tile of this.tiles) {
			tiles.push(tile);
		}
		return tiles;
	}
	
	
	addFu(fu: Fu): void {
		this.fus.push(fu);
		this.fu += fu.fu;
	}
	
	addYaku(yaku: Yaku): void {
		this.validYaku.push(yaku);
	}
	
	removeYaku(yaku: string): void {
		for(var  i =0; i < this.validYaku.length; i++) {
			if(this.validYaku[i].defaultName.indexOf(yaku) !== -1) {
				this.validYaku.splice(i, 1);
			}
		}
	}
	
	getYakuman(): Yaku[] {
		var yakuman = new Array<Yaku>();
		for(var  i =0; i < this.validYaku.length; i++) {
			if(this.validYaku[i].closed_han == 13) {
				yakuman.push(this.validYaku[i]);
			}
		}
		return yakuman;
	}
	
	containsYaku(yaku: string): boolean {
		if(this.validYaku.length == 0) {
			return;
		}
		var validYakuContains = this.validYaku.filter(y => y.defaultName.indexOf(yaku) != -1).length > 0;
		var otherYakuContains = this.otherYaku.filter(y => y.defaultName.indexOf(yaku) != -1).length > 0;
		return validYakuContains || otherYakuContains;
	}
	
	containsYakuman(): boolean {
		for(var  i =0; i < this.validYaku.length; i++) {
			if(this.validYaku[i].closed_han == 13) {
				return true;
			}
		}
		return false;
	}
	
	toString(): String {
		var handString = "";
		for(let set of this.sets) {
			handString += "|| " + set.toString() + " ||" +"\n";
		}
		return handString;
	}
}
