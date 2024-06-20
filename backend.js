const http = require("http");
const fs = require("fs");
var requests = require("requests");
// const { get } = require("./index");
const readline = require('readline');


const homeFile = fs.readFileSync("home.html", "utf-8");



const replaceVal = (tempVal, orgVal) => {
    let temperature = tempVal.replace("{%tempval%}", Math.floor(orgVal.main.temp - 273));
    temperature = temperature.replace("{%tempmin%}", Math.floor(orgVal.main.temp_min - 273));
    temperature = temperature.replace("{%tempmax%}", Math.ceil(orgVal.main.temp_max - 273));
    temperature = temperature.replace("{%location%}", orgVal.name);
    temperature = temperature.replace("{%country%}", orgVal.sys.country);
    temperature = temperature.replace("{%tempstatus%}", orgVal.weather[0].main);


    return temperature;
};


const server = http.createServer((req, res) => {
    if (req.url == "/") {
        requests(
                `https://api.openweathermap.org/data/2.5/weather?q=mumbai&appid=4b7db4c18f5840867110097f715c3b8d`)
            .on("data", (chunk) => {
                const objdata = JSON.parse(chunk);
                const arrData = [objdata];
                // console.log(arrData[0].main.temp);
                const realTimeData = arrData
                    .map((val) => replaceVal(homeFile, val))
                    .join("");
                res.write(realTimeData);
                // console.log(realTimeData);
            })
            .on("end", (err) => {
                if (err) return console.log("connection closed due to errors", err);
                res.end();
            });
    } else {
        res.end("File not found");
    }
});

server.listen(8000, "127.0.0.1");