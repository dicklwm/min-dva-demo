/** Created by Min on 2017/6/29.  */
import request from '../utils/request';
import { parseParam } from '../utils/func';
import { user } from '../utils/api';

export async function userData(params) {
  return request(user.user, {
    method: 'GET',
    credentials: 'include',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
  });
}
