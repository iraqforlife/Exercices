import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",
			errorMessage: ""
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

	
	formValidated() {
		const {username, password} = this.state
		const usernameInvalid = username === "" || username === null || username === undefined;
		const passwordInvalid = password === "" || password === null || password === undefined;

		if(usernameInvalid || passwordInvalid) {
			this.setState({errorMessage: "No empty fields allowed."})
			return false
		}
		return true;
	}

	async handleLogin(event) {
		event.preventDefault();
		if(this.formValidated()){
			axios.post(`/api/auth/login`, {
				UserName: this.state.username,
				PasswordHash: this.state.password
			})
			.then(res => {
				const token = res.data;
				const status = res.status;
				if(status === 200) {
					localStorage.setItem('token', token);
					window.location.reload();
				}
			})
			.catch(error => {
				const status = error.response.status;
				if(status === 400) {
					this.setState({errorMessage: "Error occured with request request."});
				}
				else if(status === 401) {
					this.setState({errorMessage: "Unauthorized access occured."})
				}
				else if(status === 404) {
					this.setState({errorMessage: "Incorrect username or password."})
				}
				else {
					this.setState({errorMessage: ""})
				}
				localStorage.removeItem('token')
			})
		}
	}

	render() {
		return (
			<div className="form-container" >
				<form>
					<p className="form-error-message">{this.state.errorMessage}</p>
					<input type="text" placeholder="Identifiant" name="username" value={this.state.username} onChange={(e) => this.handleChange(e)} />
					<input type="password" placeholder="Mot de passe" name="password" value={this.state.password} onChange={(e) => this.handleChange(e)} />
					<button className="themed-btn" onClick={(e) => this.handleLogin(e)}>Connection</button>
				</form>
			</div>
		);
	}
}