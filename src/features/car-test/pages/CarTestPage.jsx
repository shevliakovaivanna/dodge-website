
import { useState } from 'react';
import { Link } from 'react-router-dom';

const questions = [
  {
    title: 'Який у тебе стиль життя?',
    answers: ['Місто', 'Подорожі', 'Сім’я', 'Активний відпочинок'],
    descriptions: [
      'Міський ритм, робота, навчання',
      'Довгі поїздки та нові місця',
      'Рідні люди та комфорт',
      'Гори, спорт, адреналін',
    ],
  },
  {
    title: 'Що для тебе найважливіше в авто?',
    answers: ['Потужність', 'Економічність', 'Комфорт', 'Дизайн'],
    descriptions: [
      'Швидкість та динаміка',
      'Практичність у щоденних поїздках',
      'Зручність для всіх пасажирів',
      'Зовнішність і характер',
    ],
  },
  {
    title: 'Де ти найчастіше їздиш?',
    answers: ['Місто', 'Траса', 'За містом', 'Усюди'],
    descriptions: [
      'Короткі поїздки',
      'Довгі дороги',
      'Подорожі за місто',
      'Різні маршрути',
    ],
  },
  {
    title: 'Який автомобіль тобі ближчий?',
    answers: ['Спортивний', 'Сімейний', 'Універсальний', 'Потужний'],
    descriptions: [
      'Яскравий та динамічний',
      'Просторий та зручний',
      'Для різних потреб',
      'З виразним характером',
    ],
  },
];

export default function CarTestPage() {
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);

  const progress = Object.keys(answers).length / questions.length * 100;

  const car =
    answers[0] === 'Сім’я' ||
    answers[1] === 'Комфорт' ||
    answers[3] === 'Сімейний'
      ? 'Durango'
      : 'Challenger SRT Demon';

  function selectAnswer(questionIndex, answer) {
    setAnswers(prev => ({ ...prev, [questionIndex]: answer }));
    setFinished(false);
  }

  return (
    <main className="test-layout">
      <section>
        <div className="progress-info">
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span>{Object.keys(answers).length}/4</span>
        </div>

        {questions.map((question, index) => (
          <section key={question.title}>
            <h2 className="question-title">{question.title}</h2>

            {question.answers.map((answer, answerIndex) => (
              <label
                className={`question-option ${
                  answers[index] === answer ? 'selected' : ''
                }`}
                key={answer}
              >
                <span>
                  {answer}
                  <span className="option-description">
                    {question.descriptions[answerIndex]}
                  </span>
                </span>

                <input
                  type="radio"
                  name={`question-${index}`}
                  checked={answers[index] === answer}
                  onChange={() => selectAnswer(index, answer)}
                />
              </label>
            ))}
          </section>
        ))}

        <button
          className="btn full"
          disabled={Object.keys(answers).length !== questions.length}
          onClick={() => setFinished(true)}
        >
          Показати результат
        </button>
      </section>

      <section>
        {finished ? (
          <>
            <h2 className="result-title">Тобі підходить:</h2>
            <h2 className="result-title">{car}</h2>

            <img
              className="result-image"
              src="/images/cars/challenger/challenger-red.png"
              alt={car}
            />

            <p className="result-description">
              Автомобіль, який відповідає твоїм потребам і стилю життя.
            </p>

            <Link
              className="btn"
              to="/garage"
              state={{ car }}
            >
              Переглянути в гаражі
            </Link>
          </>
        ) : null}
      </section>
    </main>
  );
}
