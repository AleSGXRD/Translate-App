import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslateApiService {
  private URL = 'https://api.mymemory.translated.net/get';
  private http: HttpClient;

  constructor(private injector:Injector) {
    this.http = injector.get(HttpClient);
  }

  translateText(textInput: string, languageFrom:string, languageTo:string) :Observable<any>{
    const language= languageFrom+'|'+languageTo;
    return this.http.get(this.URL, {params: {'q':textInput,'langpair':language}})
  }
}
