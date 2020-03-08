import { Button } from '../button';

export class DoubleRiichiButton extends Button {
	
	constructor(language: number) {
		const nameEN: String = "Double Riichi";
		const nameJP: String = "ダブル立直";
		const tooltipEN: String = "Win after declaring Riichi on the first discard.";
		const tooltipJP: String = "最初の捨て牌にリーチが掛かる場合に与えられる。";
		const pronounciationEN: String = "Double Reeeachi";
		const pronounciationJP: String = "ダブルリーチ";
		const names = [ nameEN, nameJP ];
		const tooltips = [ tooltipEN, tooltipJP ];
		const pronounciations = [ pronounciationEN, pronounciationJP ];
		super(nameEN, language, names, pronounciations, tooltips);
	}
}