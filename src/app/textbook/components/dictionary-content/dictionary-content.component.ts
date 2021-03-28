import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dictionary-content',
  templateUrl: './dictionary-content.component.html',
  styleUrls: ['./dictionary-content.component.scss'],
})
export class DictionaryContentComponent {
  constructor(public location: Location) {}

  goBack() {
    this.location.back();
  }
}
