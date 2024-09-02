import { useQuery } from '@tanstack/react-query';
import { fetchMe } from '../../api/User';
import { queryClient } from '../../api/queryClient';
import { Loader } from '../../components/Loader';
import { AuthForm } from '../../components/AuthForm';
import { NotePage } from '../../components/NotePage';

export const Account = () => {
  const meQuery = useQuery(
    {
      queryFn: () => fetchMe(),
      queryKey: ['users', 'me'],
      retry: false,
    },
    queryClient
  );

  switch (meQuery.status) {
    case 'pending':
      return <Loader />;

    case 'error':
      return <AuthForm />;

    case 'success':
      return <NotePage userData={meQuery.data} />;
  }
};
