import React, {useState, useEffect, useContext, useReducer, usePrevious, Suspense} from 'react';
import ReactDOM from 'react-dom';
import 'gestalt/dist/gestalt.css';
import Home from './components/main';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import {getToken} from './utils/index'
import * as serviceWorker from './serviceWorker';
import './components/app.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import brews from './components/brews';
import Signin from './components/signin';
import Signup from './components/signup';
import Checkout from './components/checkout';
import Navbar from './components/navbar';

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        getToken() !== null ? 
        <Component {...props} /> : <Redirect to={{
            pathname: '/signin',
            state: {from: props.location}
        }}/>

    )} />
)

const App = () => {

        return(
         <>

       
            <Router>
            <>
                <Navbar/>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
         
                
                <Route exact path="/" component={Home}/>
                <Route path="/signin" component={Signin}/>
                <Route path="/signup" component={Signup}/>
                <PrivateRoute path="/checkout" component={Checkout}/>
                <Route path="/:brandId" component={brews}/>
              
    
             
            </Switch>
          </Suspense>
          </>
        </Router>
     
</>
          
        )
    }



ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();


if(module.hot) {
    module.hot.accept();
}