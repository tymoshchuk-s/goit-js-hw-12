import getImagesByQuery from './js/pixabay-api';

import {
    createGallery,
    showLoader,
    hideLoader,
    clearGallery
    } from './js/render-functions';

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const formEl = document.querySelector('.form');
const input = formEl.querySelector("input[name='search-text']")

formEl.addEventListener('submit', handleSubmit)

async function handleSubmit(event) {
    event.preventDefault();
    const query = input.value.trim()

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
        const data = await getImagesByQuery(query);
        
        if (data.hits.length === 0) {
            iziToast.error({
                message:
                    'Sorry, there are no images matching your search query. Please try again!',
                position: 'topRight',
            });
        } else {
            createGallery(data.hits);
            input.value = '';
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