/**
 * Created by gg on 2016/3/1.
 */




exports = module.exports = function session(req,res,next){
  var session_id = req.sessionID
  var store = req.sessionStore

  req.session.test = 11;
  req.session.test1 = 11;
  store.set(session_id,req.session)
  store.get(session_id,(err,session)=>{
  })
  next()
}