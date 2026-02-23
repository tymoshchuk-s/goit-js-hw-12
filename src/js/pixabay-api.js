import axios from 'axios';

const API_KEY = '54606407-cd906ecd7aeac5d34d8006dc4';
const BASE_URL = 'https://pixabay.com/api/';
export const PER_PAGE = 15;

export default async function getImagesByQuery(query, page) {
    const params = {
        key: API_KEY,
        q: query,
        per_page: PER_PAGE,
        page,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true
    }

    try {
        const response = await axios(BASE_URL, { params });
        return response.data;
    } catch (error) {
        throw error;
    };
};