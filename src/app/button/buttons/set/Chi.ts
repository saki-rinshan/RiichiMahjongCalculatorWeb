import { Button } from '../../button';

export class ChiButton extends Button {
	
	constructor(language: number) {
		const nameEN: String = "Chi";
		const nameJP: String = "ちー";
		const names = [ nameEN, nameJP ];
		super("Chi", language, names);
	}
}