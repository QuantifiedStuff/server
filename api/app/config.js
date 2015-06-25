var config = module.exports;
var PRODUCTION = process.env.NODE_ENV === "production";

config.express = {
    port: process.env.API_PORT || 8002,
    ip: "127.0.0.1"
};

config.db = {
    "url": process.env.MONGODB_URL || "mongodb://db/main",
    "collections": {
        "rawDataCollection": "rawData"
    }
}