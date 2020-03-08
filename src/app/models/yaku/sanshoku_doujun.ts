import { Yaku } from '../yaku';
import { Hand } from '../hand';
import { Set, SetType } from '../set';
import { Tile, TileSuit } from '../tile';

export class SanshokuDoujun extends Yaku {
	
	open_han: number;
	closed_han: number;
	
	constructor(language: number) { 
        const open_han: number = 1;
		const closed_han: number = 2;

		const nameEN: String = "Sanshoku Doujun";
		const nameJP: String = "三色同順";
		const tooltipEN: String = "Three sequences of the same numbers in all three suits. 2 Han if closed.";
		const tooltipJP: String = "萬子・索子・筒子それぞれの色で同じ並びの順子を作ったときに成立する。門前では2翻。";
		const pronounciationEN: String = "San-shocku Doe-june";
		const pronounciationJP: String = "サンショク​ドウジュン"; 
		const names = [  nameEN,  nameJP ];
		const tooltips = [  tooltipEN,  tooltipJP ];
		const pronounciations = [  pronounciationEN,  pronounciationJP ];
		super(nameEN, language, names, pronounciations, tooltips, open_han, closed_han);
		this.open_han = open_han;
		this.closed_han = closed_han;
    }

	validate(hand: Hand): boolean {
		
		var manzuSequences: Set[] = hand.sets.filter(set => set.stype == SetType.Shuntsu && set.tile.suit == TileSuit.Manzu);
		var pinzuzuSequences: Set[] = hand.sets.filter(set => set.stype == SetType.Shuntsu && set.tile.suit == TileSuit.Pinzu);
		var souzuSequences: Set[] = hand.sets.filter(set => set.stype == SetType.Shuntsu &&  set.tile.suit == TileSuit.Souzu);
		
		var totalSets: Set[][] = [manzuSequences, pinzuzuSequences, souzuSequences];
		
		if(manzuSequences.length == 0 || pinzuzuSequences.length == 0 || souzuSequences.length == 0) {
			return false;
		} else {
			var tileValues: number[] = [];
			var counts: number[] = [];
			for(let sets of totalSets) {
				for(let set of sets) {
					tileValues.push(set.tile.value);
				}
			}
			for (var i = 0; i < tileValues.length; i++) {
				var num = tileValues[i];
				counts[num] = counts[num] ? counts[num] + 1 : 1;
			}
			for(let count of counts) {
				if(count >= 3) {
					return true;
				}
			}
		}
		return false;
	}
}
