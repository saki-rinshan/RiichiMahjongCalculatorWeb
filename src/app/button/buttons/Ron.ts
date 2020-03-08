import { Button } from '../button';

export class RonButton extends Button {
	
	
	
	constructor(language: number) {
		const nameEN: String = "Ron";
		const nameJP: String = "栄";
		const tooltipEN: String = "Win by another player discarding the winning tile.";
		const tooltipJP: String = "他のプレイヤーが捨てた牌で和了する。";
		const pronounciationEN: String = "Roh-n";
		const pronounciationJP: String = "ロン";
		const names = [ nameEN, nameJP ];
		const tooltips = [ tooltipEN, tooltipJP ];
		const pronounciations = [ pronounciationEN, pronounciationJP ];
		super(nameEN, language, names, pronounciations, tooltips);
	}
}