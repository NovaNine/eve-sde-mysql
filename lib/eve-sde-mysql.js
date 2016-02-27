var mySQL = require('promise-mysql');
var util = require('util');
var Promise = require('bluebird');

Promise.longStackTraces();

function SDE() {
	this.data = {
		types: null,
		systems: null,
		regions: null,
		stations: null
	};
}

SDE.prototype.connect = function(dbInfo) {
	return mySQL.createConnection(dbInfo);
}

SDE.prototype.getType = function(id) {
	Promise.coroutine(function* a(id) {
		yeld this.loadTypes();
	});
});

SDE.prototype.loadTypes = function(force) {
	if (this.data.types === null || force) {
		this.data.types = null;
		return mySQL.query("SELECT * FROM invtypes").then(function(results) {
			this.data.types = [];
			results.forEach(function(row, idx, arr) {
				this.sdeData.types[row.typeID] = row;
			});

			console.log("Loaded " + results.length + " types from the SDE");

		}).catch(function(err) {
			console.log("Failed to load SDE types", err);
			reject(err);
			throw err;
		});
	} else {
		return Promise.resolve();
	}
}

module.exports = SDE;