//var jwt = require('jwt-simple');
const utility = require('../controllers/helpers/utility');
var validateUser = require('../controllers/custom-auth').validateUser;
 
module.exports = function(req, res, next) {
 

  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['access_token'] || req.headers['x-access-token'];
  var key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];
  if(!token){
	res.status(401);
    res.json({
      "status": 401,
      "message": "Header access_token not found"
    });
    return;
  }
  if (token || key) {
    try {
	  var decoded = utility.decodeToken(token); // jwt.decode(token, process.env.TOKEN_SECRET);
	  if (decoded.exp <= Date.now()) {
        res.status(400);
        res.json({
          "status": 400,
          "message": "Token Expired"
        });
        return;
      }
	
      // Authorize the user to see if s/he can access our resources
		
      var dbUser = validateUser(token); // The key would be the logged in user's username
      if (dbUser) {
  
        if ((req.url.indexOf('admin') >= 0 && dbUser.role == 'admin') || (req.url.indexOf('admin') < 0 && req.url.indexOf('/api/v1/') >= 0)) {
			// set logged in user's name
			req.userid = decoded.userid;			
			req.username = decoded.username;
			next(); // To move to next middleware
        } else {
          res.status(403);
          res.json({
            "status": 403,
            "message": "Not Authorized"
          });
          return;
        }
      } else {
        // No user with this name exists, respond back with a 401
        res.status(401);
        res.json({
          "status": 401,
          "message": "Invalid User"
        });
        return;
      }
		
    } catch (err) {
		//console.log("error ", err);
        res.status(401);
		res.json({
		  "status": 401,
		  "message": "Invalid Token or Key"
		});
		return;
    }
  } else {
    res.status(401);
    res.json({
      "status": 401,
      "message": "Invalid Token or Key"
    });
    return;
  }
};