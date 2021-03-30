import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgah-app-default-rtdb.firebaseio.com/'
});

export { instance };