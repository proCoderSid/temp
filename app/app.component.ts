import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'credit-society';

  user!: { firstName: string; lastName: string };
  welcome!: string;
  usernameLabel!: string;
  passwordLabel!: string;

  constructor(private translate: TranslateService) {
    // this.translate.addLangs(Object.values(Language));
    // this.translate.setDefaultLang(Language.English);
    // this.translate.use(Language.English);
  }
}
