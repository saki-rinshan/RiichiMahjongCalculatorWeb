import { Fu } from '../fu';
import { Hand } from '../hand';

export class ChiitoitsuBasePoints extends Fu {
	fu: number;
	
	constructor(language: number) {
        const fu: number = 25;

		const nameEN: String = "Chiitoitsu Base Points";
		const nameJP: String = "七対子";
		const tooltipEN: String = "If the hand contains chiitoitsu, it is automatically 25 fu, regardless of all other factors.";
		const tooltipJP: String = "七対子は一律25符。";
		const pronounciationEN: String = "Chii-toy-tzu";
		const pronounciationJP: String = "チートイツ"; 
		const names = [  nameEN,  nameJP ];
		const tooltips = [  tooltipEN,  tooltipJP ];
		const pronounciations = [  pronounciationEN,  pronounciationJP ];
		super(nameEN, language, names, pronounciations, tooltips, fu);
		this.fu = fu;
    }
	
	validate(hand: Hand): boolean {
		if(hand.containsYaku("Chiitoitsu")) {
			return true;
		}
		return false;
	}
}