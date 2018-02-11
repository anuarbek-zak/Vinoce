var compression = require('compression');
var express = require('express');
var path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var app = express();

// Middlewares

//Compress our responses
app.use(compression());

app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('port', process.env.PORT || 8000);

app.use(express.static(path.join(__dirname, 'public'), { maxAge: 3600000 }));


app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.send(500, { message: err.message });
});

//mail
app.post('/endpoint',function (req,res) {
	var transport = nodemailer.createTransport(smtpTransport({
		service: 'gmail',
		auth: {
			user: 'slimwatchkz@gmail.com',
			pass: 'slimwatchkzsdu'
		}
	}));

	var mailOptions = {
		from: 'slimwatchkz@gmail.com', // sender address
		// to: 'almakhan1maksat@gmail.com', // list of receivers
		to: 'anuarbekzakirianov97@gmail.com',
		subject: 'Часы', // Subject line
		text: "Пришел заказ на часы "+req.body.currentWatch+" от " + req.body.name + ". Номер " + req.body.phone
	};

	transport.sendMail(mailOptions, function (error) {
		if (error) {
			console.log('Error occured');
			console.log(error.message);
			return err;
		}
		res.send({"success": "success"});
	});
});

// Start server
var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
