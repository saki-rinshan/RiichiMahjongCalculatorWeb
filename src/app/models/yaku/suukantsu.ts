import { Yaku } from '../yaku';
import { Hand } from '../hand';
import { Set, SetType } from '../set';
import { Tile, TileSuit } from '../tile';

export class Suukantsu extends Yaku {
	open_han: number;
	closed_han: number;
	
	constructor(language: number) { 
        const open_han: number = 13;
		const closed_han: number = 13;

		const nameEN: String = "Suu Kantsu";
		const nameJP: String = "四槓子";
		const tooltipEN: String = "Four quads in one hand, which can be open or closed.";
		const tooltipJP: String = "暗槓・明槓を問わず槓子を4つ作って和了った時に成立する。";
		const pronounciationEN: String = "Sue Khan-tsu";
		const pronounciationJP: String = "スー​カンツ"; 
		const names = [  nameEN,  nameJP ];
		const tooltips = [  tooltipEN,  tooltipJP ];
		const pronounciations = [  pronounciationEN,  pronounciationJP ];
		super(nameEN, language, names, pronounciations, tooltips, open_han, closed_han);
		this.open_han = open_han;
		this.closed_han = closed_han;
    }

	validate(hand: Hand): boolean {
		var k = 0;
		for (let set of hand.sets) {
			if (set.stype == SetType.Kantsu)
				k++;
		}

		return (k == 4);
	}
}
