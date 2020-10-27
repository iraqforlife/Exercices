import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { ItemList } from './components/ItemList';
import 'semantic-ui-css/semantic.min.css'
import './app.scss';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route path='/item-list' component={ItemList} /> 
        <Route exact path='/' component={Home} />
      </Layout>
    );
  }
}
