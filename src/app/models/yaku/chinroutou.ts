import { Yaku } from '../yaku';
import { Hand } from '../hand';
import { Set, SetType } from '../set';
import { Tile, TileSuit } from '../tile'

export class Chinroutou extends Yaku {
	open_han: number;
	closed_han: number;
	
	constructor(language: number) {
        const open_han: number = 13;
		const closed_han: number = 13;

		const nameEN: String = "Chinroutou";
		const nameJP: String = "清老頭";
		const tooltipEN: String = "A hand containing only 1’s and 9’s.";
		const tooltipJP: String = "手牌全体が老頭牌（一九牌）だけで構成された和了形。";
		const pronounciationEN: String = "Cheen-row-tow";
		const pronounciationJP: String = "チン​ロートー"; 
		const names = [  nameEN,  nameJP ];
		const tooltips = [  tooltipEN,  tooltipJP ];
		const pronounciations = [  pronounciationEN,  pronounciationJP ];
		super(nameEN, language, names, pronounciations, tooltips, open_han, closed_han);
		this.open_han = open_han;
		this.closed_han = closed_han;
    }


	validate(hand: Hand): boolean {
		var count = 0;
		for (let set of hand.sets) {
			if ((set.tile.value == 1 || set.tile.value == 9) && (set.stype != SetType.Shuntsu)) {
				count++;
			}
		}
		if(count == 5 && hand.sets.filter(set => set.stype == SetType.Jantou).length <= 1) {
			return true;
		}
		
		return false;	
	}
}

