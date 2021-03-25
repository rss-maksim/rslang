import { Component } from '@angular/core';

@Component({
  selector: 'app-translation-options',
  templateUrl: './translation-options.component.html',
  styleUrls: ['./translation-options.component.scss'],
})
export class TranslationOptionsComponent {
  options = ['согласен', 'дважды', 'последний', 'главное', 'какое-нибудьоченьдлинноеслово'];

  constructor() {}
}
