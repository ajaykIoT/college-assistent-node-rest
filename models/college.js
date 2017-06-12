
var college = {
 
	add: function(req, res, next){
		var allcollege = data; // Spoof a DB call
		next(null, "{ added colege to db }");
	},
	getAll: function(req, res, next) {
		var allcollege = data; // Spoof a DB call
		next(null, allcollege);
	}
};
 
var data = [
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
];

module.exports = college;