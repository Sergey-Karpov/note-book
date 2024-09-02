import { validateResponse } from './../utils/validateResponse';
import {
  FetchNoteListResponse,
  FetchNoteListSchema,
  CreateNoteType,
} from './../schemas/NoteSchema';

export function fetchNoteList(): Promise<FetchNoteListResponse> {
  return fetch('api/notes')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      return FetchNoteListSchema.parse(data);
    })
    .catch((error) => {
      console.error('Error fetching note list:', error);
      throw error;
    });
}

export function createNote(note: CreateNoteType): Promise<void> {
  return fetch('api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  })
    .then(validateResponse)
    .then(() => undefined);
}
