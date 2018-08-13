'use strict'
const passwordHash = require('password-hash');
const http = require('http')
const userManagementOptions = require('../config/config').userManagementOptions

const repository = () => {
	
	// calls user management service to insert new researcher to db
	const registerResearcher = (researcher) => {
		return new Promise((resolve, reject) => {
			
			let result 
			let data = []
			
			const options = {
				host: userManagementOptions.host,
				port: userManagementOptions.port,
				path: "/users/researchers/insert",
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				}
			}
			
			const payload = {
				email: researcher.email,
				password: passwordHash.generate(researcher.password), // SHA-1
				name: researcher.name,
				group: researcher.group
			}
			
			const requestData = JSON.stringify(payload)
			
			const req = http.request(options, (res) => {
				res.setEncoding('utf8');
				res.on('data', (chunk) => {
					data.push(chunk)
				});
				res.on('end', () => {
					result = JSON.parse(data.join(''));
					resolve(result)
				});
			});

			req.on('error', (e) => {
				console.error(`Problem with request: ${e.message}`);
			});

			req.write(requestData);
			req.end();
		})
	}
	
	// calls user management service to check authentication data 
	const login = (email, password) => {
		return new Promise((resolve, reject) => {
			
			let result
			let researcher
			let data = []
			
			const options = {
				host: userManagementOptions.host,
				port: userManagementOptions.port,
				path: "/users/researchers/email",
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				}
			}
			
			const payload = {
				email: email
			}
			
			const requestData = JSON.stringify(payload)
			
			const req = http.request(options, (res) => {
				res.setEncoding('utf8');
				res.on('data', (chunk) => {
					data.push(chunk)
				});
				res.on('end', () => {
					researcher = JSON.parse(data.join(''));
					if (researcher == null) {
						resolve(null)
					}
					result = passwordHash.verify(password, researcher.password)
					if (!result) {
						console.log("Failed authentication")
						resolve(null)
					}
					console.log("Repo: " + researcher)
					resolve(researcher)
				});
			});

			req.on('error', (e) => {
				console.error(`Problem with request: ${e.message}`);
			});
			
			req.write(requestData);
			req.end();
		})
	}
	
	return Object.create({
		registerResearcher,
		login
	})
	
}

const connect = () => {
	return new Promise((resolve, reject) => {
		resolve(repository())
	})
}

module.exports = Object.assign({}, {connect})