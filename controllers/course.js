const courseModels = require('../models/course');
const helper = require('./helpers/utility');

var course = {
   getAll: function(req, res) {
    courseModels.getAll(req, res, function(err, result) {
		helper.sendResponse(res, err, result); 
	});
  },
  add: function(req, res) {
    courseModels.addCourse(req, res, function(err, result) {
		helper.sendResponse(res, err, result); 
	});
  }  
};
 
module.exports = course;