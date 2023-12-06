import { Injectable } from '@angular/core';


interface Scale {
  [key: string]: number[];
}

@Injectable({
  providedIn: 'root'
})
export class MusicTheoryService {
  private readonly notes = [
    { name: 'C', value: 0 },
    { name: 'C#', value: 1 },
    { name: 'D', value: 2 },
    { name: 'D#', value: 3 },
    { name: 'E', value: 4 },
    { name: 'F', value: 5 },
    { name: 'F#', value: 6 },
    { name: 'G', value: 7 },
    { name: 'G#', value: 8 },
    { name: 'A', value: 9 },
    { name: 'A#', value: 10 },
    { name: 'B', value: 11 }
  ]

  private readonly scales: Scale = {
    major: [0, 2, 4, 5, 7, 9, 11],
    minor: [0, 2, 3, 5, 7, 8, 10],
    pentatonic: [0, 2, 4, 7, 9],
    blues: [0, 3, 5, 6, 7, 10],
    chromatic: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11],
  };

  private precomputedScales: any;

  constructor() { 
    this.precomputeScales();
  }

  private precomputeScales() {
    this.precomputedScales = {};

    for (const note of this.notes) {
      this.precomputedScales[note.name] = {};

      for (const scaleType in this.scales) {
        const scaleStructure = this.scales[scaleType];
        const scaleNotes = scaleStructure.map(step => this.notes[(this.notes.indexOf(note) + step) % 12].name);
        this.precomputedScales[note.name][scaleType] = scaleNotes;
      }
    }
  }

  public getScale(rootNote: string, scaleType: string): string[] {
    return this.precomputedScales[rootNote][scaleType];
  }
}
