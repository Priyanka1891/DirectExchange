import React from 'react';
import { Route } from 'react-router-dom';
import WelcomePage from './Welcome';
import LoginForm from './Login';
import RegistrationForm from './Register';

// Main Component
class Main extends React.Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={WelcomePage} />
        <Route path="/welcome/" component={WelcomePage} />
        <Route path="/login/" component={LoginForm} />
        <Route path="/register/" component={RegistrationForm} />

      </div>
    );
  }
}

// Export The Main Component
export default Main;