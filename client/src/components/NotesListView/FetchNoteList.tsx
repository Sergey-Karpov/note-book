import { useQuery } from '@tanstack/react-query';
import { Loader } from '../../components/Loader';
import { fetchNoteList } from '../../api/Note';
import { queryClient } from '../../api/queryClient';
import { NotesListView } from './NotesListView';
import { Button } from '../../components/Button';

export const FetchNoteList = () => {
  const noteListQuery = useQuery(
    {
      queryFn: () => fetchNoteList(),
      queryKey: ['notes'],
    },
    queryClient
  );

  switch (noteListQuery.status) {
    case 'pending':
      return <Loader />;

    case 'success':
      const reverseNoteList = [...noteListQuery.data.list].reverse();
      return <NotesListView noteList={reverseNoteList} />;

    case 'error':
      return (
        <>
          <span>Произошла ошибка</span>
          <Button type={'button'} onClick={() => noteListQuery.refetch()}>
            Повторить запрос
          </Button>
        </>
      );
  }
};
