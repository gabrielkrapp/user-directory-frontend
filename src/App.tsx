import { Layout } from './components/Layout/Layout';
import { SplashScreen } from './components/SplashScreen/SplashScreen';
import { UserList } from './components/UserList/UserList';
import { ErrorState } from './components/ErrorState/ErrorState';
import { useInfiniteUsers } from './hooks/useInfiniteUsers';
import './App.css';

function App() {
  const {
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
  } = useInfiniteUsers();

  if (isInitialLoading) {
    return <SplashScreen isVisible={true} />;
  }

  return (
    <>
      <Layout>
        <header className="app-header">
          <h1 className="app-title">Users</h1>
          <p className="app-subtitle">
            All the users below are sorted by their names
          </p>
        </header>

        {error && users.length === 0 ? (
          <ErrorState
            message="Something went wrong while loading users."
            onRetry={retryInitial}
          />
        ) : (
          <>
            <UserList
              users={users}
              hasMore={hasMore}
              isLoadingMore={isLoadingMore}
              onLoadMore={loadMore}
            />

            {isLoadingMore && (
              <div className="loading-more">
                <div className="loading-spinner"></div>
                <span>Loading more...</span>
              </div>
            )}

            {loadMoreError && (
              <div className="load-more-error">
                <span>Could not load more users.</span>
                <button
                  className="load-more-retry-link"
                  onClick={retryLoadMore}
                >
                  Try again
                </button>
              </div>
            )}

            {users.length > 0 && (
              <button className="update-button" onClick={reset}>
                Update
              </button>
            )}
          </>
        )}
      </Layout>
    </>
  );
}

export default App;

