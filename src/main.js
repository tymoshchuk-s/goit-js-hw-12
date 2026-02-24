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
    
import { PER_PAGE } from './js/pixabay-api';

const formEl = document.querySelector('.form');
const input = formEl.querySelector("input[name='search-text']");


let query = '';
let page = 1;

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
    hideLoadMoreButton();
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
            if (data.totalHits <= PER_PAGE) {
                iziToast.info({
                    message: `We're sorry, but you've reached the end of search results.`,
                    position: 'topRight',
                });
                hideLoadMoreButton()
            } else {
                showLoadMoreButton();
            }
        }
    } catch (error) {
        iziToast.error({
            message: `Error: ${error.message}`,
            position: 'topRight',
        });
        hideLoadMoreButton();
    } finally {
        hideLoader();
    }
}

async function onloadMore() {
    page++
    showLoader();
    hideLoadMoreButton();

try {
    const data = await getImagesByQuery(query, page);
    createGallery(data.hits);
    
    const totalResult = data.totalHits;
    const totalPages = Math.ceil(totalResult / PER_PAGE);

        if (page >= totalPages) {
            iziToast.info({
                message: `We're sorry, but you've reached the end of search results.`,
                position: 'topRight',
            });
            hideLoadMoreButton()
        } else {
            showLoadMoreButton();
        }
    
    
    
    const cardEl = document.querySelector('.gallery-item');
    if (cardEl) {
        const cardHeight = cardEl.getBoundingClientRect().height;
        window.scrollBy({
            left: 0,
            top: cardHeight * 2,
            behavior: 'smooth'
        });
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