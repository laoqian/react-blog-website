/*
*
* action
*
* */


export function art_post_action(title,content){
  return {
    type:ART_POST,
    ajax_type:'post',
    data:{title,content},
    uri:'/article_post'
  }
}
