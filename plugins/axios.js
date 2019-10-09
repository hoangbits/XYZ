import axios from 'axios';
// import store from '~store'

let instance = axios.create({ baseURL: process.env.apiBaseUrl, timeout: 20000 });

if (process.BROWSER_BUILD) {
  instance.interceptors.request.use(
    config => {
      console.log('need to add the Token: ', config);
      return config;
    },
    error => Promise.reject(error)
  );
  instance.interceptors.response.use(
    response => response,
    error => {
      if (error.response.status >= 500) {
        console.log('error: ', error);
      } else if (error.response.status === 401) {
        console.log('error: ', error.response);
      }
      return Promise.reject(error);
    }
  );
}

export const callApi = ({ method = 'get', ...rest }) => {
  return instance({ method, ...rest });
};

export default instance;
