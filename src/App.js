import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './shared/Includes';

// Components
import Layout from './shared/Layout';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Dash from './pages/Dash';

class App extends Component {
  render() {
    return (
      <Switch>
        {/* <Route exact path="/" render={() => <Layout> <Contacts /> </Layout>} /> */}
        <Route exact path="/dash" render={() => <Layout> <Dash /> </Layout>} />
        <Route exact path="/" render={() => <Register />} />
        <Route path="/login" render={() => <Login />} />
      </Switch>
    );
  }
}

export default App;
