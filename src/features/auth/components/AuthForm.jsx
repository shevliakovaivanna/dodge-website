
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function AuthForm({ mode }) {
  const isRegister = mode === 'register';
  const navigate = useNavigate();

  const [role, setRole] = useState('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [message, setMessage] = useState('');

  function submit(event) {
    event.preventDefault();
    setMessage('');

    if (isRegister && password !== confirm) {
      setMessage('Паролі не збігаються.');
      return;
    }

    if (role === 'admin' && adminPassword !== 'dodgeadmin') {
      setMessage('Неправильний пароль адміністратора.');
      return;
    }

    localStorage.setItem(
      'dodgeUser',
      JSON.stringify({ email, role })
    );

    navigate(role === 'admin' ? '/admin' : '/');
  }

  return (
    <main className="auth-wrap">
      <form
        className={`auth-card ${isRegister ? 'register' : ''}`}
        onSubmit={submit}
      >
        <h1>{isRegister ? 'РЕЄСТРАЦІЯ' : 'ВХІД'}</h1>

        {isRegister && (
          <div>
            <label className="role-option">
              <input
                type="radio"
                checked={role === 'user'}
                onChange={() => setRole('user')}
              />
              Користувач
            </label>

            <label className="role-option">
              <input
                type="radio"
                checked={role === 'admin'}
                onChange={() => setRole('admin')}
              />
              Адміністратор
            </label>
          </div>
        )}

        <div className="field">
          <label>Email:</label>
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email:"
          />
        </div>

        <div className="field">
          <label>Пароль:</label>
          <input
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Пароль:"
          />
        </div>

        {isRegister && (
          <div className="field">
            <label>Підтвердити пароль:</label>
            <input
              type="password"
              required
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              placeholder="Підтвердити пароль:"
            />
          </div>
        )}

        {role === 'admin' && (
          <div className="field">
            <label>Пароль адміністратора:</label>
            <input
              type="password"
              required
              value={adminPassword}
              onChange={e => setAdminPassword(e.target.value)}
              placeholder="Пароль адміністратора:"
            />
          </div>
        )}

        {message && <p className="notice">{message}</p>}

        <button className="btn full" type="submit">
          УВІЙТИ
        </button>

        <p className="auth-foot">
          {isRegister ? 'Вже маєте акаунт? ' : 'Немає акаунта? '}

          {isRegister ? (
            <Link to="/login">Увійти</Link>
          ) : (
            <Link to="/register">Зареєструватися</Link>
          )}
        </p>
      </form>
    </main>
  );
}
