import { Button } from '../button';

export class RinshanKaihouButton extends Button {
	
	constructor(language: number) {
		const nameEN: String = "Rinshan Kaihou";
		const nameJP: String = "嶺上開花";
		const tooltipEN: String = "The most aesthetic yaku in all of mahjong. A win by drawing the winning tile from the deadwall is considered automatic yakuman in all rulesets.";
		const tooltipJP: String = "槓を行い、不足した牌を補充するため嶺上牌を引いた際に、引いた牌が自らの和了牌であった場合に与えられる。";
		const pronounciationEN: String = "Rin-shan Kai-hou";
		const pronounciationJP: String = "リンシャンカイホウ"; 
		const names = [ nameEN, nameJP ];
		const tooltips = [ tooltipEN, tooltipJP ];
		const pronounciations = [ pronounciationEN, pronounciationJP ];
		super(nameEN, language, names, pronounciations, tooltips);
	}
}