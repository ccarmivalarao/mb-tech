import './App.css';
import Landing from './components/layout/Landing';
import NavBar from './components/layout/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import store from './store';
import { useEffect } from 'react'

import Alert from './components/layout/Alert';
import PrivateRoute from './components/routing/PrivateRoute';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile/CreateProfile';
import EditProfile from './components/profile/EditProfile';
import AddExperience from './components/profile/AddExperience';
import AddEducation from './components/profile/AddEducation';
import Profiles from './components/profile/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/post/Posts';
import Post from './components/post/Post';

const App = () => {
  useEffect(() => {
    // check for token in LS
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <>
          <NavBar />
          <Route exact path='/' component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/profiles' component={Profiles} />
              <Route exact path='/profiles/:id' component={Profile} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute exact path='/create-profile' component={CreateProfile} />
              <PrivateRoute exact path='/edit-profile' component={EditProfile} />
              <PrivateRoute exact path='/add-experience' component={AddExperience} />
              <PrivateRoute exact path='/add-education' component={AddEducation} />
              <PrivateRoute exact path='/posts' component={Posts} />
              <PrivateRoute exact path='/posts/:id' component={Post} />
            </Switch>
          </section>
        </>
      </Router>
    </Provider>
  );
}

export default App;
