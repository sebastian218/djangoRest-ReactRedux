import React, {Component,Fragment} from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import Header from './layout/Header';
import Alerts from './layout/Alerts';
import DashBoard from './leads/DashBoard';
import {Provider as AlertProvider} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import {Provider} from 'react-redux';
import store from '../store';
import Login from './accounts/login';
import Register from './accounts/register';
import { loadUser } from '../actions/auth';
import PrivateRoute from './common/PrivateRoute';

// Alerts Options
const alertOptions ={
    timeout: 3000,
    position: 'top center'
}
class App extends Component {

    componentDidMount() {
        store.dispatch(loadUser());
    }
    render(){
        return (
            <Provider store={store}>
            <AlertProvider template={AlertTemplate} {...alertOptions} >
            <Router>
                <Fragment>
                    <Header />
                    <Alerts />
                        <div className="container">
                         <Switch>
                             <PrivateRoute exact path="/" component={DashBoard} /> 
                             <Route exact path="/register" component={Register} /> 
                             <Route exact path="/login" component={Login} /> 
                         </Switch>
                        </div>
                </Fragment> 
            </Router>
            </AlertProvider>
            </Provider>
            
            
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))