import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');

fetchBreeds()
  .then(data => {
    data.map(({ id, name }) => {
      const option = document.createElement('option');
      option.value = id;
      option.text = name;
      breedSelect.appendChild(option);
    });
    new SlimSelect({
      select: '#selectElement',
      settings: {
        placeholderText: 'Select a breed',
      },
    });
  })
  .catch(error => {
    console.log(error);
    Notiflix.Notify.failure('Please reload the page.');
  })
  .finally(() => hideLoader());

breedSelect.addEventListener('change', function () {
  const breedId = breedSelect.value;

  showLoader();

  fetchCatByBreed(breedId)
    .then(data => {
      const imgElement = document.createElement('img');
      imgElement.src = data[0].url;
      imgElement.height = 300;
      imgElement.classList.add('cat-image');
      catInfo.innerHTML = '';
      catInfo.appendChild(imgElement);

      fetchBreeds()
        .then(cats => {
          const selectedCat = cats.find(cat => cat.id === breedId);

          const nameElement = document.createElement('h2');
          nameElement.textContent = `${selectedCat.name}`;
          catInfo.appendChild(nameElement);

          const descriptionElement = document.createElement('p');
          descriptionElement.textContent = `${selectedCat.description}`;
          catInfo.appendChild(descriptionElement);

          const temperamentElement = document.createElement('p');
          temperamentElement.textContent = `Temperament: ${selectedCat.temperament}`;
          temperamentElement.classList.add('temperament');
          catInfo.appendChild(temperamentElement);
        })
        .catch(error => {
          console.log(error);
          Notiflix.Notify.failure('Please reload the page.');
        })
        .finally(() => hideLoader());
    })
    .catch(error => {
      console.log(error);
      Notiflix.Notify.failure('Please reload the page.');
    })
    .finally(() => hideLoader());
});

function showLoader() {
  document.querySelector('.loader-container').style.display = 'flex';
}

function hideLoader() {
  document.querySelector('.loader-container').style.display = 'none';
}
