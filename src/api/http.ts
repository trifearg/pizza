import axios from "axios";

var pjson = require('../../package.json');
const URL = `https://wa-onboard-backend-0-default-rtdb.europe-west1.firebasedatabase.app/${pjson.name}`;

const agentInstance = axios.create({
    baseURL: URL,
    timeout: 40000,
});

export const http = agentInstance;
