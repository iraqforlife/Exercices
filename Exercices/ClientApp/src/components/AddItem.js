import axios from "axios";
import React, { Component } from "react";
import ImageUploader from "react-images-upload";

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
    data.append("title", this.state.title);
    data.append("description", this.state.description);
    data.append("file", this.state.file);
    axios
      .post("/api/images", {
        Title: this.state.title,
        Description: this.state.description,
        File: this.state.file
      })
      .then(this.setState({ addItemFormActive: false }));
  }
  preview(event) {
    console.log(event);
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
      <form>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={this.state.title}
          onChange={e => this.handleItem(e)}
        />
        <input type="file" accept="image/*" onChange={e => this.preview(e)} />
        <img src={this.state.src} />
        {/*<ImageUploader
            withIcon={true}
            buttonText="Choose images"
            onChange={e => this.onDrop(e)}
            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
            maxFileSize={5242880}
            value={this.state.file}
            name="file"
          />*/}
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
