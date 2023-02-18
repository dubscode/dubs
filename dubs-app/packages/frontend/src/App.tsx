import reactLogo from './assets/react.svg';
import { useCounter } from './hooks/use-counter';
import { useCurrentUserQuery } from './features/users/gql/_gen_/users.gql';
import { useGetUsersQuery } from './features/users/gql/_gen_/users.gql';

export const App = () => {
  const { count, increment } = useCounter();

  const { data, loading, error } = useGetUsersQuery();
  const { data: currentUserData } = useCurrentUserQuery();

  return (
    <div className="container">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>
        Vite + React{' '}
        {currentUserData ? currentUserData.currentUser?.email : null}
      </h1>
      <a
        href={`https://api.dev.wise.danwise.codes/auth/link/authorize?email=io.dwise@gmail.com`}
      >
        Login
      </a>
      <div className="card">
        <button onClick={() => increment()}>count is {count}</button>
        {loading && <p>Loading...</p>}
        {error && <p>Error :(</p>}
        {data && (
          <div>
            {data.users?.map((user) => (
              <span key={user.id}>
                {user.name} | {user.email}
              </span>
            ))}
          </div>
        )}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
};
