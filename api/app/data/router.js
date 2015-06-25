var router = require("express").Router();
var bodyParser = require("body-parser");

var zippedParser = bodyParser.json({ inflate: true});

// NOTE: this requires that the db middleware has been run
function insertRawData(req, res) {
    console.log("Inserting raw data: " + req.body);
    if (!("device_id" in req.params)) {
        res.status(400).send();
        return;
    }
    var data = req.body;
    
    for (var i = 0, len = data.length; i < len; i++) {
        data[i].device_id = req.params.device_id;
    }
    
    req.rawDataCollection.insert(data, function (err, doc) {
        if (err) {
            console.log("Error inserting raw data: " + err);
            res.status(500).send();
            return;
        }
        
        // I believe we can send the response immediately and the thread will continue writing...
        // This means we can send a 202 immediately, rather than waiting on the write to finish.
        //res.status(201).send();
    });
    
    res.status(202).send();
}

function getRawData(req, res) {
    if (!("device_id" in req.params)) {
        res.status(400).send();
        return;
    }
    
    req.rawDataCollection.find(
        { device_id: req.params.device_id }, 
        { fields: { _id: 0} }).toArray(
            function (err, docs) {
                if (err) {
                    console.log("Error getting raw data: " + err);
                    res.status(500).send();
                    return;
                }
                console.log(docs);
                res.send(docs);
                return;
            });
}

router.post("/data/:device_id", zippedParser, insertRawData);
router.get("/data/:device_id", getRawData);

module.exports = router;