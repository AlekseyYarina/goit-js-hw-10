import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

const breedSelect = document.querySelector('.breed-select');
breedSelect.addEventListener('change', onSelectChange);
const catInfo = document.querySelector('.cat-info');

fetchBreeds()
  .then(data => {
    let selectMarkup = data
      .map(({ name, reference_image_id }) => {
        return `<option value=${reference_image_id}>${name}</option>`;
      })
      .join('');
    selectMarkup = '<option data-placeholder="true"></option>' + selectMarkup;
    breedSelect.insertAdjacentHTML('beforeend', selectMarkup);
    new SlimSelect({
      select: '#selectElement',
    });
  })
  .catch(error => {
    console.log(error);
    Notiflix.Notify.failure('Please reload the page.');
  })
  .finally(() => hideLoader());

function onSelectChange(e) {
  const breedId = e.target.value;

  showLoader();

  fetchCatByBreed(breedId)
    .then(({ url, breeds }) => {
      catInfo.innerHTML = markupCreator(
        url,
        breeds[0].name,
        breeds[0].description,
        breeds[0].temperament
      );
    })
    .catch(error => {
      console.log(error);
      Notiflix.Notify.failure('Please reload the page.');
    })
    .finally(() => hideLoader());
}

function markupCreator(imgUrl, name, description, temperament) {
  return `
      <img class="cat-image" src=${imgUrl}>
      <div class="description">
        <h2>${name}</h2>
        <p>${description}</p>
        <div class="div-temperament">
              <h3 class="temperament">Temperament</h3>
        <p style="display: inline">${temperament}</p>
        </div>
      </div>`;
}

function showLoader() {
  document.querySelector('.loader-container').style.display = 'flex';
}

function hideLoader() {
  document.querySelector('.loader-container').style.display = 'none';
}
