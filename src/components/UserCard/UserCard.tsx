import { User } from '../../types/user';
import './UserCard.css';

interface UserCardProps {
  user: User;
}

export function UserCard({ user }: UserCardProps) {
  const fullName = `${user.first_name} ${user.last_name}`;

  return (
    <div className="user-card">
      <img
        src={user.avatar}
        alt={fullName}
        className="user-card-avatar"
        loading="lazy"
      />
      <div className="user-card-info">
        <h3 className="user-card-name">{fullName}</h3>
        <div className="user-card-email">
          <svg
            className="user-card-email-icon"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
          <span>{user.email}</span>
        </div>
      </div>
    </div>
  );
}

