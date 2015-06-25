var config = require("../config");
var MongoClient = require("mongodb").MongoClient;
var mongodb = null;
exports.db = mongodb;

exports.addMongoCollections = function (db, req, res, next) {
    // If the db object is already filled in, no need to wait
    // Add the db and the collections on the request
    req.db = db;
    for (col in config.db.collections) {
        req[col] = db.collection(config.db.collections[col]); 
    }
    next();
}

exports.connectAndAddCollections =  function (req, res, next) {
    if (mongodb) { 
        //console.log("Connection established. Adding collections to request.");
        return exports.addMongoCollections(mongodb, req, res, next);
    } else {
        console.log("Establishing connection to Mongo...");
        MongoClient.connect(config.db.url, function (err, db) {
            console.log("... connected: " + db);
            
            if (err) throw err;
            
            mongodb = db;
            return exports.addMongoCollections(mongodb, req, res ,next);
        });
    }
}
