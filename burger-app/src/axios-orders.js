import axios from 'axios';

 const instance = axios.create({
    baseURL:'https://burger-app-8f106.firebaseio.com/'
})
export default instance;