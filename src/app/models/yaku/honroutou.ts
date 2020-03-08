import { Yaku } from '../yaku';
import { Hand } from '../hand';
import { Set, SetType } from '../set';
import { Tile, TileSuit } from '../tile';

export class Honroutou extends Yaku {
	open_han: number;
	closed_han: number;
	
	constructor(language: number) { 
        const open_han: number = 2;
		const closed_han: number = 2;

		const nameEN: String = "Honroutou";
		const nameJP: String = "混老頭";
		const tooltipEN: String = "The hand consists of all terminals and honors. Is always at least 4 Han because by definition it is always accompanied by either Toitoi or Chiitoitsu.";
		const tooltipJP: String = "て牌が全て么九牌（一九牌と字牌）だけで構成された和了形。";
		const pronounciationEN: String = "Hone-ron-tow";
		const pronounciationJP: String = "ホン​ロウトー"; 
		const names = [  nameEN,  nameJP ];
		const tooltips = [  tooltipEN,  tooltipJP ];
		const pronounciations = [  pronounciationEN,  pronounciationJP ];
		super(nameEN, language, names, pronounciations, tooltips, open_han, closed_han);
		this.open_han = open_han;
		this.closed_han = closed_han;
    }

	validate(hand: Hand): boolean {
		//can't have runs
		if(hand.sets.filter(set => set.stype == SetType.Shuntsu).length > 0) {
			return false;
		}
		for (let set of hand.sets) {
			if(set.tile.value > 1 && set.tile.value < 9) {
					return false;
			}
		}
		return true;
	}
}

