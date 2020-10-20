import axios from 'axios';
import React, { Component } from 'react';
import ImageUploader from 'react-images-upload';

export default class AddItem extends Component {

	constructor(props) {
		super(props);
		this.state = {
			pictures: [],
			title: "",
			description: "",
			addItemFormActive: false
		}
	}

	onDrop(picture) {
		console.log(picture)
		this.setState({
			pictures: this.state.pictures.concat(picture),
		})
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

	addItem(event) {
		console.log()
		axios.post('/api/images', {
			Title: this.state.title,
			Description: this.state.description
		})
			.then(this.setState({ "addItemFormActive": false }));
	}

	addItemForm() {
		return (
			<>
				<input type="text" name="title" placeholder="Title" value={this.state.title} onChange={(e) => this.handleItem(e)} />
				{/* <ImageUploader
					withIcon={true}
					buttonText='Choose images'
					onChange={(e) => this.onDrop(e)}
					imgExtension={['.jpg', '.gif', '.png', '.gif']}
					maxFileSize={5242880}
            	/> */}
				<input type="text" name="description" placeholder="Description" value={this.state.description} onChange={(e) => this.handleItem(e)} />
				<button className="themed-btn" onClick={(e) => this.addItem(e)}>Add Item</button>
			</>
		)
	}

	render() {
		return (
			<div className="list-container" >
				{this.state.addItemFormActive ? this.addItemForm() :
					<button className="themed-btn" onClick={() => this.setActiveAddItem()}>
						+
					</button>
				}

			</div>
		);
	}
}