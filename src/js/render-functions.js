import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

export const galleryEl = document.querySelector('.gallery');
const loader = document.querySelector('#loader');
export const loadMoreBtnEl = document.querySelector('#load-more-btn');

export const lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250
    });

export function createGallery(images) {
    const markup = images
        .map(
            ({
                webformatURL,
                largeImageURL,
                tags,
                likes,
                views,
                comments,
                downloads
            }) => {
                const keywords = tags.split(',').slice(0, 5).join(', ');
                return `
                <li class="gallery-item">
                <a href="${largeImageURL}">
                    <img src="${webformatURL}" alt="${keywords}" loading="lazy" class="gallery-image" />
                </a>
          <div class="image-info">
            <div class="info-item">
              <p class="info-title"><b>❤️ likes:</b></p>
              <p class="info-value">${likes}</p>
            </div>
            <div class="info-item">
              <p class="info-title"><b>👁️ views:</b></p>
              <p class="info-value">${views}</p>
            </div>
            <div class="info-item">
              <p class="info-title"><b>💬 comments:</b></p>
              <p class="info-value">${comments}</p>
            </div>
            <div class="info-item">
              <p class="info-title"><b>⬇️ downloads:</b></p>
              <p class="info-value">${downloads}</p>
            </div>
          </div>
            </li>`;
            }
        )
        .join('');
    
    galleryEl.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
};

export function clearGallery() {
    galleryEl.innerHTML = '';
};

export function showLoader() {
    loader.hidden = false;
};

export function hideLoader() {
    loader.hidden = true;
};

export function showLoadMoreButton() {
    loadMoreBtnEl.hidden = false;
};
  
export function hideLoadMoreButton() {
    loadMoreBtnEl.hidden = true;
};