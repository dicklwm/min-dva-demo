/** Created by Min on 2017-01-14.  */
import request from '../utils/request';
import { parseParam } from '../utils/func';
import { index } from '../utils/api';

export async function login(params) {
  return request(index.login, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    body: parseParam(params),
  });
}

export async function logout() {
  return request(index.logout, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
}
