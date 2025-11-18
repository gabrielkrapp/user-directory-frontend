import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchUsers } from '../api/usersApi';
import { User } from '../types/user';

interface UseInfiniteUsersReturn {
  users: User[];
  isInitialLoading: boolean;
  isLoadingMore: boolean;
  hasMore: boolean;
  error: string | null;
  loadMoreError: string | null;
  retryInitial: () => void;
  retryLoadMore: () => void;
  loadMore: () => void;
  reset: () => void;
}

const USERS_PER_PAGE = 3;

export function useInfiniteUsers(): UseInfiniteUsersReturn {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadMoreError, setLoadMoreError] = useState<string | null>(null);
  
  const isLoadingRef = useRef(false);

  const hasMore = page < totalPages;

  const loadInitialUsers = useCallback(async () => {
    if (isLoadingRef.current) {
      return;
    }
    
    isLoadingRef.current = true;
    setIsInitialLoading(true);
    setError(null);

    try {
      const response = await fetchUsers(1, USERS_PER_PAGE);
      setUsers(response.data);
      setPage(1);
      setTotalPages(response.total_pages);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'An unexpected error occurred while loading users'
      );
      setUsers([]);
    } finally {
      setIsInitialLoading(false);
      isLoadingRef.current = false;
    }
  }, []);

  const loadMore = useCallback(async () => {
    if (isLoadingRef.current || !hasMore || isLoadingMore) return;

    isLoadingRef.current = true;
    setIsLoadingMore(true);
    setLoadMoreError(null);

    const nextPage = page + 1;

    try {
      const response = await fetchUsers(nextPage, USERS_PER_PAGE);
      setUsers((prev) => [...prev, ...response.data]);
      setPage(nextPage);
      setTotalPages(response.total_pages);
      setLoadMoreError(null);
    } catch (err) {
      setLoadMoreError(
        err instanceof Error
          ? err.message
          : 'An unexpected error occurred while loading more users'
      );
    } finally {
      setIsLoadingMore(false);
      isLoadingRef.current = false;
    }
  }, [page, hasMore, isLoadingMore]);

  const retryInitial = useCallback(() => {
    loadInitialUsers();
  }, [loadInitialUsers]);

  const retryLoadMore = useCallback(() => {
    loadMore();
  }, [loadMore]);

  const reset = useCallback(() => {
    setUsers([]);
    setPage(1);
    setTotalPages(0);
    setError(null);
    setLoadMoreError(null);
    loadInitialUsers();
  }, [loadInitialUsers]);

  useEffect(() => {
    loadInitialUsers();
  }, [loadInitialUsers]);

  return {
    users,
    isInitialLoading,
    isLoadingMore,
    hasMore,
    error,
    loadMoreError,
    retryInitial,
    retryLoadMore,
    loadMore,
    reset,
  };
}
