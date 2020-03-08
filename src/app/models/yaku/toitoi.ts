import { Yaku } from '../yaku';
import { Hand } from '../hand';
import { Set, SetType } from '../set';

export class Toitoi extends Yaku {
	open_han: number;
	closed_han: number;
	
	constructor(language: number) { 
        const open_han: number = 2;
		const closed_han: number = 2;

		const nameEN: String = "Toitoihou";
		const nameJP: String = "対々和";
		const tooltipEN: String = "The hand consists of all triplets or quads; no sequences. If all four triplets/quads are closed, this hand will become Suu Ankou ( four closed triplets ) worth yakuman instead.";
		const tooltipJP: String = "刻子を4つ作って和了した場合に成立する（槓子が含まれていてもよい）。";
		const pronounciationEN: String = "Toi-toi";
		const pronounciationJP: String = "トイトイ​ホー"; 
		const names = [  nameEN,  nameJP ];
		const tooltips = [  tooltipEN,  tooltipJP ];
		const pronounciations = [  pronounciationEN,  pronounciationJP ];
		super(nameEN, language, names, pronounciations, tooltips, open_han, closed_han);
		this.open_han = open_han;
		this.closed_han = closed_han;
    }

	validate(hand: Hand) : boolean {
		var ponCounter = 0;
		for (let set of hand.sets) {
			
			if(set.stype == SetType.Jantou) {
				continue;
			}
			if (set.stype == SetType.Koutsu || set.stype == SetType.Kantsu) {
				ponCounter++;
			}
		}
		if(ponCounter < 4) {
			return false;
		}
		return true;
	}
}
