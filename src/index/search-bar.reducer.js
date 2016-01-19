import  {Explore} from '../../lib/explore'
import { EXPLORE_CHANGE } from './action.js'



var bar  = new Explore();


bar.addInput({name:'用户名',placeholder:'你的名字'});
bar.addSelect({
  name:'用户名',
  op:[
    {name:'中国'},
    {name:'美国'},
    {name:'俄罗斯'},
    {name:'韩国'}
  ]
});
bar.addSelect({
  name:'国籍',
  op:[
    {name:'中国'},
    {name:'美国'},
    {name:'俄罗斯'},
    {name:'韩国'}
  ]
});
bar.addSelect({
  name:'曾近',
  op:[
    {name:'中国'},
    {name:'美国'},
    {name:'俄罗斯'},
    {name:'韩国'}
  ]
});


export default function SearchBar(state=bar.get(), action){
     switch (action.type){
       case EXPLORE_CHANGE:
         return action.explore
       default:
           return state
     }
}
