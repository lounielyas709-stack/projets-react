import { useState } from 'react'
import './App.css'

import UserProfile from './components/UserProfile'
import MovieCard from './components/MovieCard';

function App() {
  const [counter, setCounter] = useState(0);
  const [showUsers, setShowUsers] = useState(true);

  const users = [
    { firstName: "John", lastName: "Doe", country: "France" },
    { firstName: "Marie", lastName: "Zanzibar", country: "Germany" },
    { firstName: "Richard", lastName: "Gascan", country: "UK" },
    { firstName: "Sofia", lastName: "Martinez", country: "Spain" },
    { firstName: "Luca", lastName: "Romani", country: "Italy" },
    { firstName: "Yuki", lastName: "Tanaka", country: "Japan" },
    { firstName: "Alex", lastName: "Carter", country: "USA" },
  ];

  const movies = [
    { name: "Your Name", year: "2016" },
    { name: "Interstellar", year: "2014" },
    { name: "Dune", year: "2021" },
    { name: "Oppenheimer", year: "2023" },
    { name: "Blade Runner 2049", year: "2017" },
    { name: "The Matrix", year: "1999" },
    { name: "Inception", year: "2010" },
    { name: "Parasite", year: "2019" },
  ];

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">React Playground</h1>
        <p className="app-subtitle">Components demo</p>
      </header>

      <main className="app-main">

        <section className="section">
          <h2 className="section-title">Counter</h2>
          <div className="counter-widget">
            <button className="btn btn-minus" onClick={() => setCounter(c => c - 1)}>−</button>
            <span className="counter-value">{counter}</span>
            <button className="btn btn-plus" onClick={() => setCounter(c => c + 1)}>+</button>
          </div>
        </section>

        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Users</h2>
            <button className="btn btn-toggle" onClick={() => setShowUsers(!showUsers)}>
              {showUsers ? 'Hide' : 'Show'}
            </button>
          </div>
          {showUsers && (
            <div className="cards-grid">
              {users.map((user, id) => (
                <UserProfile key={id} firstName={user.firstName} lastName={user.lastName} country={user.country} />
              ))}
            </div>
          )}
        </section>

        <section className="section">
          <h2 className="section-title">Movies</h2>
          <div className="cards-grid">
            {movies.map((movie, id) => (
              <MovieCard key={id} name={movie.name} year={movie.year} />
            ))}
          </div>
        </section>

      </main>
    </div>
  )
}

export default App
