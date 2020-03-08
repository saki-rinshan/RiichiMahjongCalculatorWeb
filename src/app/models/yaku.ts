import { Hand } from './hand';
import { Tile } from './tile';


export abstract class Yaku {
	
	open_han: number;
	closed_han: number;
	
	description: String;
	defaultName: String;
	name: String;
	pronounciation: String;
	tooltip: String;
	
	names:String[];
	pronounciations:String[];
	tooltips:String[];
	
	
	
	constructor(name: String, language?: number, names?: String[], pronounciations?: String[], tooltips?: String[], open_han?: number, closed_han?: number) {
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
			this.open_han = open_han;
			this.closed_han = closed_han;
		}
	}
	
	abstract validate(hand: Hand) : boolean;
}
