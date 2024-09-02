import { FC } from 'react';
import { NoteView } from '../NoteView';
import { NoteList } from '../../schemas/NoteSchema';
import './NotesListView.css';

interface NoteListViewProps {
  noteList: NoteList;
}

export const NotesListView: FC<NoteListViewProps> = ({ noteList }) => {
  return (
    <ul className="note-list-view">
      {noteList.map((note) => (
        <li key={note.id}>
          <NoteView note={note} />
        </li>
      ))}
    </ul>
  );
};
