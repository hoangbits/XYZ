import { callApi } from '~/plugins/axios';

const prefixAuth = '/auth';
const prefixUser = '/users';

const getUser = () =>
  callApi({
    url: `${prefixUser}/me`,
    method: 'get'
  }).then(result => result);

const createUser = data =>
  callApi({
    url: `${prefixAuth}/local/register`,
    method: 'post',
    data
  }).then(result => result);

const loginUser = data =>
  callApi({
    url: `${prefixAuth}/local`,
    method: 'post',
    data
  }).then(result => result);

export default {
  getUser,
  createUser,
  loginUser
};
