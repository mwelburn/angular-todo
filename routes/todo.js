
/*
 * GET users listing.
 */

exports.list = function(TodoModel){
  return function(req, res){
    return TodoModel.find(function(err, todos){
      if (!err) {
        return res.send(todos);
      } else {
        return console.log(err);
      }
    });
  };
};

exports.get = function(TodoModel){
  return function(req, res){
    return TodoModel.findById(req.params.id, function(err, todo){
      if (!err) {
        return res.send(todo);
      } else {
        return console.log(err);
      }
    });
  };
}

exports.create = function(TodoModel){
  return function(req, res){
    var todo = new TodoModel({
      Name: req.body.Name,
      Status: req.body.Status
    });
    todo.save(function(err){
      if (!err){
        return console.log('created');
      } else {
        return console.log(err);
      }
    });
    return res.send(todo);
  };
};


exports.update = function(TodoModel){
  return function(req, res){
    return TodoModel.findById(req.params.id, function(err, todo){
      todo.Name = req.body.Name;
      todo.Status = req.body.Status;
      return todo.save(function(err){
        if (!err){
          console.log("updated");
        } else {
          console.log(err);
        }
        return res.send(todo);
      })
    });
  };
};

exports.delete = function(TodoModel){
  return function(req, res){
    return TodoModel.findById(req.params.id, function(err, todo){
      return todo.delete(function(err){
        if (!err){
          console.log("deleted");
        } else {
          console.log(err);
        }
        return res.send('');
      })
    });
  };
};