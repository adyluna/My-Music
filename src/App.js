import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      loginSubmitButton: true,
    };
  }

  onChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  };

  checkName = ({ target }) => {
    const { name, value } = target;
    const minNameLength = 3;
    this.setState({
      [name]: value,
    }, () => {
      if (value.length >= minNameLength) {
        this.setState({ loginSubmitButton: false });
      }
    });
  };

  render() {
    const { loginSubmitButton, userName } = this.state;

    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ () => (<Login
              value={ userName }
              name="userName"
              onChange={ this.checkName }
              buttonName="loginSubmitButton"
              disabled={ loginSubmitButton }
            />) }
          />
          <Route path="/search" component={ Search } />
          <Route path="/album/:id" component={ Album } />
          <Route path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route path="*" component={ NotFound } />
          <p>TrybeTunes</p>
        </Switch>
      </BrowserRouter>

    );
  }
}

export default App;
