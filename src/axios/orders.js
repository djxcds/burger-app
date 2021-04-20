import axios from 'axios';

const ordersInstance = axios.create({
    baseURL: 'https://burgah-app-default-rtdb.firebaseio.com/'
});

export { ordersInstance };