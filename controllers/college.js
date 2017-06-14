const collegeModels = require('../models/college');
const helper = require('./helpers/utility');

var college = {
   getAll: function(req, res) {
    collegeModels.getAll(req, res, function(err, result) {
		helper.sendResponse(res, err, result); 
	});
  },
  add: function(req, res) {
    collegeModels.addCollege(req, res, function(err, result) {
		helper.sendResponse(res, err, result); 
	});
  }  
};
 
module.exports = college;