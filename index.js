require('dotenv').config();
const yargs = require('yargs/yargs');
const http = require('http');

const argv = yargs(process.argv).argv;
const access_key = process.env.accessKey;
const city = argv._[2];

const url = `http://api.weatherstack.com/current?access_key=${access_key}&query=${city}`;
  
http.get(url, (res) => {
  const { statusCode } = res;
  if ( statusCode !== 200 ) {
    console.log('Status Code = ', statusCode);
    return;
  }
  res.setEncoding('utf8');
  let rowData = '';
  res.on('data',(chunk) => rowData += chunk);
  res.on('end', () => {
    let parseData = JSON.parse(rowData);
    console.log(parseData);
  });
}).on('error', (err) => {
  console.error(err);
})
