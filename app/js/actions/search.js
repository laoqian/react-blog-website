import fetch from 'isomorphic-fetch';

export const USER_SEARCH = '用户查询';
const ADMIN_URL = 'https://localhost/admin/user_search'

export function user_search(id) {
  return {
    type:USER_SEARCH,
    user:id,
    method:'post',
    url:ADMIN_URL
  }
}


export function fetchUser(id){
  return {
    id:444
  }
  //fetch(ADMIN_URL)
  //.then(res=>alert(res))
  //.catch(res=>alert(res));
}
