import { Yaku } from '../yaku';
import { Hand } from '../hand';
import { Set, SetType } from '../set';
import { Tile, TileSuit } from '../tile'

export class ChuurenPoutou extends Yaku {
	open_han: number;
	closed_han: number;
	
	constructor(language: number) { 
        const open_han: number = 0;
		const closed_han: number = 13;

		const nameEN: String = "Chuuren Poutou";
		const nameJP: String = "九蓮宝燈";
		const tooltipEN: String = "A hand composed of 1-1-1-2-3-4-5-6-7-8-9-9-9 of one suit, plus any other tile of the same suit. Must be closed and a closed kan of 1 and 9 is also not accepted. (https://ja.wikipedia.org/wiki/九蓮宝燈";
		const tooltipJP: String = "門前で「1112345678999+X」の形をあがった時に成立する。1や9を暗槓した形も認められない。";
		const pronounciationEN: String = "Chuu-ren Poe-toe";
		const pronounciationJP: String = "チューレン​ポウトー"; 
		const names = [  nameEN,  nameJP ];
		const tooltips = [  tooltipEN,  tooltipJP ];
		const pronounciations = [  pronounciationEN,  pronounciationJP ];
		super(nameEN, language, names, pronounciations, tooltips, open_han, closed_han);
		this.open_han = open_han;
		this.closed_han = closed_han;
    }

	//111 2345678 999 +any other tile from that suit
	//must be closed
	validate(hand: Hand): boolean {
		if(hand.isOpen) {
			return false;
		}
		 
		if(!hand.containsYaku("Chinitsu")) {
			return false;
		}
		
		if(hand.sets.filter(set => set.stype == SetType.Kantsu).length >= 1) {
			return false;
		}
		
		for(var i = 1; i < hand.sets.length; i++) {
			var allTiles = hand.getAllTiles();
			var ones = allTiles.filter(tile => tile.value == 1);
			var nines = allTiles.filter(tile => tile.value == 9);
			if(ones.length < 3) {
				return false;
			}
			if(nines.length < 3) {
				return false;
			}
			var multipleCounter = 0;
			for(var c = 2; c <= 8; c++) {
				if(allTiles.filter(tile => tile.value == c).length == 1) {
					continue;
				} else {
					if(multipleCounter>=1) {
						return false;
					}
					multipleCounter++;
				}
			}			
		}
		return true;
	}
}

