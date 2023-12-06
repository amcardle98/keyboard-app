import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  changeKey() {
    console.log('change key');
  }

  changeScale() {
    console.log('change scale');
  }

  
}
