var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

require('dotenv').config();

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


/**
* BOT STUFF
 */

// Ready event (Bot has logged in)
client.once('ready', () => {
  console.log(Intents.FLAGS.GUILDS);
	console.log(`🤖 ${client.user.tag} is Ready 🤖`);
});

client.on('info', (info) => {
  console.log('debug info:', info);
})

client.on('messageCreate', (message) => {
  // console.log(message);
  console.log('message object str:', JSON.stringify(message));
  
  if (message.content.toLowerCase().includes('ding')) {
    return message.reply('Dong!');
  }

  if (message.channel.id === '878321046091087922' && (message.author.tag === 'Tyler Cole#8656')) {
    return message.reply('I only trade with Tyler if he butters me up first :butter: :wink:');
  }
})

// Login to Discord with your client's token
client.login(process.env.PRAXTON_BOT_TOKEN);

module.exports = app;
