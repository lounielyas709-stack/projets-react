import { genres, movies, users } from '../data'

const opinions = [
  "A masterpiece. The cinematography alone is worth the watch.",
  "Surprisingly moving. I didn't expect to care this much about the characters.",
  "Overrated in my opinion. The pacing drags in the second half.",
  "One of the best films I've seen this year. Absolutely gripping from start to finish.",
  "Visually stunning but the script feels hollow. Style over substance.",
  "The performances are outstanding. Every scene feels authentic.",
  "A bit slow to start, but the payoff is incredible. Stick with it.",
  "Genuinely unsettling. It stayed with me for days after watching.",
  "Fun and entertaining, though it won't change your life.",
  "A rare film that manages to be both intellectually stimulating and emotionally engaging.",
  "The direction is impeccable. Every shot feels intentional.",
  "Disappointing. Had so much potential but failed to deliver on its premise.",
  "An emotional rollercoaster. I laughed, I cried, I was on the edge of my seat.",
  "Solid but forgettable. Nothing stands out as particularly memorable.",
  "A bold and ambitious film. Not perfect, but impossible to look away from.",
]

const castPool  = ['Emma Stone', 'Ryan Gosling', 'Cillian Murphy', 'Zendaya', 'Timothée Chalamet', 'Ana de Armas', 'Tom Hanks', 'Margot Robbie']
const directors = ['Denis Villeneuve', 'Christopher Nolan', 'Bong Joon-ho', 'Makoto Shinkai', 'Ridley Scott', 'Sofia Coppola']
const descs     = [
  'A visually stunning journey through space and time, pushing the boundaries of what cinema can achieve.',
  'A gripping psychological thriller that keeps you on the edge of your seat until the very last frame.',
  'An intimate portrait of human connection in a world increasingly defined by isolation and technology.',
  'A breathtaking epic that blends ancient mythology with cutting-edge visual storytelling.',
]

export function strSeed(str) {
  return str.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
}

export function getMovieStats(name) {
  const seed = strSeed(name)
  return {
    rating:      ((seed % 30) + 65) / 10,
    genre:       genres[seed % genres.length],
    runtime:     (seed % 60) + 90,
    votes:       ((seed % 900) + 100) * 1000,
    director:    directors[seed % directors.length],
    cast:        [castPool[seed % castPool.length], castPool[(seed + 2) % castPool.length], castPool[(seed + 4) % castPool.length]],
    description: descs[seed % descs.length],
    budget:      (seed % 150) + 50,
    language:    ['English', 'French', 'Japanese', 'Korean'][seed % 4],
  }
}

export function getFilmRecommenders(name) {
  const seed = strSeed(name)
  const count = (seed % 3) + 2
  return Array.from({ length: count }, (_, i) => {
    const id   = (seed + i * 3) % users.length
    const user = users[id]
    return { id, name: `${user.firstName} ${user.lastName}` }
  })
}

export function getUserReviews(firstName, lastName) {
  const seed = strSeed(firstName + lastName)
  const count = (seed % 3) + 3
  return Array.from({ length: count }, (_, i) => {
    const movie   = movies[(seed + i * 7) % movies.length]
    const rating  = ((seed + i * 13) % 5) + 6
    const opinion = opinions[(seed + i * 5) % opinions.length]
    return { name: movie.name, year: movie.year, rating, opinion }
  })
}

export function getUserStats(firstName, lastName) {
  const seed = strSeed(firstName + lastName)
  return {
    watched:   (seed % 180) + 20,
    reviews:   (seed % 80)  + 5,
    avgRating: ((seed % 30) + 60) / 10,
    genre:     genres[seed % genres.length],
    progress:  (seed % 55) + 40,
    year:      2019 + (seed % 5),
    followers: (seed % 900) + 100,
    following: (seed % 300) + 50,
    genres: [
      { name: genres[seed % genres.length],         pct: (seed % 40) + 55 },
      { name: genres[(seed + 1) % genres.length],   pct: (seed % 30) + 35 },
      { name: genres[(seed + 2) % genres.length],   pct: (seed % 25) + 20 },
    ],
  }
}
