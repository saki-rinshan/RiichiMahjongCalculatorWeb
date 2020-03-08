import { Yaku } from '../yaku';
import { Hand } from '../hand';
import { Set, SetType } from '../set';
import { Tile, TileSuit } from '../tile';

export class Daisuushii extends Yaku {
	open_han: number;
	closed_han: number;
	
	constructor(language: number) { 
        const open_han: number = 13;
		const closed_han: number = 13;

		const nameEN: String = "Daisuushii";
		const nameJP: String = "大四喜";
		const tooltipEN: String = "The hand contains four triplets/quads of winds.";
		const tooltipJP: String = "東南西北の4種すべてを刻子（もしくは槓子）にして和了した時に成立する。";
		const pronounciationEN: String = "Die-suushii";
		const pronounciationJP: String = "ダイ​スーシー"; 
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
			//check only kazepai koutsu/kantsu
			if (set.tile.suit != TileSuit.Wind) {
				continue;
			}
			if (set.stype == SetType.Jantou) {
				continue;
			}
			count++;
		}
		
		return (count == 4);
	}
}
