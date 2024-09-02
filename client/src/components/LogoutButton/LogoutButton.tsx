import { logoutUser } from '../../api/User';
import { queryClient } from '../../api/queryClient';
import { Button } from '../Button';
import './LogoutButton.css';

export const LogoutButton = () => {
  const handleClick = async () => {
    await logoutUser();
    queryClient.invalidateQueries({
      queryKey: ['users', 'me'],
    });
  };

  return (
    <div className="logout-button">
      <Button kind="secondary" onClick={handleClick}>
        Выйти
      </Button>
    </div>
  );
};
