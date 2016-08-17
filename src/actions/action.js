/*
*
* action
*
* */
import * as action_type from  '../action_type'

export function art_post_action(title,content){
  return {
    type:action_type.POST_ARTICLE,
    ajax_type:'post',
    data:{title,content},
    uri:'/article_post'
  }
}
