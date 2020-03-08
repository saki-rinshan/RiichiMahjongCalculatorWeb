export class Button {
	
	defaultName: String;
	name: String;
	tooltip: String;
	pronounciation: String;
	isToggled: boolean = false;
	isSharedButton: boolean = false;
	buttonGroup: ButtonGroup;
	shouldDisplay: boolean;
	
	names:String[];
	pronounciations:String[];
	tooltips:String[];
	
	constructor(name: String, language?: number, names?: String[], pronounciations?: String[], tooltips?: String[]) {
		this.name = name;
		this.defaultName = name;
		
		if(name.indexOf("Wind") != -1) {
			this.shouldDisplay = false;
		} else {
			this.shouldDisplay = true;
		}
		
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
		}
	}
	
	toggle(): void {
		if(this.isSharedButton) {
			this.buttonGroup.toggle(this);
		} else {
			this.isToggled = !this.isToggled;
		}
	}
}

export class ButtonGroup {
	
	sharedButtons: Button[] = [];
	
	//only allow one button to be toggled at a time
	toggle(button: Button): void {		
		for(let conflicting_button of this.sharedButtons) {
				if(conflicting_button.isToggled && !(conflicting_button.defaultName === button.defaultName)) {
					conflicting_button.isToggled = !conflicting_button.isToggled;
					button.isToggled = !button.isToggled;
					return;
				}
		}
		if(button.defaultName === "Tsumo" || button.defaultName === "Ron") {
			return;
		}
		button.isToggled = !button.isToggled;
	}	
	
	toggleSpecificGroup(button: Button, buttons: Button[]): void {		
		for(let conflicting_button of buttons) {
				if(conflicting_button.isToggled) {
					conflicting_button.isToggled = !conflicting_button.isToggled;
					button.isToggled = !button.isToggled;
					return;
				}
		}
		button.isToggled = !button.isToggled;
	}
	
	add(button: Button): void {
		button.isSharedButton = true;
		button.buttonGroup = this;
		this.sharedButtons.push(button);
	}
	
	toggleAllOffForce(): void {
		for(let button of this.sharedButtons) {
			button.isToggled = false;
		}
	}
}

export class RiichiButtonGroup extends ButtonGroup {
	
	toggle(button: Button): void {		
		
		//setup for second and third case
		var riichi_button = this.sharedButtons.find(button => button.defaultName == "Riichi");
		var double_riichi_button = this.sharedButtons.find(button => button.defaultName == "Double Riichi");
		var riichi_buttons: Button[] = [riichi_button, double_riichi_button];
		//setup for first case
		var ippatsu_button = this.sharedButtons.find(button => button.defaultName == "Ippatsu");
		
		//if riichi or double_riichi is disabled, then turn off ippatsu as well
		if((button.defaultName === "Riichi" || button.defaultName == "Double Riichi") && button.isToggled) {
			ippatsu_button.isToggled = false;
			button.isToggled = !button.isToggled;
			return;
		} 
		//if ippatsu is enabled without riichi or double riichi, then toggle riichi by default
		else if(button.defaultName === "Ippatsu" && !button.isToggled) {
			var buttonToToggle = riichi_buttons.find(button => button.isToggled);
			if(buttonToToggle == undefined) {
				riichi_button.isToggled = true;
			}
			button.isToggled = !button.isToggled;
			return;
		} 
		//if ippatsu is disabled, just disable Ippatsu normally
		else if(button.defaultName === "Ippatsu" && button.isToggled) {
			button.isToggled = !button.isToggled;
			return;
		}
		//if riichi or double_riichi is enabled
		else {
			super.toggleSpecificGroup(button, riichi_buttons);
			return;
		}
	}	
}

export enum SetButtonType {
	Chi = 0,
	Pon = 1,
	OpenKan = 2,
	ClosedKan =3
	
}
