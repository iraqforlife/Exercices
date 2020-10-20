import React, { Component } from 'react';

export default class AddItem extends Component {

	constructor(props) {
		super(props);
		this.state = {
			addItemFormActive: false
		}
	}  

	addItemForm = () => {
		return (
			<form className="">
				<input type="text" name="title" placeholder="Title"/>
				<input type="text" name="image" placeholder="Image"/>
				<input type="text" name="description" placeholder="Description"/>
			</form>
		)
	}
	
	render() {
		return (
			<div className="list-container" >
				{addItemFormActive ? addItemForm() : null}
				
			</div>
		);
	}
}