import { Yaku } from '../yaku';
import { Hand } from '../hand';
import { Set, SetType } from '../set';
import { Tile, TileSuit } from '../tile';

export class Honitsu extends Yaku {
	open_han: number;
	closed_han: number;
	
	constructor(language: number) { 
        const open_han: number = 2;
		const closed_han: number = 3;

		const nameEN: String = "Honitsu";
		const nameJP: String = "混一色";
		const tooltipEN: String = "The hand contains tiles from one suit and honors. 3 Han if closed.";
		const tooltipJP: String = "萬子、索子、筒子のどれか一種と、字牌だけを使って和了ったときに成立する。門前で3翻。";
		const pronounciationEN: String = "Hone-iit-tzu";
		const pronounciationJP: String = "ホン​イーソー"; 
		const names = [  nameEN,  nameJP ];
		const tooltips = [  tooltipEN,  tooltipJP ];
		const pronounciations = [  pronounciationEN,  pronounciationJP ];
		super(nameEN, language, names, pronounciations, tooltips, open_han, closed_han);
		this.open_han = open_han;
		this.closed_han = closed_han;
    }
	
	validate(hand: Hand): boolean {
		
		//this hand is chinitsu
		if(hand.sets.filter(set => set.tile.value > 9).length == 0) {	
			return false;
		} 
		
		var uniqueSuits:number[] = [];
		for(let set of hand.sets) {
			//dont count honor suits
			if(set.tile.suit >= 3) {
				continue;
			}
			if(!uniqueSuits.includes(set.tile.suit)) {
				uniqueSuits.push(set.tile.suit);
			}
		}
		  
		if(uniqueSuits.length >= 2) {
			return false;
		} else {
			return true;
		}
	}
}

