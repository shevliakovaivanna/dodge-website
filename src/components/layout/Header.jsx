
import { Link, useNavigate } from 'react-router-dom';
import { Home, Smile } from 'lucide-react';

export default function Header() {
  const navigate = useNavigate();
  const user = localStorage.getItem('dodgeUser');

  function logout() {
    localStorage.removeItem('dodgeUser');
    navigate('/');
  }

  return (
    <header className="header">
      <Link to="/" className="logo">
        DODGE<span>╱╱</span>
      </Link>

      <nav className="header-buttons">
        <Link to="/game" className="header-icon" aria-label="Міні гра">
          <Smile size={17} />
        </Link>

        <Link to="/" className="header-icon" aria-label="Головна">
          <Home size={17} />
        </Link>

        {user ? (
          <button className="header-exit" onClick={logout}>
            ВИХІД
          </button>
        ) : (
          <Link to="/login" className="header-exit">
            ВХІД
          </Link>
        )}
      </nav>
    </header>
  );
}
