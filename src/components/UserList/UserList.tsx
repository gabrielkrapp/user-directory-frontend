import { useEffect, useRef } from 'react';
import { User } from '../../types/user';
import { UserCard } from '../UserCard/UserCard';
import './UserList.css';

interface UserListProps {
  users: User[];
  hasMore: boolean;
  isLoadingMore: boolean;
  onLoadMore: () => void;
}

export function UserList({
  users,
  hasMore,
  isLoadingMore,
  onLoadMore,
}: UserListProps) {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && hasMore && !isLoadingMore) {
          onLoadMore();
        }
      },
      {
        root: null,
        rootMargin: '100px',
        threshold: 0,
      }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [hasMore, isLoadingMore, onLoadMore]);

  return (
    <div className="user-list">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
      <div ref={sentinelRef} className="user-list-sentinel" />
    </div>
  );
}

