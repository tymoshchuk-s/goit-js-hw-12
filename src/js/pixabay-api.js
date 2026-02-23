import axios from 'axios';

const API_KEY = '54606407-cd906ecd7aeac5d34d8006dc4';
const BASE_URL = 'https://pixabay.com/api/';

export default function getImagesByQuery(query, page) {
    const params = {
            key: API_KEY,
            q: query,
            per_page: 15,
            page: page,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true
    }

    return axios
        .get(BASE_URL, { params })
        .then(response => {
            return response.data
        })
        .catch(error => {
            console.error('Error fetching images:', error);
        });
    }