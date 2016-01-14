import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SearchBar from '../components/Explore';
import Header from '../components/Header';
import MainLeft from '../components/Main-left';
import MainRight from '../components/Main-right';
import { user_search} from '../actions/search';
import React,{Component} from 'react';


class App  extends Component{
  render() {
    return (
      <div className="wrapper">
        <Header/>
        <MainLeft mainMenu={this.props.mainMenu}/>
        <MainRight/>
      </div>
    )
  }
}


function mapStateToProps(state){
  return{
    id:state.id,
    mainMenu:state.mainMenu
  }
}

function mapActionToProps(dispatch){
  return{
    search:bindActionCreators(user_search, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapActionToProps
)(App);
