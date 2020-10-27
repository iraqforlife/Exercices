import axios from "axios";
import React, { Component } from "react";

export default class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: [],
      title: "",
      description: "",
      src: "",
      file: null,
      addItemFormActive: false
    };
  }

  onDrop(picture) {
    console.log(picture);
    this.setState({
      pictures: this.state.pictures.concat(picture)
    });
  }

  setActiveAddItem() {
    let value = this.state.addItemFormActive;
    this.setState({ addItemFormActive: !value });
  }

  handleItem(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  addItem() {
    const data = new FormData();
    data.append("Title", this.state.title);
    data.append("Description", this.state.description);
    data.append("file", this.state.file);
    axios
      .post("/api/images", data)
      .then(() => { 
        this.setState({ addItemFormActive: false })
        window.location.reload();
      });
  }
  preview(event) {
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = x => {
        this.state.file = file;
        this.state.src = x.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  addItemForm() {
    return (
      <form className="add-item-form">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={this.state.title}
          onChange={e => this.handleItem(e)}
        />
        <input type="file" accept="image/*" onChange={e => this.preview(e)} />
        <img src={this.state.src} />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={this.state.description}
          onChange={e => this.handleItem(e)}
        />
        <button className="themed-btn" onClick={e => this.addItem(e)}>
          Add Item
        </button>
      </form>
    );
  }

  render() {
    return (
      <div className="list-container">
        {this.state.addItemFormActive ? (
          this.addItemForm()
        ) : (
          <button
            className="themed-btn"
            onClick={() => this.setActiveAddItem()}
          >
            +
          </button>
        )}
      </div>
    );
  }
}
