import { Yaku } from '../yaku';
import { Hand } from '../hand';
import { Set, SetType } from '../set';
import { Tile, TileSuit } from '../tile';

export class Sanankou extends Yaku {
	open_han: number;
	closed_han: number;
	
	constructor(language: number) { 
        const open_han: number = 2;
		const closed_han: number = 2;

		const nameEN: String = "San Ankou";
		const nameJP: String = "三暗刻";
		const tooltipEN: String = "The hand contains three closed sets of triplets or quads. The tiles for the three triplets or quads must all be self-drawn in order to count. The fourth set can be any type of set; it can even be open.";
		const tooltipJP: String = "暗刻が3つあることのみが条件であるため、残りの1面子は順子でもよく、副露してもよい。暗槓が含まれていてもよい。";
		const pronounciationEN: String = "San Ahncle";
		const pronounciationJP: String = "サン​アンコー"; 
		const names = [  nameEN,  nameJP ];
		const tooltips = [  tooltipEN,  tooltipJP ];
		const pronounciations = [  pronounciationEN,  pronounciationJP ];
		super(nameEN, language, names, pronounciations, tooltips, open_han, closed_han);
		this.open_han = open_han;
		this.closed_han = closed_han;
    }

	validate(hand: Hand): boolean {
		//more than one set open, can't be sanankou
		if(hand.sets.filter(set => set.is_open == true).length > 1) {
			return false;
		}
		//copied from toitoi
		var ponCounter = 0;
		for (let set of hand.sets) {
			
			if(set.stype == SetType.Jantou) {
				continue;
			}
			if (set.stype == SetType.Koutsu ||  set.stype == SetType.Kantsu) {
				ponCounter++;
			}
		}
		if(ponCounter < 3) {
			return false;
		}
		return true;
	}
}


