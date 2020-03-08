import { Yaku } from '../yaku';
import { Hand } from '../hand';
import { Set, SetType } from '../set';

export class Chanta extends Yaku {

    open_han: number;
	closed_han: number;
	
	constructor(language: number) {
        const open_han: number = 1;
		const closed_han: number = 2;

		const nameEN: String = "Chantaiyao";
		const nameJP: String = "全帯么";
		const tooltipEN: String = "Each set must contain a terminal/honor: Triplets must be terminals/honors, sequences must be either 123 or 789, the pair must also be a terminal/honor. The hand must contain at least one sequence.";
		const tooltipJP: String = "使用できるのは123の順子と789の順子、および一九字牌の対子と刻子であり、タンヤオとは正反対な手役であると言える。";
		const pronounciationEN: String = "Chanta";
		const pronounciationJP: String = "チャンタ"; 
		const names = [  nameEN,  nameJP ];
		const tooltips = [  tooltipEN,  tooltipJP ];
		const pronounciations = [  pronounciationEN,  pronounciationJP ];
		super(nameEN, language, names, pronounciations, tooltips, open_han, closed_han);
		this.open_han = open_han;
		this.closed_han = closed_han;
    }
	
	validate(hand: Hand): boolean {
		for (let set of hand.sets) {
			//Check range differently for sequence
			if (set.stype == SetType.Shuntsu) {
				if (set.tile.value != 1 && set.tile.value != 7) {
					return false;
				}
			} else {
				if (set.tile.value != 1 && set.tile.value < 9) {
					return false;
				}
			}
		}
		var sequence: Set[] = hand.sets.filter(set => set.stype == SetType.Shuntsu);
		if(sequence.length == 0) {
			return false;
		}
		return true;
	}
}

