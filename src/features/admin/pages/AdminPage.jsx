
const users = [
  {
    email: 'anna@example.com',
    car: 'Challenger SRT Hellcat',
    saved: 78403,
    ready: true,
  },
  {
    email: 'max@example.com',
    car: 'Charger',
    saved: 12500,
    ready: false,
  },
  {
    email: 'olena@example.com',
    car: 'Durango',
    saved: 8000,
    ready: false,
  },
];

export default function AdminPage() {
  const sortedUsers = [...users].sort(
    (a, b) => Number(b.ready) - Number(a.ready)
  );

  return (
    <main>
      <section className="admin-list">
        {sortedUsers.map(user => (
          <div
            key={user.email}
            className={`admin-row ${user.ready ? 'ready' : ''}`}
          >
            {user.ready && (
              <div className="status">✓</div>
            )}

            <div>{user.email}</div>

            <div>{user.car}</div>

            <div>
              Відкладено: {user.saved.toLocaleString('en-US')}$
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
