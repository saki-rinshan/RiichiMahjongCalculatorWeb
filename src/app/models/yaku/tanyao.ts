import { Yaku } from '../yaku';
import { Hand } from '../hand';
import { Set, SetType } from '../set';

export class Tanyao extends Yaku {
	open_han: number;
	closed_han: number;
	
	constructor(language: number) { 
        const open_han: number = 1;
		const closed_han: number = 1;

		const nameEN: String = "Tanyao";
		const nameJP: String = "断么九";
		const tooltipEN: String = "A hand consisting of only simple tiles 2-8; No honor or terminal tiles.";
		const tooltipJP: String = "中張牌（数牌の2〜8）のみを使って手牌を完成させた場合に成立する。";
		const pronounciationEN: String = "Tah-n-yow";
		const pronounciationJP: String = "タン​ヤオ"; 
		const names = [  nameEN,  nameJP ];
		const tooltips = [  tooltipEN,  tooltipJP ];
		const pronounciations = [  pronounciationEN,  pronounciationJP ];
		super(nameEN, language, names, pronounciations, tooltips, open_han, closed_han);
		this.open_han = open_han;
		this.closed_han = closed_han;
    }
	
	validate(hand: Hand) : boolean {
		//Check sets
		for (let set of hand.sets) {
			//Check range differently for sequence
			if (set.tile.value < 2 || set.tile.value > 8 || 
			   (set.stype == SetType.Shuntsu && set.tile.value > 6)) {
				return false;
			}
		}

		if(hand.sets.filter(set => set.stype == SetType.Jantou).length >=2) {
			return false;
		}
		return true;
	}
}
