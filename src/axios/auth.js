import axios from 'axios';

const authSignUpInstance = axios.create({
  baseURL:
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBZwIKjaqmAKvpBvI6i8jOFAmxA_MD2v54',
});

const authSignInInstance = axios.create({
  baseURL:
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBZwIKjaqmAKvpBvI6i8jOFAmxA_MD2v54',
});

export { authSignUpInstance, authSignInInstance };

