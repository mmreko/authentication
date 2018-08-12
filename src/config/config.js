// server parameters
const serverSettings = {
	port: 3000
}

// user management service parameters
const userManagementOptions = {
	//host: "10.101.86.242",
	host: "user-management",
	port: 3001
}

module.exports = Object.assign({}, { serverSettings, userManagementOptions })