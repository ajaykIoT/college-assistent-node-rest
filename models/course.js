

var dbClient = require('.././cloudantDB');

var course = {
    addCourse: function (req, res, next) {

        var coursedata = {
            course: {
                Id: req.body.Id,
                Name: req.body.Name,
                FullName: req.body.FullName,
                Synonyms: req.body.Synonyms
            }
        }

        dbClient.insertData('course', coursedata).then(function (response) {
            if (response) {
                console.log("record inserted to course");
                next(null, response);
            }
        })

    },

    getAll: function (req, res, next) {

        var selector = {
            "selector": {
                "_id": {
                    "$gt": 0
                }
            },
            "fields": [
                "course.Name",
                "course.FullName",
                "course.Synonyms"
            ],
            "sort": [
                {
                    "_id": "asc"
                }
            ]
        }
        dbClient.retrieveDocsBySelector('course', selector).then(function (response) {
            if (response) {
                console.log("record retrieved");
                next(null, response);
            }
        })
    }
};

module.exports = course;