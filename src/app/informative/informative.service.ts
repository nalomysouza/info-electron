import { Informative } from './informative';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class InformativeService {
  private informativeUrl = 'assets/json/informative.json';

  constructor(private HttpClient:HttpClient) { }

  getInformatives(): Observable <Informative[]> {
    return this.HttpClient.get<Informative[]>(this.informativeUrl)
    .do(data =>console.log('All : ' + JSON.stringify(data)))
    .catch(err=> Observable.throw(err.message));
  }

}
