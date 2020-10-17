# verint-swt
Javascript library to generate Service to Service (SWT) Tokens used with Verint's Web Services

## Node.js (Install)

- Node.js
- npm (Node.js package manager)

```bash
npm install @fossilz/verint-swt
```

#### Usage

```javascript
const verint = require( '@fossilz/verint-swt');
const http = require('http');

const httpMethod = "POST";
const webServiceUrl = "http://wfo-server/DASWebApi/Query/ExecuteDynamicQuery";

var token = verint.generateToken("VUXWPSXS", 
			"iV2hwht_9spjpqb7UbbS-YHyuWzoRgo50j0MQ2s7Mls", 
			"POST", 
			webServiceUrl);
			
console.log(token);

const options = {
	hostname: 'wfo-server',
	port: 80,
	path: '/DASWebApi/Query/ExecuteDynamicQuery',
	method: 'POST',
	headers: {
		'Authorization': token,
		'Content-Type': 'application/json'
	}
	
}

var json = JSON.stringify({
	"UserID": 8001,
	"ConditionsString": "",
	"period": {
		"BeginPeriod": "2017-01-01T16:00:00",
		"EndPeriod": "2020-10-06T16:20:00",
		"TimeOfDateBegin": "00:00:00",
		"TimeOfDateEnd": "23:59:00",
		"Type": "Absolute",
		"Days": 0
	},
    "RequestedGroups":  [

    ],
	"RequestedColumns": null,
	"CommandTimoutSeconds": 30
});

const req = http.request(options, res => {
	console.log(`statusCode: ${res.statusCode}`);
	
	res.on('data', d => {
		process.stdout.write(d);
	});
});

req.write(json);
req.end();
```

## Release Notes

### 1.0.0
Initial release