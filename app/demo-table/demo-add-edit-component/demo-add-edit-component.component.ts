import { Component, EventEmitter } from '@angular/core';
import { Debounce } from 'src/app/core/decorators/debounce.decorator';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-demo-add-edit-component',
  templateUrl: './demo-add-edit-component.component.html',
  styleUrls: ['./demo-add-edit-component.component.scss'],
  standalone: true,
  imports: [SharedModule],
  outputs: ['recordAdded']
})
export class DemoAddEditComponentComponent {
  recordAdded = new EventEmitter<boolean>();
  visible: boolean = false;

  constructor() {}

  showDialog() {
    this.visible = true;
  }

  @Debounce(300)
  onSubmit() {
    this.visible = false;
  }

  log() {
    alert();
  }
}
