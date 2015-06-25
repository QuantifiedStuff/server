var cluster = require("cluster");

// Mostly using cluster to keep server processes alive in case we missed handling some errors
// It doesn't really help much with performance...
if (cluster.isMaster) {
    var cpuCount = require("os").cpus().length;

    for (var i = 0; i < cpuCount; i++) {
        console.log("Starting worker " + i);
        cluster.fork();
    }

    cluster.on("exit", function (worker) {
        console.log("Worker " + worker.id + " died.");
        cluster.fork();
    });
} else {
    var app = require("./index");
    var config = require("./config");
    console.log("Listening on: " + config.express.ip + ":" + config.express.port);
    app.listen(config.express.port);
}