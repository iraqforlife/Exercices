import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: ""
		}
	}

	handleChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		this.setState({
			[name]: value
		});
	}

	async handleLogin(event) {
		event.preventDefault();
	
		axios.post(`/api/auth/login`, {
				UserName: this.state.username,
				PasswordHash: this.state.password
			})
			.then(res => {
				const token = res.data;
				localStorage.setItem('token', token)
			})
			.catch(error => {
				localStorage.removeItem('token')
			})
	}

	render() {
		return (
			<div className="form-container" >
				<form>
					<input type="text" placeholder="Identifiant" name="username" value={this.state.username} onChange={(e) => this.handleChange(e)} />
					<input type="password" placeholder="Mot de passe" name="password" value={this.state.password} onChange={(e) => this.handleChange(e)} />
					<button className="" onClick={(e) => this.handleLogin(e)}>Connection</button>
				</form>
			</div>
		);
	}
}