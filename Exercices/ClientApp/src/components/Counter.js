import React, { Component } from 'react';
import UserStore from '../stores/UserStore';

export class Counter extends Component {
  static displayName = Counter.name;

  constructor(props) {
    super(props);
    this.state = { currentCount: 0 };
    this.incrementCounter = this.incrementCounter.bind(this);
  }

  incrementCounter() {
    this.setState({
      currentCount: this.state.currentCount + 1
    });
  }

  render() {
    return (
      <div>
        
        {UserStore.token ? 
      <div>
        <h1>Counter</h1>
        
        <p>This is a simple example of a React component.</p>

        <p aria-live="polite">Current count: <strong>{this.state.currentCount}</strong></p>

        <button className="btn btn-primary" onClick={this.incrementCounter}>Increment</button>

      </div>        
      :
        <p>Connexion est requise pour voir le contenu. S.v.p retourner dans la page</p> 
        }
      </div>
    );
  }
}
