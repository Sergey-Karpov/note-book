import { FC } from 'react';
import './UserView.css';
import { ResponseFetchMe } from '../../schemas/UserSchema';

interface UserViewProps {
  user: ResponseFetchMe;
}

export const UserView: FC<UserViewProps> = ({ user }) => {
  return (
    <div className="user-view">
      <div className="user-view__inner">
        <div className="user-view__logo">
          {user.username.slice(0, 1).toUpperCase()}
        </div>
        <span className="user-view__name">{user.username}</span>
      </div>
    </div>
  );
};
