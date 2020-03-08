import { Yaku } from '../yaku';
import { Hand } from '../hand';
import { Set, SetType } from '../set';
import { Tile, TileSuit } from '../tile';

export class Shousangen extends Yaku {
	open_han: number;
	closed_han: number;
	
	constructor(language: number) { 
        const open_han: number = 2;
		const closed_han: number = 2;

		const nameEN: String = "Shousangen";
		const nameJP: String = "小三元";
		const tooltipEN: String = "Two triplets or quads of dragons, plus a pair of the third. The hand always has at least 4 han because the 2 dragon triplets are counted for yakuhai as well.";
		const tooltipJP: String = "三元牌（白・發・中）のいずれかを雀頭とし、残り2つを刻子もしくは槓子にすることで成立する。";
		const pronounciationEN: String = "Show-sahn-gen";
		const pronounciationJP: String = "ショウ​サンゲン"; 
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
		for (let set of hand.sets) {
			//count sangenpai pairs and sets
			if (set.tile.suit != TileSuit.Dragon) continue;
			if (set.stype == SetType.Jantou)
				p_count++;
			else 
				s_count++;
		}
		
		return (s_count == 2 && p_count == 1);	
	}
}


