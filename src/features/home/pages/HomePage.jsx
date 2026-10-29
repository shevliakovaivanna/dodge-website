import { Link } from 'react-router-dom';
import { Gamepad2, CarFront, CalendarDays } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="home-page">
      <section className="home-actions">
        <Link to="/test" className="home-action">
          <Gamepad2 />
          <strong>Пройди тест</strong>
          <span>Знайди свій Dodge</span>
        </Link>

        <Link to="/garage" className="home-action">
          <CarFront />
          <strong>Збери свій Dodge</strong>
          <span>Налаштуй кожну деталь</span>
        </Link>

        <Link to="/calendar" className="home-action">
          <CalendarDays />
          <strong>Заповни календар</strong>
          <span>Записуй свої заощадження</span>
        </Link>
      </section>
    </main>
  );
}