
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.json([
    {
      'Name' : 'Take out the trash',
      'Status' : true
    },
    {
      'Name' : 'Make dinner',
      'Status' : false
    }
  ]);
};