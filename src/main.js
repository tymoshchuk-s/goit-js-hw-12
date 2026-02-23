import getImagesByQuery from './js/pixabay-api';

import {
    createGallery,
    clearGallery,
    showLoader,
    hideLoader,
    showLoadMoreButton,
    hideLoadMoreButton
    } from './js/render-functions';

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import {
    galleryEl,
    loadMoreBtnEl
    } from './js/render-functions';

const formEl = document.querySelector('.form');
const input = formEl.querySelector("input[name='search-text']");


let query = '';
let page = 0;

formEl.addEventListener('submit', handleSubmit);
loadMoreBtnEl.addEventListener('click', onloadMore);

hideLoadMoreButton();

async function handleSubmit(event) {
    event.preventDefault();
    query = input.value.trim()
    page = 1;

    if (!query) {
        iziToast.warning({
            message: 'Please enter a search query.',
            position: 'topRight',
        });
        return;
    }

    clearGallery();
    showLoader();
    

    try {
        const data = await getImagesByQuery(query, page);
        
        if (data.hits.length === 0) {
            iziToast.error({
                message:
                    'Sorry, there are no images matching your search query. Please try again!',
                position: 'topRight',
            });

            hideLoadMoreButton();            
        } else {
            createGallery(data.hits);
            input.value = '';
            showLoadMoreButton();
        }
    } catch (error) {
        iziToast.error({
            message: `Error: ${error.message}`,
            position: 'topRight',
        });
    } finally {
        hideLoader();
    }
}

async function onloadMore(event) {
    page++
    loadMoreBtnEl.textContent = "Loading..."
    showLoader();

try {
    const data = await getImagesByQuery(query, page);
    createGallery(data.hits);

    const totalResult = data.totalHits;
    const perPage = data.hits.length;
    const totalPages = totalResult / perPage;

    showLoadMoreButton();

        if (page >= totalPages) {
            hideLoadMoreButton()
            iziToast.info({
                message: `We're sorry, but you've reached the end of search results.`,
                position: 'topRight',
            });
        }
    const cardEl = document.querySelector('.gallery-item');
    const cardHeight = cardEl.getBoundingClientRect().height;

    window.scrollBy({
        left: 0,
        top: cardHeight,
        behavior: 'smooth'
    })


    console.log()
    } catch (error) {
        iziToast.error({
            message: `Error: ${error.message}`,
            position: 'topRight',
        });
    } finally {
    loadMoreBtnEl.textContent = "Load more"
    hideLoader();
    };
}