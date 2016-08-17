/**
 * Created by yu on 2016/7/8.
 */
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router'
import $ from 'jquery'


class ContentHeader extends Component {
    render() {
        let index=0,newth_bar;

        if(!$.isEmptyObject(this.props.user)){
            newth_bar = <Link to="/art-post" >发表新文章</Link>;
        }
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
                {newth_bar}
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
        path:state.web_path,
        user:state.website.user
    }
}

function mapActionToProps(dispatch){
    return{}
}

export default connect(
    mapStateToProps,
    mapActionToProps
)(ContentHeader);

