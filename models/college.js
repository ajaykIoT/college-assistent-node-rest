

var dbClient = require('../cloudantDB');

var college = {

  create:function(req, res, next)
  {
      	dbClient.insertData('college',data).then(function (response) {
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
{college:[
{
  name: 'indira college',
  type: 'technical',
  city: 'pune',
  state: 'MH'
}, 
{
  name: 'LNCT',
  type: 'technical',
  city: 'bhopal',
  state: 'MP'
},
{
  name: 'MANIT',
  type: 'technical',
  city: 'bhopal',
  state: 'MP'
}
]};


module.exports = college;