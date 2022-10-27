const http = require("http");
const fs = require('fs');
const fileName = fs.readFileSync('../index.html', 'utf-8');

let requests = require('requests');

function replaceValue(mainFile, jsonData) {
    let temperature = mainFile.replace("{%tempValue%}", jsonData.main.temp);
    temperature = temperature.replace("{%tempMin%}", jsonData.main.temp_min);
    temperature = temperature.replace("{%tempMax%}", jsonData.main.temp_max);
    temperature = temperature.replace("{%location%}", jsonData.name);
    temperature = temperature.replace("{%tempStatus%}", jsonData.weather[0].main);
    temperature = temperature.replace("{%country%}", jsonData.sys.country);
    return temperature;
}
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        requests("https://api.openweathermap.org/data/2.5/weather?q=kathmandu&appid=aeb65a7bc3d146b888ebd4b1cd4e820c")
            .on('data', function(chunk) {
                const objdata = JSON.parse(chunk);
                const arrData = [objdata]

                const realTimeData = arrData.map((value) => replaceValue(fileName, value)).join('');
                res.write(realTimeData);
            })
            .on('end', function(err) {
                if (err) return console.log('connection closed due to errors', err);
                res.end();
                console.log('end');
            });
    }
});

server.listen(8000, 'localhost', () => {
    console.log("Server started");
})