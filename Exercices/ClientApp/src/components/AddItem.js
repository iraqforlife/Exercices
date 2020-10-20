import React, { Component } from 'react';
import ImageUploader from 'react-images-upload';

export default class AddItem extends Component {

	constructor(props) {
		super(props);
		this.state = {
			pictures: [],
			addItemFormActive: false
		}
	}  

	onDrop(picture) {
		console.log(picture)
        this.setState({
            pictures: this.state.pictures.concat(picture),
		})
	}
	
	handleAddItem() {
		let value = this.state.addItemFormActive;
		this.setState({addItemFormActive: !value});
	}

	addItemForm() {
		return (
			<form className="">
				<input type="text" name="title" placeholder="Title"/>
				<ImageUploader
					withIcon={true}
					buttonText='Choose images'
					onChange={(e) => this.onDrop(e)}
					imgExtension={['.jpg', '.gif', '.png', '.gif']}
					maxFileSize={5242880}
            	/>
				<input type="text" name="description" placeholder="Description"/>
			</form>
		)
	}
	
	render() {
		return (
			<div className="list-container" >
				{this.state.addItemFormActive ? this.addItemForm() : null}
				<button className="themed-btn" onClick={() => this.handleAddItem()}>
					Add Item
				</button>
			</div>
		);
	}
}