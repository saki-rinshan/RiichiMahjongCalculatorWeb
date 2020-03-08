import { Yaku } from '../yaku';
import { Hand } from '../hand';
import { Set, SetType } from '../set';
import { Tile, TileSuit } from '../tile';

export class JunchanTayao extends Yaku {
	open_han: number;
	closed_han: number;
	
	constructor(language: number) { 
        const open_han: number = 2;
		const closed_han: number = 3;

		const nameEN: String = "Jun Chantaiyao";
		const nameJP: String = "純全帯么九";
		const tooltipEN: String = "The jun in junchan literally means 'pure.' As such, no honor tiles are included. The sequences must be 1-2-3 and 7-8-9, and triplets and the pair must be 1’s and 9’s. 3 han if closed. Not stackable with Chanta.";
		const tooltipJP: String = "4面子1雀頭の全てに老頭牌（一九牌）が関わっている形。使用できるのは123の順子と789の順子、および111、999といった老頭牌の刻子である。門前3翻。全帯么と組む事が出来ない。";
		const pronounciationEN: String = "June-chan";
		const pronounciationJP: String = "ジュンチャン"; 
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
				if (set.tile.value > 1 && set.tile.value < 7)
					return false;
			} else {
				if (set.tile.value != 1 && set.tile.value != 9)
					return false;
			}
		}
		hand.removeYaku("Chanta");
		return true;
	}
}

