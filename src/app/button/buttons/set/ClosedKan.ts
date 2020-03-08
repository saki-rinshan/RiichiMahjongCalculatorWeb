import { Button } from '../../button';

export class ClosedKanButton extends Button {
	
	constructor(language: number) {
		const nameEN: String = "Closed Kan";
		const nameJP: String = "暗カン";
		const names = [ nameEN, nameJP ];
		super("Closed Kan", language, names);
	}
}