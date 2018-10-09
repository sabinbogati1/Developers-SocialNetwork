import React, {Component} from 'react';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";



import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import {setCurrentUser} from "./actions/authActions";
import {clearCurrentProfile} from "./actions/profileActions";
import Dashboard from "./components/dashboard/Dashboard";

import PrivateRoute from "./components/common/PrivateRoute";

//redux
import {Provider} from "react-redux";
// import {createStore, applyMiddleware} from "redux";

//store
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { logoutUser } from "./actions/authActions";
import CreateProfile from "./components/create-profile/CreateProfile";


import './App.css';

//const store = createStore( ()=> [], {}, applyMiddleware());


//Check for token
if(localStorage.jwtToken){
    //Set auth token header auth
    setAuthToken(localStorage.jwtToken);

    //Decode token and get user info and exp
    const decoded = jwt_decode(localStorage.jwtToken);

    //Set user and isAuhentiated
    store.dispatch(setCurrentUser(decoded));

    //Check for expired token
    const currentTime = Date.now() / 1000;
    if( decoded.exp < currentTime){
        //Logout user
        store.dispatch(logoutUser());

        //Logout user
        store.dispatch(clearCurrentProfile());

        //TODO: clear current Profile
        //Redirect to login
        window.location.href = "/login";
    }

}

class App extends Component {
    render() {
        console.log("I am inside App--render....");
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <Navbar/>
                        <Route exact path="/" component={Landing}/>
                        <div className="container">
                            <Route exact path="/register" component={Register}/>
                            <Route exact path="/login" component={Login}/>
                            <Switch>
                                <PrivateRoute exact path="/dashboard" component={Dashboard}/>
                            </Switch>

                            <Switch>
                                <PrivateRoute exact path="/create-profile" component={CreateProfile}/>
                            </Switch>

                        </div>
                        <Footer/>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
