"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const Configs_1 = require("../configs/Configs");
const index_1 = require("./models/index");
index_1.sequelize.sync()
    .then(() => {
    const port = Configs_1.configs.getServerConfig().port;
    server_1.default.start(port);
})
    .catch((error) => {
    console.log("Something bad happened!\n" + error);
});
