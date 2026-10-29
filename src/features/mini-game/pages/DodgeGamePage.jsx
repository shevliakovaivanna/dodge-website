
import { useState } from 'react';
import { Link } from 'react-router-dom';

const questions = [
  {
    title: 'Який у тебе настрій?',
    answers: ['Завжди на максимумі', 'Спокійний', 'Люблю пригоди'],
  },
  {
    title: 'Як проводиш вихідні?',
    answers: ['За кермом', 'Удома', 'У подорожах'],
  },
  {
    title: 'Який твій характер?',
    answers: ['Зухвалий', 'Стриманий', 'Непередбачуваний'],
  },
];

export default function DodgeGamePage() {
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);

  const car = Object.values(answers).some(
    answer =>
      answer === 'Завжди на максимумі' ||
      answer === 'Зухвалий'
  )
    ? 'Challenger SRT Demon'
    : 'Dodge Durango';

  return (
    <main className="test-layout">
      <section>
        {questions.map((question, index) => (
          <section key={question.title}>
            <h2 className="question-title">{question.title}</h2>

            {question.answers.map(answer => (
              <label
                key={answer}
                className={`question-option ${
                  answers[index] === answer ? 'selected' : ''
                }`}
              >
                <span>{answer}</span>

                <input
                  type="radio"
                  name={`game-${index}`}
                  checked={answers[index] === answer}
                  onChange={() => {
                    setAnswers(prev => ({
                      ...prev,
                      [index]: answer,
                    }));
                    setFinished(false);
                  }}
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
          Дізнатися результат
        </button>
      </section>

      <section>
        {finished && (
          <>
            <h2 className="result-title">Ти як:</h2>

            <img
              className="result-image"
              src="/images/cars/challenger/challenger-red.png"
              alt={car}
            />

            <p className="result-description">{car}</p>

            <Link className="btn" to="/garage" state={{ car }}>
              Переглянути автомобіль
            </Link>
          </>
        )}
      </section>
    </main>
  );
}
