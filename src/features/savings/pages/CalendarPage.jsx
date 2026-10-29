
import { useState } from 'react';

const months = [
  'Січень', 'Лютий', 'Березень', 'Квітень',
  'Травень', 'Червень', 'Липень', 'Серпень',
  'Вересень', 'Жовтень', 'Листопад', 'Грудень',
];

export default function CalendarPage() {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [amount, setAmount] = useState('');

  const [savings, setSavings] = useState(() =>
    JSON.parse(localStorage.getItem('dodgeSavings') || '{}')
  );

  const car =
    localStorage.getItem('dodgeSelectedCar') ||
    'Challenger SRT Hellcat';

  const price = Number(
    localStorage.getItem('dodgeCarPrice') || 78403
  );

  const total = Object.values(savings).reduce(
    (sum, value) => sum + Number(value),
    0
  );

  function addSavings(event) {
    event.preventDefault();

    const value = Number(amount);

    if (!value || value <= 0 || selectedMonth === null) {
      return;
    }

    const updated = {
      ...savings,
      [selectedMonth]:
        Number(savings[selectedMonth] || 0) + value,
    };

    setSavings(updated);
    localStorage.setItem('dodgeSavings', JSON.stringify(updated));

    setAmount('');
    setSelectedMonth(null);
  }

  return (
    <main>
      <h1 className="calendar-title">ЖОВТЕНЬ 2026</h1>

      <div className="calendar-car">
        <span>{car}</span>
        <span>
          Залишилося: $
          {Math.max(0, price - total).toLocaleString('en-US')}
        </span>
      </div>

      <section className="month-grid">
        {months.map((month, index) => (
          <div className="month-card" key={month}>
            <strong>{month}</strong>

            <span>
               {Number(savings[index] || 0).toLocaleString('en-US')}$
            </span>

            {index === 9 && (
              <button
                aria-label="Додати за жовтень"
                onClick={() => setSelectedMonth(index)}
              >
                +
              </button>
            )}

            {index !== 9 && (
              <button
                aria-label={`Додати за ${month}`}
                onClick={() => setSelectedMonth(index)}
              >
                +
              </button>
            )}
          </div>
        ))}
      </section>

      {selectedMonth !== null && (
        <form className="panel savings-form" onSubmit={addSavings}>
          <h2>Відкладено:</h2>

          <div className="field">
            <label>Сума в доларах</label>
            <input
              type="number"
              min="1"
              required
              value={amount}
              onChange={event => setAmount(event.target.value)}
              placeholder="100"
            />
          </div>

          <button className="btn full" type="submit">
            Додати
          </button>
        </form>
      )}
    </main>
  );
}
