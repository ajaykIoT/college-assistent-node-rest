var Conversation = require('watson-developer-cloud/conversation/v1'); // watson sdk
var extend = require('util')._extend;
var vcapServices = require('vcap_services');
var Q = require('q');
var dbClient = require('.././cloudantDB');

var conversation = new Conversation({
    // If unspecified here, the CONVERSATION_USERNAME and CONVERSATION_PASSWORD env properties will be checked
    // After that, the SDK will fall back to the bluemix-provided VCAP_SERVICES environment property
    username: '0c957585-bd9d-4f14-9376-36b8e174a4a7',
    password: 'Cla2QlwaJOII',
    url: 'https://gateway.watsonplatform.net/conversation/api',
    version_date: Conversation.VERSION_DATE_2017_04_21
});

var wcsService = {
    postMessage: function (inputData) {
        var deferred = Q.defer();
        var workspace = process.env.WORKSPACE_ID || '<workspace-id>';
        if (!workspace || workspace === '<workspace-id>') {
            deferred.reject({
                'output': {
                    'text': 'The app has not been configured with a <b>WORKSPACE_ID</b> environment variable.'
                }
            });
        }
        var payload = {
            workspace_id: workspace,
            context: inputData.context || {},
            input: { "text": inputData.inputMessage } || {}
        };


        // Send the input to the conversation service
        conversation.message(payload, function (err, data) {
            if (!err) {
                deferred.resolve(data);
                //console.log("data by Me", data);
            } else {
                deferred.reject(err);
                //console.log("Error By me", err);
            }
        });
        return deferred.promise;
    },

    updateEntity: function (inputData) {
        var deferred = Q.defer();
        var workspace = process.env.WORKSPACE_ID || '<workspace-id>';
        if (!workspace || workspace === '<workspace-id>') {
            deferred.reject({
                'output': {
                    'text': 'The app has not been configured with a <b>WORKSPACE_ID</b> environment variable.'
                }
            });
        }

        params = {
            workspace_id: workspace,
            entity: inputData.entityName,
            old_entity: inputData.entityName,
            description: "Courses provided",
            metadata: {
                "InsertionMode": "Dynamic"
            },
            values: inputData.values
        }

        conversation.updateEntity(params, function (err, data) {

            if (!err) {
                console.log("Entity updation successful in conversation service", data, err);
                deferred.resolve(data);
            } else {
                console.log("Errro in updation of conversation entity.", err);
                deferred.reject(err);
            }
        });

        return deferred.promise;
    },

    updateEntityFromCloudant(dbname, entityName, EntityFieldMap) {
        var deferred = Q.defer();
        var selector = {
            "selector": {
                "_id": {
                    "$gt": 0
                }
            },
            "fields": [
                dbname + "." + EntityFieldMap.Name,
                dbname + "." + EntityFieldMap.synonyms
            ],
            "sort": [
                {
                    "_id": "asc"
                }
            ]
        }

        dbClient.retrieveDocsBySelector(dbname, selector).then(function (response) {
            console.log("Database Called with dbname and selector", dbname, selector);
            if (response) {
                console.log("Got Response from database", response);
                entityValues = [];

                for (var i = 0; i < response.docs.length; i++) {
                    var value = {
                        "value": response.docs[i][dbname][EntityFieldMap.Name],
                        "metadata": {},
                        "synonyms": (response.docs[i][dbname][EntityFieldMap.synonyms]).split(',')
                    }

                    entityValues.push(value);
                }
                console.log("Entity Values created from Datbase", entityValues);

                var workspace = process.env.WORKSPACE_ID || '<workspace-id>';
                if (!workspace || workspace === '<workspace-id>') {
                    deferred.reject({
                        'output': {
                            'text': 'The app has not been configured with a <b>WORKSPACE_ID</b> environment variable.'
                        }
                    });
                }

                params = {
                    workspace_id: workspace,
                    entity: entityName,
                    old_entity: entityName,
                    description: dbname + "Details",
                    metadata: {
                        "InsertionMode": "Dynamic"
                    },
                    values: entityValues
                }

                console.log("Conversation params created for updation", params);
                conversation.updateEntity(params, function (err, data) {

                    if (!err) {
                        console.log("Entity updation successful in conversation service", data, err);
                        deferred.resolve(data);
                    } else {
                        console.log("Errro in updation of conversation entity.", err);
                        deferred.reject(err);
                    }
                });
            }
        })

        return deferred.promise;
    },

    getEntityValues: function (entityName) {
        ///v1/workspaces/{workspace_id}/entities/{entity}/values
        //requiredParams: ['workspace_id', 'entity'],

        var payload = {
            workspace_id: workspace,
            entity: entityName,
            context: inputData.context || {},
            input: { "text": inputData.inputMessage } || {}
        };

        conversation.getValues("", function (err, data) {

        });
    },

    createEntityValues: function (entityName) {
        ///v1/workspaces/{workspace_id}/entities/{entity}/values
        //requiredParams: ['workspace_id', 'entity', 'value'],
        conversation.createValue("", function (err, data) {

        })
    }

}

module.exports = wcsService;