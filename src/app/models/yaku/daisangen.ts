import { Yaku } from '../yaku';
import { Hand } from '../hand';
import { Set, SetType } from '../set';
import { Tile, TileSuit } from '../tile';

export class Daisangen extends Yaku {
	open_han: number;
	closed_han: number;
	
	constructor(language: number) { 
        const open_han: number = 13;
		const closed_han: number = 13;

		const nameEN: String = "Daisangen";
		const nameJP: String = "大三元";
		const tooltipEN: String = "The hand contains a triplet or quad of each type of dragon tile.";
		const tooltipJP: String = "白・發・中の3種類をすべて刻子または槓子にして和了した時に成立する。";
		const pronounciationEN: String = "Die-sahn-gen";
		const pronounciationJP: String = "ダイ​サンゲン"; 
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
			//check only sangenpai koutsu/kantsu
			if (set.tile.suit != TileSuit.Dragon) {
				continue;
			}
			if (set.stype == SetType.Jantou) {
				continue;
			}
			count++;
		}
		return (count == 3);	
	}
}
