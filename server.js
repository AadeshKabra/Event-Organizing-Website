const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')


const User = require('./model/user')
const event = require('./model/event')
const Organizer = require('./model/organizer')
const Applied = require('./model/applied')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { events } = require('./model/user')
const response = require('./model/response')


const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'

mongoose.connect('mongodb://localhost:27017/loginapp', {
	useNewUrlParser: true,
	useUnifiedTopology: true,

})

const app = express()
var http = require('http').Server(app);
var io = require('socket.io')(http);
io.on('connection', function(socket){
	console.log('A user connected');
	socket.on('disconnect', function(){
		console.log('A user disconnected');
	});
	socket.on('chat message', function(author, message){
		io.emit('chat message', author, message);
	});
});

app.use('/', express.static(path.join(__dirname, 'static')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: true
}));
app.set('view engine', 'ejs');

app.post('/api/change-password', async (req, res) => {
	const { token, newpassword: plainTextPassword } = req.body

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	if (plainTextPassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 6 characters'
		})
	}

	try {
		const user = jwt.verify(token, JWT_SECRET)

		const _id = user.id

		const password = await bcrypt.hash(plainTextPassword, 10)

		await User.updateOne(
			{ _id },
			{
				$set: { password }
			}
		)
		res.json({ status: 'ok' })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: ';))' })
	}
})



app.post('/api/login', async (req, res) => {
	const { username, password } = req.body
	const user = await User.findOne({ username }).lean()

	if (!user) {
		return res.json({ status: 'error', error: 'Invalid username/password' })
	}

	if (await bcrypt.compare(password, user.password)) {
		// the username, password combination is successful

		const token = jwt.sign(
			{
				id: user._id,
				username: user.username
			},
			JWT_SECRET
		)

		return res.json({ status: 'ok', data: token })

	}
	res.render('home.ejs');
	res.json({ status: 'error', error: 'Invalid username/password' })
})

let organizerUsername;

app.post('/api/ologin', async (req, res) => {
	const { username, password } = req.body
	organizerUsername = username;
	console.log(organizerUsername);
	const organizer = await Organizer.findOne({ username }).lean()

	if (!organizer) {
		return res.json({ status: 'error', error: 'Invalid username/password' })
	}

	if (await bcrypt.compare(password, organizer.password)) {
		// the username, password combination is successful

		const token = jwt.sign(
			{
				id: organizer._id,
				username: organizer.username
			},
			JWT_SECRET
		)

		return res.json({ status: 'ok', data: token })

	}
	res.render('home.ejs');
	res.json({ status: 'error', error: 'Invalid username/password' })
})


app.post('/api/register', async (req, res) => {
	const { username, password: plainTextPassword } = req.body

	if (!username || typeof username !== 'string') {
		return res.json({ status: 'error', error: 'Invalid username' })
	}

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	if (plainTextPassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 6 characters'
		})
	}

	const password = await bcrypt.hash(plainTextPassword, 10)

	try {
		const response = await User.create({
			username,
			password
		})
		console.log('User created successfully: ', response)
	} catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return res.json({ status: 'error', error: 'Username already in use' })
		}
		throw error
	}

	res.json({ status: 'ok' })
})


app.post('/api/oregister', async (req, res) => {
	const { username, password: plainTextPassword } = req.body

	if (!username || typeof username !== 'string') {
		return res.json({ status: 'error', error: 'Invalid username' })
	}

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	if (plainTextPassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 6 characters'
		})
	}

	const password = await bcrypt.hash(plainTextPassword, 10)

	try {
		const response = await Organizer.create({
			username,
			password
		})
		console.log('Organizer created successfully: ', response)
	} catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return res.json({ status: 'error', error: 'Username already in use' })
		}
		throw error
	}

	res.json({ status: 'ok' })
})

app.get('/register.html', function(req, res){
	res.sendFile(__dirname + '/register.html');
});

app.get('/index.html', function(req, res){
	res.sendFile(__dirname + '/index.html');
})

app.get('/login.html', function(req, res){
	res.sendFile(__dirname + '/login.html');
})

app.get('/ologin.html', function(req, res){
	res.sendFile(__dirname + '/ologin.html');
})

app.get('/', function(req, res){
	res.sendFile(__dirname + '/login.html');
});

app.get('/ohome.html', function(req, res){
	res.sendFile(__dirname + '/ohome.html');
});

app.get('/home.html', function(req, res){
	res.sendFile(__dirname + '/home.html');
});

app.get('/postEvent.html', function(req, res){
	res.sendFile(__dirname + '/postEvent.html');
})


app.post('/postEvent.html', async function(req, res){
	console.log(req.body)
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/loginapp";
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("loginapp");
		var myobj = { username: req.body.name, email: req.body.email, phone: req.body.phone, eventname: req.body.eventname, info: req.body.info };
		console.log(req.body.eventname);
		dbo.collection("events").insertOne(myobj, function(err, res) {
		  if (err) throw err;
		  console.log("1 event inserted");
		  db.close();
		});
		
	});

	res.sendFile(__dirname + "/home.html")

});

app.get("/trending.html", function(req, res){
	res.sendFile(__dirname + '/trending.html');
});

app.get("/checkEvents.html", function(req, res){
	// res.sendFile(__dirname + "/checkEvents.html");
	event.find({}, function(err, docs){
		if(err) res.json(err)
		else res.render("checkEvents", {data: docs});
	})
});

app.get("/appliedEvents.html", function(req, res){
	Applied.find({name: organizerUsername}, function(err, docs){
		if(err) res.json(err)
		else res.render("appliedEvents", {data: docs})
	})
})

app.get("/myevents.html", function(req, res){
	Applied.find({}, function(err, docs){
		if(err) res.json(err)
		else res.render("myevents", {data: docs})
	})
})

app.get("/inter.html", function(req, res){
	res.sendFile(__dirname + "/inter.html")
})

let eventN;
app.post("/inter.html", function(req, res){
	eventN = req.body.eventName;
	console.log(eventN);
	Applied.find({eventname: eventN}, function(err, docs){
		if(err) res.json(err)
		else res.render("myEvents", {data: docs})
	})
})

app.get("/appliedEvents.html", function(req, res){
	res.sendFile(__dirname + "/appliedEvents.html");
});

app.get("/oevent.html", function(req, res){
	res.render("oevent");
});

app.get("/ohome.html", function(req, res){
	res.render("ohome");
});



app.post("/postoEvent.html", function(req, res){
	console.log(req.body);
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/loginapp";
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("loginapp");
		var myobj = { name: req.body.name, eventname: req.body.eventname, response: req.body.response, price: req.body.price, email: req.body.email};
		console.log(req.body.eventname);
		dbo.collection("response").insertOne(myobj, function(err, res) {
		  if (err) throw err;
		  console.log("1 response inserted");
		  db.close();
		});
		
	});

	res.render("ohome.ejs");
});

app.get('/pune.html', function(req, res){
	res.sendFile(__dirname + '/pune.html');
});
app.get('/delhi.html', function(req, res){
	res.sendFile(__dirname + '/delhi.html');
});
app.get('/mumbai.html', function(req, res){
	res.sendFile(__dirname + '/mumbai.html');
});
app.get('/bangalore.html', function(req, res){
	res.sendFile(__dirname + '/bangalore.html');
})

// app.get('/token', (req, res) => {
//     const { username } = req.query

//     if (username) {
//         const token = serverClient.createToken(username)
//         res.status(200).json({ token, status: "sucess" })
//     } else {
//         res.status(401).json({ message: "invalid request", status: "error" })
//     }
// });

// app.post('/updateUser', async (req, res) => {
//     const { userID } = req.body

//     if (userID) {
//         const updateResponse = await serverClient.updateUsers([{ 
//             id: userID, 
//             role: 'admin'
//          }]);
    
//         res.status(200).json({ user: updateResponse, status: "sucess" })
//     } else {
//         res.status(401).json({ message: "invalid request", status: "error" })
//     }
// });

// app.get('/chat.html', (req, res) => {
//     window.open("https://mail.google.com/mail/u/0/#inbox", "Mail", "width=500 height=300");
// });


app.listen(9999, () => {
	console.log('Server up at 9999')
});


// XwwZiarbRWJQIOmOADG-YHwtmlGHJq1Uo-PGdu5F