import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {
			username: "",
            password: "",
            confPassword: "",
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

	async handleRegister(event) {
		event.preventDefault();

		axios.post(`/api/auth/register`, {
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
					<input type="password" placeholder="Confirmer mot de passe" name="confPassword" value={this.state.confPassword} onChange={(e) => this.handleChange(e)} />
					<button className="themed-btn" onClick={(e) => this.handleLogin(e)}>Register</button>
				</form>
			</div>
		);
	}
}