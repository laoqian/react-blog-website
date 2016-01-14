import fetch from 'isomorphic-fetch';

export const USER_SEARCH = '用户查询';
const ADMIN_URL = 'https://localhost/admin/user_search'

export function user_search(id) {
  return {
    type:USER_SEARCH,
    id:id,
    method:'post',
    url:ADMIN_URL
  }
}

