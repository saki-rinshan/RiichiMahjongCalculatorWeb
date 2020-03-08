import { Yaku } from '../yaku';
import { Hand } from '../hand';
import { Set, SetType } from '../set';
import { Tile, TileSuit } from '../tile';

export class Iipeikou extends Yaku {
	open_han: number;
	closed_han: number;
	
	constructor(language: number) { 
        const open_han: number = 0;
		const closed_han: number = 1;

		const nameEN: String = "Iipeikou";
		const nameJP: String = "一盃口";
		const tooltipEN: String = "Two sequences of the same numbers in the same suit. Ex:223344 Must be closed";
		const tooltipJP: String = "223344など、同種同数の順子が2組ある場合に成立する。　門前。";
		const pronounciationEN: String = "Yi-pey-kou";
		const pronounciationJP: String = "イー​ペーコー"; 
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
		for(var i = 1; i < hand.sets.length; i++) {
			if(hand.sets[i].stype != SetType.Shuntsu) {
				continue;
			}
			if(hand.sets[i].equals(hand.sets[i-1])) {
				peikouCounter++;
			}
		}
		if(peikouCounter != 1) {
			return false;
		}
		return true;
	}
}

