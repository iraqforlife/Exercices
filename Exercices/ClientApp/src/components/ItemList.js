import React, { Component } from 'react';
import AddItem from './AddItem'
import AuthUtils from '../services/authentification';

export class ItemList extends Component {
  static displayName = ItemList.name;

  constructor(props) {
    super(props);
    this.state = { items: [], loading: true };
  }

  componentDidMount() {
    this.populateWeatherData();
  }

  static renderItems(items) {
    return (
      <>
      <div className="">
        <table className='table table-striped' aria-labelledby="tabelLabel">
          <thead>
            <tr>
              <th>Titre</th>
              <th>Images</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item =>
              <tr key={item.id}>
                <td>{item.title}</td>
                <td></td>
                <td>{item.description}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <AddItem />
      </>
    );
  }


  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : ItemList.renderItems(this.state.items);

    return (
      <div>
        <h1 id="tabelLabel" >Items</h1>
        {contents}
      </div>
    );
  }

  async populateWeatherData() {
    //const response = await fetch('weatherforecast');
    const data = [
      {
        id: 1,
        title: "hi",
        description: "Fsafsafsafafa"
      }
    ]/*await response.json();*/
    this.setState({ items: data, loading: false });
  }
}
