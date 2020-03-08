import { Button } from '../../button';

export class OpenKanButton extends Button {
	
	
	constructor(language: number) {
	
		const nameEN: String = "Open Kan";
		const nameJP: String = "大明カン";
		const names = [ nameEN, nameJP ];
		super("Open Kan", language, names);
	}
}