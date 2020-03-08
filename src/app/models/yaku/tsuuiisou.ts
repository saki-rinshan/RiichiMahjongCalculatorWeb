import { Yaku } from '../yaku';
import { Hand } from '../hand';
import { Set, SetType } from '../set';
import { Tile, TileSuit } from '../tile';

export class Tsuuiisou extends Yaku {
	open_han: number;
	closed_han: number;
	
	constructor(language: number) { 
        const open_han: number = 13;
		const closed_han: number = 13;

		const nameEN: String = "Tsuuiisou";
		const nameJP: String = "字一色";
		const tooltipEN: String = "A hand composed exclusively of honor tiles.";
		const tooltipJP: String = "読んで字の如く、字牌のみで構成された和了形である。";
		const pronounciationEN: String = "Tsu-yi-so";
		const pronounciationJP: String = "ツー​イーソー"; 
		const names = [  nameEN,  nameJP ];
		const tooltips = [  tooltipEN,  tooltipJP ];
		const pronounciations = [  pronounciationEN,  pronounciationJP ];
		super(nameEN, language, names, pronounciations, tooltips, open_han, closed_han);
		this.open_han = open_han;
		this.closed_han = closed_han;
    }

	validate(hand: Hand): boolean {
		for (let i of hand.sets) {
			if (i.tile.suit < TileSuit.Wind) {
				return false;
			}
		}
		hand.removeYaku("itsu");
		return true;
	}
}


