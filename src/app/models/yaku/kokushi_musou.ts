import { Yaku } from '../yaku';
import { Hand } from '../hand';
import { Set, SetType } from '../set';
import { Tile, TileSuit } from '../tile';

export class KokushiMusou extends Yaku {
	open_han: number;
	closed_han: number;
	
	constructor(language: number) { 
        const open_han: number = 0;
		const closed_han: number = 13;

		const nameEN: String = "Kokushi Musuo";
		const nameJP: String = "国士無双";
		const tooltipEN: String = "Along with seven pairs, this is the only hand that contradicts the requirement for a hand to have four melds and a pair. In a thirteen orphans hand, the player has one of each dragon tile, one of each wind tile, a 1 and a 9 (terminal) from each suit, plus any tile that matches anything else in the hand.";
		const tooltipJP: String = "その名の通り么九牌13種すべて、すなわち老頭牌（一九牌）6種と字牌7種を1枚ずつ揃え、そのうちのどれか1種を雀頭とした和了形である。";
		const pronounciationEN: String = "Coke-ku-shi Moo-sow";
		const pronounciationJP: String = "コクシ​ムソウ"; 
		const names = [  nameEN,  nameJP ];
		const tooltips = [  tooltipEN,  tooltipJP ];
		const pronounciations = [  pronounciationEN,  pronounciationJP ];
		super(nameEN, language, names, pronounciations, tooltips, open_han, closed_han);
		this.open_han = open_han;
		this.closed_han = closed_han;
    }

	validate(hand: Hand): boolean {
		var pairCount = 0;
		if(hand.sets.length != 0 && hand.tiles.length != 14) {
			return false;
		}
		if(hand.tiles[0].value > 1 && hand.tiles[0].value < 9) {
			return false;
		}
		for(var i = 1; i < hand.tiles.length; i++) {
			if(hand.tiles[i].value > 1 && hand.tiles[i].value < 9) {
				return false;
			}
			if(hand.tiles[i].equals(hand.tiles[i-1])) {
				pairCount++;
			}
		}
		if(pairCount == 1) {
			return true;
		} else {
			return false;
		}
	}
}

