'use strict'
const status = require('http-status')

module.exports = (app, options) => {
	
	const {repo} = options
	
	// POST /authentication/login
	app.post('/authentication/login', (req, res, next) => {
		repo.login(req.body.email, req.body.password).then(researcher => {
			console.log("API:" + researcher)
			res.status(status.OK).json(researcher)
		}).catch(next)
	})
	
	// GET /authentication/logout
	app.get('/authentication/logout', (req, res, next) => {
		req.session.destroy(function (err) {
			if(err) {
				console.log(err);
			} 
		})
		res.status(status.OK).json("Logged out")
	})
	
	// POST /authentication/register/researcher
	app.post('/authentication/register/researcher', (req, res, next) => {
		let researcher = req.body
		repo.registerResearcher(researcher).then(result => {
			res.status(status.OK).json(result)
		}).catch(next)
	})
	
}