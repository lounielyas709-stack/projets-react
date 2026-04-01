import { genres } from '../data'

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
