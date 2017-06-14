

var dbClient = require('.././cloudantDB');

var college = {

  addCollege:function(req, res, next)
  {
		var name = req.body.name;
		var type = req.body.type;
		var city = req.body.city;
		var state = req.body.state;
	  
		var collegedata = {college:{
			  college_name: name,
			  college_type: type,
			  city: city,
			  state: state
			}
		}
	  
      	dbClient.insertData('college',collegedata).then(function (response) {
			if(response)
			{	
				console.log("record inserted to college");
				next(null, response);
			}
		})
  
  },
	getAll: function(req, res, next) {
		dbClient.retrieveData('college').then(function (response) {
		if(response)
		{	
			console.log("record retrieved");
			next(null, response);
		}
		})
	}
};

 
var data = 
{college:
{
  name: 'indira college',
  type: 'technical',
  city: 'pune',
  state: 'MH'
}
};


module.exports = college;