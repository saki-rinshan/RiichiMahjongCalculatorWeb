import { Hand } from './hand';
import { Tile } from './tile';

export abstract class Fu {
	
	fu: number;
	
	description: String;
	defaultName: String;
	name: String;
	pronounciation: String;
	tooltip: String;
	
	names:String[];
	pronounciations:String[];
	tooltips:String[];
	
	
	constructor(name?: String, language?: number, names?: String[], pronounciations?: String[], tooltips?: String[], fu?: number) {
		this.defaultName = name;
		
		if(language == null) {
			return;
		} else {
			this.names = names;
			this.name = names[language];
			if(pronounciations) {
				this.pronounciations = pronounciations;
				this.pronounciation = pronounciations[language];
			}
			if(tooltips) {
				this.tooltips = tooltips;
				this.tooltip = tooltips[language];
			}
			this.fu = fu;
		}
	}
	
	abstract validate(hand: Hand) : boolean;
}