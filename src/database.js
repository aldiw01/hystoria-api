var mailService = require('./mailService.js');
const Client = require('mariasql');
const c = new Client({
	host: process.env.APP_DATABASE_HOST,
	user: process.env.APP_DATABASE_USER,
	password: process.env.APP_DATABASE_PASSWORD,
	db: process.env.APP_DATABASE_DB
});

module.exports = {

	getUserAll: function (req, res) {
		c.query('SELECT * FROM `users` ORDER BY `id`', null, { metadata: true, useArray: true }, function (err, rows) {
			if (err) {
				res.status(500).send({ message: "Error 500: Internal Server Error" });
				console.log(err);
				return
			}

			var data = [];
			rows.forEach(function (items) {
				data.push({
					id: items[0],
					first_name: items[1],
					last_name: items[2],
					username: items[3],
					created: items[4]
				});
			});
			if (data.length < 1) {
				res.status(404).send('Data not found.');
			} else {
				res.json(data);
			}
		});
		c.end();
	},
	getUser: function (req, res) {
		c.query("SELECT * FROM `users` WHERE id=?", [req.id], { metadata: true, useArray: true }, function (err, rows) {
			if (err) {
				res.status(500).send({ message: "Error 500: Internal Server Error" });
				console.log(err);
				return
			}

			var data = [];
			rows.forEach(function (items) {
				data.push({
					id: items[0],
					first_name: items[1],
					last_name: items[2],
					username: items[3],
					created: items[4]
				});
			});
			if (data.length < 1) {
				res.status(404).send('Data not found.');
			} else {
				res.json(data);
			}
		});
		c.end();
	},
	newUser: function (req, res) {
		const waktu = new Date().toISOString();
		var request = [req.id, req.first_name, req.last_name, req.username, waktu];
		if (request.includes(undefined) || request.includes("")) {
			res.send({ message: 'Bad Request: Parameters cannot empty.' });
			return
		}
		c.query("INSERT INTO `users` (`id`, `first_name`, `last_name`, `username`, `created`) VALUES (?, ?, ?, ?, ?)", request, { metadata: true, useArray: true }, function (err, rows) {
			if (err) {
				res.status(500).send({ message: "Error 500: Internal Server Error" });
				console.log(err);
				return
			}

			res.json({
				affectedRows: rows.info.affectedRows,
				err: null,
				message: "User has recorded successfully",
				success: true
			});
		});
		c.end();
	},
	deleteUser: function (req, res) {
		var request = [req.id]
		if (request.includes(undefined) || request.includes("")) {
			res.send({ message: 'Bad Request: Parameters cannot empty.' });
			return
		}
		c.query("DELETE FROM `users` WHERE id=?", [req.id], { metadata: true, useArray: true }, function (err, rows) {
			if (err) {
				res.status(500).send({ message: "Error 500: Internal Server Error" });
				console.log(err);
				return
			}

			res.json({
				affectedRows: rows.info.affectedRows,
				err: null,
				message: "User has deleted successfully",
				success: true
			});
		});
		c.end();
	},
	deleteUserAll: function (req, res) {
		c.query("DELETE FROM `users`", null, { metadata: true, useArray: true }, function (err, rows) {
			if (err) {
				res.status(500).send({ message: "Error 500: Internal Server Error" });
				console.log(err);
				return
			}

			res.json({
				affectedRows: rows.info.affectedRows,
				err: null,
				message: "All User has deleted successfully :[",
				success: true
			});
		});
		c.end();
	},
	getEarningAll: function (req, res) {
		c.query('SELECT * FROM `users` ORDER BY `id`', null, { metadata: true, useArray: true }, function (err, rows) {
			if (err) {
				res.status(500).send({ message: "Error 500: Internal Server Error" });
				console.log(err);
				return
			}

			var data = [];
			rows.forEach(function (items) {
				data.push({
					id: items[0],
					first_name: items[1],
					last_name: items[2],
					username: items[3],
					created: items[4]
				});
			});
			if (data.length < 1) {
				res.status(404).send('Data not found.');
			} else {
				res.json(data);
			}
		});
		c.end();
	},
	getEarning: function (req, res) {
		c.query("SELECT * FROM `users` WHERE id=?", [req.id], { metadata: true, useArray: true }, function (err, rows) {
			if (err) {
				res.status(500).send({ message: "Error 500: Internal Server Error" });
				console.log(err);
				return
			}

			var data = [];
			rows.forEach(function (items) {
				data.push({
					id: items[0],
					first_name: items[1],
					last_name: items[2],
					username: items[3],
					created: items[4]
				});
			});
			if (data.length < 1) {
				res.status(404).send('Data not found.');
			} else {
				res.json(data);
			}
		});
		c.end();
	},
	newEarning: function (req, res) {
		const waktu = new Date().toISOString();
		var request = [req.id, req.first_name, req.last_name, req.username, waktu];
		if (request.includes(undefined) || request.includes("")) {
			res.send({ message: 'Bad Request: Parameters cannot empty.' });
			return
		}
		c.query("INSERT INTO `users` (`id`, `first_name`, `last_name`, `username`, `created`) VALUES (?, ?, ?, ?, ?)", request, { metadata: true, useArray: true }, function (err, rows) {
			if (err) {
				res.status(500).send({ message: "Error 500: Internal Server Error" });
				console.log(err);
				return
			}

			res.json({
				affectedRows: rows.info.affectedRows,
				err: null,
				message: "Earning has recorded successfully",
				success: true
			});
		});
		c.end();
	},
	deleteEarning: function (req, res) {
		var request = [req.id]
		if (request.includes(undefined) || request.includes("")) {
			res.send({ message: 'Bad Request: Parameters cannot empty.' });
			return
		}
		c.query("DELETE FROM `users` WHERE id=?", [req.id], { metadata: true, useArray: true }, function (err, rows) {
			if (err) {
				res.status(500).send({ message: "Error 500: Internal Server Error" });
				console.log(err);
				return
			}

			res.json({
				affectedRows: rows.info.affectedRows,
				err: null,
				message: "Earning has deleted successfully",
				success: true
			});
		});
		c.end();
	},
	deleteEarningAll: function (req, res) {
		c.query("DELETE FROM `users`", null, { metadata: true, useArray: true }, function (err, rows) {
			if (err) {
				res.status(500).send({ message: "Error 500: Internal Server Error" });
				console.log(err);
				return
			}

			res.json({
				affectedRows: rows.info.affectedRows,
				err: null,
				message: "All Earning has deleted successfully :[",
				success: true
			});
		});
		c.end();
	},
	getExpenditureAll: function (req, res) {
		c.query('SELECT * FROM `users` ORDER BY `id`', null, { metadata: true, useArray: true }, function (err, rows) {
			if (err) {
				res.status(500).send({ message: "Error 500: Internal Server Error" });
				console.log(err);
				return
			}

			var data = [];
			rows.forEach(function (items) {
				data.push({
					id: items[0],
					first_name: items[1],
					last_name: items[2],
					username: items[3],
					created: items[4]
				});
			});
			if (data.length < 1) {
				res.status(404).send('Data not found.');
			} else {
				res.json(data);
			}
		});
		c.end();
	},
	getExpenditure: function (req, res) {
		c.query("SELECT * FROM `users` WHERE id=?", [req.id], { metadata: true, useArray: true }, function (err, rows) {
			if (err) {
				res.status(500).send({ message: "Error 500: Internal Server Error" });
				console.log(err);
				return
			}

			var data = [];
			rows.forEach(function (items) {
				data.push({
					id: items[0],
					first_name: items[1],
					last_name: items[2],
					username: items[3],
					created: items[4]
				});
			});
			if (data.length < 1) {
				res.status(404).send('Data not found.');
			} else {
				res.json(data);
			}
		});
		c.end();
	},
	newExpenditure: function (req, res) {
		const waktu = new Date().toISOString();
		var request = [req.id, req.first_name, req.last_name, req.username, waktu];
		if (request.includes(undefined) || request.includes("")) {
			res.send({ message: 'Bad Request: Parameters cannot empty.' });
			return
		}
		c.query("INSERT INTO `users` (`id`, `first_name`, `last_name`, `username`, `created`) VALUES (?, ?, ?, ?, ?)", request, { metadata: true, useArray: true }, function (err, rows) {
			if (err) {
				res.status(500).send({ message: "Error 500: Internal Server Error" });
				console.log(err);
				return
			}

			res.json({
				affectedRows: rows.info.affectedRows,
				err: null,
				message: "Expenditure has recorded successfully",
				success: true
			});
		});
		c.end();
	},
	deleteExpenditure: function (req, res) {
		var request = [req.id]
		if (request.includes(undefined) || request.includes("")) {
			res.send({ message: 'Bad Request: Parameters cannot empty.' });
			return
		}
		c.query("DELETE FROM `users` WHERE id=?", [req.id], { metadata: true, useArray: true }, function (err, rows) {
			if (err) {
				res.status(500).send({ message: "Error 500: Internal Server Error" });
				console.log(err);
				return
			}

			res.json({
				affectedRows: rows.info.affectedRows,
				err: null,
				message: "Expenditure has deleted successfully",
				success: true
			});
		});
		c.end();
	},
	deleteExpenditureAll: function (req, res) {
		c.query("DELETE FROM `users`", null, { metadata: true, useArray: true }, function (err, rows) {
			if (err) {
				res.status(500).send({ message: "Error 500: Internal Server Error" });
				console.log(err);
				return
			}

			res.json({
				affectedRows: rows.info.affectedRows,
				err: null,
				message: "All Expenditure has deleted successfully :[",
				success: true
			});
		});
		c.end();
	}
}
