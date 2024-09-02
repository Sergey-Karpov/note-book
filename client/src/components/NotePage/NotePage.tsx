import { FC } from 'react';
import { ResponseFetchMe } from '../../schemas/UserSchema';
import { UserView } from '../../components/UserView';
import { NoteForm } from '../../components/NoteForm';
import './NotePage.css';
import { FetchNoteList } from '../../components/NotesListView/FetchNoteList';
import { LogoutButton } from '../../components/LogoutButton';

interface NotePageProps {
  userData: ResponseFetchMe;
}

export const NotePage: FC<NotePageProps> = ({ userData }) => {
  return (
    <div className="note-page">
      <UserView user={userData} />
      <div className="note-page__form">
        <NoteForm />
        <FetchNoteList />
      </div>
      <LogoutButton />
    </div>
  );
};
