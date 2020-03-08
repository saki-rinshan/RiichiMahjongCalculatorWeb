import { Yaku } from '../yaku';
import { Hand } from '../hand';
import { Set, SetType } from '../set';
import { Tile, TileSuit } from '../tile';

export class Ryanpeikou extends Yaku {
	open_han: number;
	closed_han: number;
	
	constructor(language: number) { 
        const open_han: number = 0;
		const closed_han: number = 3;

		const nameEN: String = "Ryanpeikou";
		const nameJP: String = "二盃口";
		const tooltipEN: String = "2 sets of identical sequences (223344 + 334455). You can count this hand as chiitoitsu (2 han) as well, but it is generally not done because Ryanpeikou is worth 3 han. Not stackable with iipeikou.";
		const tooltipJP: String = "その名の通り、一盃口が2つ出来ている和了形である。(223344 + 334455)。点数計算においても、2翻の七対子に対し、二盃口は最低でも3翻になるので、高点法により必ず二盃口として計算する。一盃口と組む事が出来ない。";
		const pronounciationEN: String = "Ree~an-pey-kou";
		const pronounciationJP: String = "リャン​ペーコー"; 
		const names = [  nameEN,  nameJP ];
		const tooltips = [  tooltipEN,  tooltipJP ];
		const pronounciations = [  pronounciationEN,  pronounciationJP ];
		super(nameEN, language, names, pronounciations, tooltips, open_han, closed_han);
		this.open_han = open_han;
		this.closed_han = closed_han;
    }

	validate(hand: Hand): boolean {
		if(hand.isOpen) {
			return false;
		}
		var peikouCounter = 0;
		var honorCounter = 0;
		for(var i = 1; i < hand.sets.length; i++) {
			if(hand.sets[i].stype != SetType.Shuntsu) {
				continue;
			}
			if(hand.sets[i].equals(hand.sets[i-1])) {
				peikouCounter++;
			}
			if(hand.sets[i].tile.suit == TileSuit.Dragon || hand.sets[i].tile.suit == TileSuit.Wind) {
				honorCounter++;
			}

		}
		if(peikouCounter != 2 || honorCounter > 1) {
			return false;
		}
		return true;
	}
}

