const conversationModels = require('../models/conversation');
const helper = require('./helpers/utility');

var conversation = {
    postQuery: function (req, res) {
        conversationModels.postQuery(req, res, function (err, result) {
            helper.sendResponse(res, err, result);
        });
    },

    updateEntity: function (req, res) {
        conversationModels.updateEntity(req, res, function (err, result) {
            helper.sendResponse(res, err, result);
        });
    },

    updateEntityFromCloudant: function (req, res) {
        conversationModels.updateEntityFromCloudant(req, res, function (err, result) {
            helper.sendResponse(res, err, result);
        });
    }
};

module.exports = conversation;