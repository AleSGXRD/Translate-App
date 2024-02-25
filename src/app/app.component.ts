import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateApiService } from './services/translate-api.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TranslateApp';
  textInput:any ='Hello, how are you?';
  textOutput:any ='';
  languageFrom:string = 'en';
  languageTo:string = 'fr';

  constructor(
    private translateApiService : TranslateApiService
  ){

  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    document.getElementById('input')?.addEventListener('input', ()=>{this.debounce(this.translateText(),2000)})
    this.translateText();
  }
  debounce(callback:any, wait:any){
    let timerId:any;
    return ()=>{
      clearTimeout(timerId);
      timerId = setTimeout(callback(), wait);
    }
  }

  translateText(){
    if(this.textInput.trim() === ''){
      this.textOutput = '';
      return;
    }

    this.translateApiService.translateText(this.textInput, this.languageFrom, this.languageTo)
    .subscribe(res => {
      const response = res.responseData;
      this.textOutput = response.translatedText;
    }, err => console.log(err));
  }
  switchLanguages(){
    const langFrom = this.languageFrom;
    const langTo = this.languageTo;
    const textInp = this.textInput;
    const textOut = this.textOutput;

    this.languageFrom = langTo;
    this.languageTo = langFrom;
    this.textInput = textOut;
    this.textOutput = textInp;
  }
  changeLanguageFrom(newLanguage:string){
    this.languageFrom = newLanguage;
  }
  changeLanguageTo(newLanguage:string){
    this.languageTo = newLanguage;
  }
  speechText(text:string){
    speechSynthesis.speak(new SpeechSynthesisUtterance(text));
  }
  copyText(text:string){
    navigator.clipboard.writeText(text)
    .then(()=>{
      console.log('is copied');
    }, ()=>{
      console.log('err');
    })
  }
}
