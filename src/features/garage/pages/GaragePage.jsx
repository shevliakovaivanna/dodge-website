
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';


const cars = [
  {
    name: 'Charger',
    models: ['SRT Hellcat'],
    price: 55995,
    colors: [
      {
        name: 'Чорний',
        value: '#050505',
        image: '/images/cars/charger/charger.png',
      },
    ],
  },
  {
    name: 'Durango',
    models: ['R/T'],
    price: 39995,
    colors: [
      {
        name: 'Чорний',
        value: '#050505',
        image: '/images/cars/durango/durango.png',
      },
    ],
  },
  {
    name: 'Challenger',
    models: ['SRT Hellcat'],
    price: 78403,
    colors: [
      {
        name: 'Чорний',
        value: '#050505',
        image: '/images/cars/challenger/challenger-black.png',
      },
      {
        name: 'Червоний',
        value: '#d20e0e',
        image: '/images/cars/challenger/challenger-red.png',
      },
      {
        name: 'Білий',
        value: '#fff',
        image: '/images/cars/challenger/challenger-white.png',
      },
    ],
  },
];


const colors = [
  { name: 'Чорний', value: '#050505' },
  { name: 'Червоний', value: '#d20e0e' },
  { name: 'Білий', value: '#fff' },
];

export default function GaragePage() {
  const location = useLocation();

  const [selectedModel, setSelectedModel] = useState(() => {
  const savedModel = localStorage.getItem('dodgeSelectedModel');

  const requestedCar = location.state?.car || '';

  const car = cars.find(item =>
    requestedCar.includes(item.name)
  );

  return car?.models.includes(savedModel)
    ? savedModel
    : car?.models[0] || cars[2].models[0];
  });

  const [selected, setSelected] = useState(() => {
    const saved = localStorage.getItem('dodgeSelectedCar');
    const requested = location.state?.car || saved;

    const index = cars.findIndex(car =>
      requested?.includes(car.name)
    );

    return index >= 0 ? index : 2;
  });

  const [color, setColor] = useState('Чорний');

  const car = cars[selected];

  const selectedColor =
  car.colors.find(item => item.name === color) || car.colors[0];

  const displayName = `${car.name} ${selectedModel}`;
  
  function selectCar(index) {
  setSelected(index);
  setSelectedModel(cars[index].models[0]);
  setColor(cars[index].colors[0].name);

  localStorage.setItem('dodgeSelectedCar', cars[index].name);
  localStorage.setItem('dodgeSelectedModel', cars[index].models[0]);
  localStorage.setItem('dodgeCarPrice', String(cars[index].price));
  }

  function goToCalendar() {
  localStorage.setItem('dodgeSelectedCar', car.name);
  localStorage.setItem('dodgeSelectedModel', selectedModel);
  localStorage.setItem('dodgeCarPrice', String(car.price));
  }

  return (
    <main className="garage-layout">
      <aside className="car-list">
        {cars.map((item, index) => (
          <div key={item.name}>
            <button
              className={`car-choice ${
                selected === index ? 'active' : ''
              }`}
              onClick={() => selectCar(index)}
            >
              {item.name}
            </button>

            {selected === index &&
                item.models.map((model, modelIndex) => (
                    <button
                        key={model}
                        className={`car-choice ${
                        modelIndex === 0 ? 'active' : ''
            }`}
            onClick={() => {
            setSelectedModel(model);
            localStorage.setItem(
            'dodgeSelectedModel',
            model
        );
      }}
    >
      {model}
    </button>
  ))}
          </div>
        ))}
      </aside>

      <section className="car-display">
        <div className="car-image-box">
            <img
                src={selectedColor.image}
                alt={`${displayName} — ${selectedColor.name}`}
            />
        </div>

        <div className="car-price">
          $ {car.price.toLocaleString('en-US')}
        </div>

        <div className="color-options">
            {car.colors.map(item => (
                <button
                    key={item.name}
                    type="button"
                    title={item.name}
                    aria-label={item.name}
                    className={`color-dot ${
                    selectedColor.name === item.name ? 'active' : ''
            }`}
            style={{ background: item.value }}
            onClick={() => setColor(item.name)}
                 />
            ))}
        </div>

<p className="selected-color">
  Колір: {selectedColor.name}
</p>

        <div className="garage-bottom">
          <Link
            to="/calendar"
            className="btn"
            onClick={goToCalendar}
          >
            Перейти до календаря
          </Link>
        </div>
      </section>
    </main>
  );
}
