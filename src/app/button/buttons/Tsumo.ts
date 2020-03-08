import { Button } from '../button';

export class TsumoButton extends Button {
	
	constructor(language: number) {
		const nameEN: String = "Tsumo";
		const nameJP: String = "自摸";
		const tooltipEN: String = "Win by drawing your winning tile.";
		const tooltipJP: String = "山から自分のアガリ牌を自摸して和了する。";
		const pronounciationEN: String = "Tsu-mow";
		const pronounciationJP: String = "ツモ";
		const names = [ nameEN, nameJP ];
		const tooltips = [ tooltipEN, tooltipJP ];
		const pronounciations = [ pronounciationEN, pronounciationJP ];
		super(nameEN, language, names, pronounciations, tooltips);
	}
}