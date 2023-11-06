import Notiflix from 'notiflix';
import axios from 'axios';

const API_KEY =
  'live_6kgQm9Oq7Y1uFrZScxmMgASQPnA6WAWCKTXaxLesgTg3ZHEjiqVNW2Skf6dwGuw8';
axios.defaults.headers.common['x-api-key'] = API_KEY;

const BASE_URL = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {
  return fetch(`${BASE_URL}/breeds`, {
    headers: {
      'x-api-key': API_KEY,
    },
  }).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}

export function fetchCatByBreed(breedId) {
  return fetch(`${BASE_URL}/images/${breedId}`, {
    headers: {
      'x-api-key': API_KEY,
    },
  }).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}

// test
