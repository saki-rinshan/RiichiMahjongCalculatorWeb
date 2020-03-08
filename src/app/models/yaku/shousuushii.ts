import { Yaku } from '../yaku';
import { Hand } from '../hand';
import { Set, SetType } from '../set';
import { Tile, TileSuit } from '../tile';

export class Shousuushii extends Yaku {
	open_han: number;
	closed_han: number;
	
	constructor(language: number) { 
        const open_han: number = 13;
		const closed_han: number = 13;

		const nameEN: String = "Shousuushii";
		const nameJP: String = "小四喜";
		const tooltipEN: String = "A hand consisting of three triplets/quads of winds and a pair of the fourth wind.";
		const tooltipJP: String = "東南西北のうち3種を刻子（もしくは槓子）にし、残り1種を雀頭にして和了した時に成立する。";
		const pronounciationEN: String = "Show-suushiii";
		const pronounciationJP: String = "ショウ​スーシー"; 
		const names = [  nameEN,  nameJP ];
		const tooltips = [  tooltipEN,  tooltipJP ];
		const pronounciations = [  pronounciationEN,  pronounciationJP ];
		super(nameEN, language, names, pronounciations, tooltips, open_han, closed_han);
		this.open_han = open_han;
		this.closed_han = closed_han;
    }

	validate(hand: Hand): boolean {
		var s_count = 0;
		var p_count = 0;
		for (let i of hand.sets) {
			//count kazepai pairs and sets
			if (i.tile.suit != TileSuit.Wind) continue;
			if (i.stype == SetType.Jantou)
				p_count++;
			else 
				s_count++;
		}
		
		return (s_count == 3 && p_count == 1);	
	}
}


