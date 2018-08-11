// server parameters
const serverSettings = {
	port: 3000
}

// user management service parameters
const userManagementOptions = {
	host: "10.108.79.48",
	//host: "http://user-management"
	port: 3001
}

module.exports = Object.assign({}, { serverSettings, userManagementOptions })