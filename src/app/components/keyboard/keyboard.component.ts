import { Component, OnInit } from '@angular/core';
import { MusicTheoryService } from 'src/app/logic/music-theory.service';
import * as Tone from 'tone';

const synth = new Tone.Synth().toDestination();

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss'],
})
export class KeyboardComponent {
  selectedRootNote = 'C';
  selectedScaleType = 'Major';
  currentOctave = 4;
  displayedScale: string[] = [];

  constructor(private musicTheoryService: MusicTheoryService) {
    this.updateScale();
  }

  updateScale() {
    this.displayedScale = this.musicTheoryService.getScale(
      this.selectedRootNote,
      this.selectedScaleType
    );

    console.log(this.displayedScale);
  }

  playSound(note: string) {
    synth.triggerAttackRelease(note + this.currentOctave, '8n');
  }

}
