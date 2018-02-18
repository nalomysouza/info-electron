import { InformativeService } from './informative.service';
import { Component, OnInit } from '@angular/core';
import { Informative } from './informative';

@Component({
  selector: 'app-informative',
  templateUrl: './informative.component.html',
  styleUrls: ['./informative.component.css'],
  providers: [InformativeService]
})
export class InformativeComponent implements OnInit {
  informative : Informative[] = [];

  constructor(private informativeService: InformativeService) { }

  ngOnInit() {
    this.informativeService.getInformatives().subscribe(data => {
      this.informative = data;
      }, err => {
        console.log(err);
      });
  }

}
