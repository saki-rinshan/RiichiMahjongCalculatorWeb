import { Button } from '../../button';

export class PonButton extends Button {
	
	
	constructor(language: number) {
		const nameEN: String = "Pon";
		const nameJP: String = "ぽん";
		const names = [ nameEN, nameJP ];
		super("Pon", language, names);
	}
}