require('dotenv/config')

const express = require('express');
const bodyParser = require('body-parser');
var db = require('./database.js');
var mailService = require('./mailService.js');

// Instantiating the express app
const app = express();
// See the react auth blog in which cors is required for access
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	next();
});// Setting up bodyParser to use json and set it to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/////////////////////////////////////////////////////////////////////////////////////////////
// User API

app.get('/api/user', (req, res) => {
	db.getUserAll(req.body, res);
})

app.get('/api/user/:id', (req, res) => {
	db.getUser(req.params, res);
})

app.post('/api/user', (req, res) => {
	db.newUser(req.body, res);
})

app.delete('/api/user/:id', (req, res) => {
	db.deleteUser(req.params, res);
})

app.delete('/api/user/all/ever', (req, res) => {
	db.deleteUserAll(req.params, res);
})

/////////////////////////////////////////////////////////////////////////////////////////////
// Earnings API

app.get('/api/earning', (req, res) => {
	db.getEarningAll(req.body, res);
})

app.get('/api/earning/:id', (req, res) => {
	db.getEarning(req.params, res);
})

app.post('/api/earning', (req, res) => {
	db.newEarning(req.body, res);
})

app.delete('/api/earning/:id', (req, res) => {
	db.deleteEarning(req.params, res);
})

app.delete('/api/earning/all/ever', (req, res) => {
	db.deleteEarningAll(req.params, res);
})

/////////////////////////////////////////////////////////////////////////////////////////////
// Expenditures API

app.get('/api/expenditure', (req, res) => {
	db.getExpenditureAll(req.body, res);
})

app.get('/api/expenditure/:id', (req, res) => {
	db.getExpenditure(req.params, res);
})

app.post('/api/expenditure', (req, res) => {
	db.newExpenditure(req.body, res);
})

app.delete('/api/expenditure/:id', (req, res) => {
	db.deleteExpenditure(req.params, res);
})

app.delete('/api/expenditure/all/ever', (req, res) => {
	db.deleteExpenditureAll(req.params, res);
})

// Error handling 
app.use(function (err, req, res, next) {
	if (err.name === 'UnauthorizedError') { // Send the error rather than to show it on the console
		res.status(401).send(err);
	}
	else {
		next(err);
	}
});

app.get('/', (req, res) => {
	res.redirect('https://t.me/hystoria_bot');
});

// Starting the app on PORT 3000
const PORT = process.env.PORT || 8900;
app.listen(PORT, () => {
	// eslint-disable-next-line
	console.log(`Magic happens on port ${PORT}`);
});
