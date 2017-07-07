/** Created by Min on 2017/6/29.  */
import { user, makeService } from '../utils/api';

export const userData = makeService(user.user);

export const add_user = makeService(user.add_user, 'POST');

export const edit_user = makeService(user.edit_user, 'POST');

export const delete_user = makeService(user.delete_user, 'POST');
