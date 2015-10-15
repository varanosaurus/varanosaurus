var router = require('express').Router();

var pathHandlers = {};

pathHandlers[''] = {
	get: function(request, response, next) {
		//serve static files
	}
};

pathHandlers['/users'] = {
	post: function(request, response, next) {
		//add new user
	}
};

pathHandlers['/users/:username'] = {
	get: function(request, response, next) {
		//get user info
	},

	put: function(request, response, next) {
		//update user info
	},

	delete: function(request, response, next) {
		//delete user
	}
};

pathHandlers['/households'] = {
	post: function(request, response, next) {
		//add new household
	}
};

pathHandlers['/households/:householdID'] = {
	get: function(request, response, next) {
		//get household info
	},

	put: function(request, response, next) {
		//update household info
	},

	delete: function(request, response, next) {
		//delete household
	}
};

pathHandlers['/listentries'] = {
	post: function(request, response, next) {
		//add new household
	}
};

pathHandlers['/listentries/:listentryID'] = {
	get: function(request, response, next) {
		//get list entry info
	},

	put: function(request, response, next) {
		//update list entry info
	},

	delete: function(request, response, next) {
		//delete list entry
	}
};

pathHandlers['/reconciliations'] = {
	post: function(request, response, next) {
		//add new reconciliation
	}
};

pathHandlers['/reconciliations/:reconciliationID'] = {
	get: function(request, response, next) {
		//get reconciliation info
	},

	put: function(request, response, next) {
		//update reconciliation info
	},

	delete: function(request, response, next) {
		//delete reconciliation
	}
};