/**
 * Created by yu on 2016/7/8.
 */
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router'



class ContentHeader extends Component {
    render() {
        let index=0;
        return (
            <div className="content-header flex flex-between-row">
                <div>
                    {
                        this.props.path.map(path=>{
                            if(this.props.path.length==index+1){
                                return  <span key={index++}><Link to={path.link}>{path.name}</Link></span>
                            }else{
                                return  <span key={index++}><Link to={path.link}>{path.name}</Link>&raquo;</span>
                            }})
                    }
                </div>
                <Link to="/art-post" >发表新文章</Link>
            </div>
        )
    }
}



//BlogList.propTypes = {
//  art_list: PropTypes.array.isRequired,
//  hots_list: PropTypes.array.isRequired
//};


function mapStateToProps(state){
    return{
        path:state.web_path
    }
}

function mapActionToProps(dispatch){
    return{}
}

export default connect(
    mapStateToProps,
    mapActionToProps
)(ContentHeader);

