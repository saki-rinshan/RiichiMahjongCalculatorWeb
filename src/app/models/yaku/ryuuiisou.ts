import { Yaku } from '../yaku';
import { Hand } from '../hand';
import { Set, SetType } from '../set';
import { Tile, TileSuit, TileValue } from '../tile';

export class Ryuuiisou extends Yaku {
	
	open_han: number;
	closed_han: number;
	
	constructor(language: number) { 
        const open_han: number = 13;
		const closed_han: number = 13;

		const nameEN: String = "Ryuuiisou";
		const nameJP: String = "緑一色";
		const tooltipEN: String = "A hand containing only green tiles. Green tiles are: 2, 3, 4, 6, 8 of bamboo, and green dragons. Many of the Japanese sets exclusively color those tiles as green only. The other bamboo tiles of 1, 5, 7, and 9 have red paint on them, thereby not making them all green. ";
		const tooltipJP: String = "二索, 三索, 四索, 六索, 八索, 發, だけを使って和了ったときに成立する。副露してもよい。その名が示す通り、手牌すべてを緑色で統一した和了形である。";
		const pronounciationEN: String = "Rue-yi-so";
		const pronounciationJP: String = "リュー​イーソー"; 
		const names = [  nameEN,  nameJP ];
		const tooltips = [  tooltipEN,  tooltipJP ];
		const pronounciations = [  pronounciationEN,  pronounciationJP ];
		super(nameEN, language, names, pronounciations, tooltips, open_han, closed_han);
		this.open_han = open_han;
		this.closed_han = closed_han;
    }
	
	validate(hand: Hand): boolean {
		
		for (var i=0; i<hand.sets.length; i++) {
			//check if set is not souzu or hatsu
			if(hand.sets[i].tile.suit != TileSuit.Souzu) {
				if(hand.sets[i].tile.suit != TileSuit.Dragon) {
					return false;
				} else {
					if(hand.sets[i].tile.value != TileValue.Hatsu) {
						return false;
					}
				}
			} else {
			
			//only 2,3,4,6,8 are allowed
			//only run can be of 2,3,4
			if(hand.sets[i].stype == SetType.Shuntsu) {
				if(hand.sets[i].tile.value == 2) {
					continue;
				} else {
					return false;
				}
			} else {
				 if(hand.sets[i].tile.value == 1 ||
					hand.sets[i].tile.value == 5 ||
					hand.sets[i].tile.value == 7 ||
					hand.sets[i].tile.value == 9) {
					return false;
					}
				}
			}
		}
		return true;
	}
}


