import  {Explore} from '../../lib/explore.js'
import { EXPLORE_CHANGE } from './action.js'

var bar  = new Explore();
bar.addInput({name:'用户名',placeholder:'你的名字'});
bar.addSelect({
  name:'德国',
  op:['中国', '美国', '俄罗斯','韩国']
});
bar.addSelect({
  name:'国籍',
  op:['中国', '美国', '俄罗斯','韩国']
});
bar.addSelect({
  name:'曾近',
  op:['中国', '美国', '俄罗斯','韩国']
});



export function SearchBar(state=bar.get(), action){
     switch (action.type){
       case EXPLORE_CHANGE:
         return action.explore
       default:
           return state
     }
}



var user_tab = [
  ['名字','住址','联系方式'],
  ['名字','住址','联系方式'],
  ['名字','住址','联系方式'],
  ['名字','住址','联系方式'],
  ['名字','住址','联系方式']
]



export function user_reducer(state=user_tab, action){
  switch (action.type){
    case EXPLORE_CHANGE:
      return action.explore
    default:
      return state
  }
}
