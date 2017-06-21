

var wcsClient = require('.././wcsService');

var conversation = {
    postQuery: function (req, res, next) {

        var inpuData = {
            "inputMessage": req.body.inputMessage,
            "context": req.body.context
        }

        wcsClient.postMessage(inpuData).then(function (response) {
            if (response) {
                console.log("record inserted to course");
                next(null, response);
            }
        })
    },

    updateEntity: function (req, res, next) {
        var inpuData = {
            entityName: req.body.entityName,
            values: req.body.values
        }

        wcsClient.updateEntity(inpuData).then(function (response) {
            if (response) {
                console.log("Updation successful.");
                next(null, response);
            }
        })
    },

    updateEntityFromCloudant: function (req, res, next) {
        wcsClient.updateEntityFromCloudant(req.body.dbName, req.body.entityName, req.body.EntityFieldMap).then(function (response) {
            if (response) {
                console.log("Updation successful.");
                next(null, response);
            }
        })
    }
};

module.exports = conversation;