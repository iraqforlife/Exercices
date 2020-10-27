import React, { Component } from 'react';
import AuthUtils from '../services/authentification';
import Login from "./Login";
import Register from "./Register";
import { ItemList } from './ItemList';

export class Home extends Component {
  static displayName = Home.name;
  
  constructor(props) {
    super(props)
    this.state = {
      loginSelected: true
    }
  }

  switchForms() {
    let switchValue = !this.state.loginSelected;
    this.setState({loginSelected: switchValue});
  }

  render () {
    return (
      <>
      {AuthUtils.isLoggedIn() ? 
      <div>
        <ItemList />
      </div> : 
        <div>
          {this.state.loginSelected ? 
              <Login />
            :
              <Register />
          }
          <button className="button-anchor-link" onClick={() => this.switchForms()}>
            {this.state.loginSelected ? 
              "Pas de compte? Enregistrez vous"
              :
              "Connexion"
            }
            </button>
        </div>
      }
      </>
    );
  }
}
