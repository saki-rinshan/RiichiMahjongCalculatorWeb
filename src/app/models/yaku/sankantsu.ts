import { Yaku } from '../yaku';
import { Hand } from '../hand';
import { Set, SetType } from '../set';
import { Tile, TileSuit } from '../tile';

export class Sankantsu extends Yaku {
	open_han: number;
	closed_han: number;
	
	constructor(language: number) { 
        const open_han: number = 2;
		const closed_han: number = 2;

		const nameEN: String = "San Kantsu";
		const nameJP: String = "三槓子";
		const tooltipEN: String = "Three quads in one hand, which can be open or closed.";
		const tooltipJP: String = "槓子を3つ作って和了した時に成立する。";
		const pronounciationEN: String = "San Khan-tsu";
		const pronounciationJP: String = "サンカンツ"; 
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
			if (set.stype == SetType.Kantsu)
				count++;
		}
		
		return (count == 3);
	}
}


