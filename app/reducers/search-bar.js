import  {Explore} from '../lib/explore'



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
  name:'用户名',
  op:[
    {name:'中国'},
    {name:'美国'},
    {name:'俄罗斯'},
    {name:'韩国'}
  ]
});
bar.addSelect({
  name:'用户名',
  op:[
    {name:'中国'},
    {name:'美国'},
    {name:'俄罗斯'},
    {name:'韩国'}
  ]
});

export default function SearchBar(state=bar.get(), action) {
      return state
}
