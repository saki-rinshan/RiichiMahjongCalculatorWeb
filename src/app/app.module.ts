import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CalculatorComponent } from './calculator/calculator.component';
import { AppComponent } from './app.component'; 
import { MainTilesSelectionComponent } from './tiles/main-tiles-selection.component';

import { TilesComponent } from './tiles/dumb_components/tiles.component';
import { ExtraInfoComponent } from './extra-info/extra-info.component';
import { TilesSectionComponent } from './tiles/dumb_components/tiles-section.component';
import { ModalComponent } from './modal/modal.component';
import { TilesButtonComponent } from './tiles/tiles-buttons.component';
import { MainTilesDisplayComponent } from './tiles/main-tiles-display.component';
import { YakuComponent } from './models/components/yaku.component'
import { FuComponent } from './models/components/fu.component'


import { CalculatorService } from './calculator/calculator.service';
import { ExtraInfoService } from './extra-info/extra-info.service';
import { MainTilesService } from './tiles/main-tiles.service';
import { ModalService } from './modal/modal.service';
import { RecognizerService } from './calculator/recognizer/recognizer.service';
import { NaiveRecognizerService } from './calculator/recognizer/naiveRecognizer.service'
import { ResultDisplayService } from './calculator/result-display.service'
import { LanguageService } from './language/language-service';

@NgModule({    
  declarations: [    
    AppComponent,        
	TilesComponent,    
	TilesSectionComponent,
	CalculatorComponent,
	ExtraInfoComponent,
	ModalComponent,
	TilesButtonComponent,
	MainTilesSelectionComponent,
	MainTilesDisplayComponent,
	YakuComponent,
	FuComponent,
  ],   
  imports: [   
    BrowserModule,
    FormsModule
  ],
  providers: [ ExtraInfoService, CalculatorService,  RecognizerService,  NaiveRecognizerService, MainTilesService,  ResultDisplayService, ModalService, LanguageService, CalculatorComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
