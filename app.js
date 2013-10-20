
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var todo = require('./routes/todo');
var http = require('http');
var path = require('path');

var mongoose = require('mongoose');
var uristring = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/AngularTodo';

mongoose.connect(uristring, function(err, res)
{
  if (err) 
  {
    console.log('ERROR connecting to: ' + uristring + '. ' + err);
  }
  else
  {
    console.log('Succeeded connecting to: ' + uristring);
  }
});

var todoSchema = new mongoose.Schema({
  Name: { type: String, trim: true },
  Status: {type: Boolean }
});

var TodoModel = mongoose.model('Todos', todoSchema);

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/todos', todo.list(TodoModel));
app.get('/todos/:id', todo.get(TodoModel));
app.del('/todos/:id', todo.delete(TodoModel));
app.put('/todos/:id', todo.update(TodoModel));
app.post('/todos', todo.create(TodoModel));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});