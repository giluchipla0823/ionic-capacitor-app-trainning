import { Component } from '@angular/core';
import { Note } from '@config/interfaces/note.interface';
import { NOTES_DATA } from '@data/note-data';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage {
  notes: Array<Note> = [...NOTES_DATA];

  searchTerm = '';
}
