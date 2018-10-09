import React , {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {getCurrentProfile} from "../../actions/profileActions";
import Spinner from  "../common/Spinner";



class Dashboard extends  Component{
    componentDidMount(){
        this.props.getCurrentProfile();
    }

    render(){

        const {user} = this.props.auth;
         const {profile,loading} = this.props.profile;
         console.log("this.props.profile :: ", this.props.profile);

         console.log("profile :: ", profile);
         console.log("loading :: ", loading);

        // const profile = null;
        //   const  loading = null;

        let dashboardContent;

        if(profile === null || loading){
                dashboardContent = <Spinner/>
        }
        else {
                dashboardContent = <h1>Hello</h1>

            if(Object.keys(profile).length > 0){
                dashboardContent = <h4> TODO: DISPLAY PROFILE</h4>
            }
            else{
                //User is logged in but has no profile
                dashboardContent =(
                    <div>
                            <p className="lead text-muted"> Welcome {user.name}</p>
                            <p> You have not yet setup a profile, please add some info</p>
                            <Link  to="/create-profile" className="btn btn-lg btn-info">
                                Create Profile
                            </Link>
                    </div>
                )
            }
        }

        return(
           <div className="dashboard">
               <div className="container">
                   <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4">Dashboard</h1>
                            {dashboardContent}
                        </div>
                   </div>
               </div>
           </div>
        )
    }
}

Dashboard.propTypes ={
    getCurrentProfile: PropTypes.func.isRequired,
    auth : PropTypes.object.isRequired,
    profile:PropTypes.object.isRequired
}


function mapStateToProps(state){
    return{
            profile : state.profile,
            auth: state.auth
    }
}


export default  connect(mapStateToProps , {getCurrentProfile} ) (Dashboard);