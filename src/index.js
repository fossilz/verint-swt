const crypto = require('crypto-js');

module.exports = {
	generateToken: (apiKeyId, apiKeyValue, httpMethod, url) => {
        // generate random salt
        const random = crypto.lib.WordArray.random(16);
        //get path expanding any variables that exist
        const loc = new URL(url);
        const path = loc.pathname;


        //generate canonicalizedHeader
        const canonicalizedHeader = "";


        //get String to sign
        const salt = base64url(random);
        const issuedAt = ISODateString(new Date());
        const stringToSign = salt + "\n" + httpMethod + "\n" + path + "\n" + issuedAt + "\n" + canonicalizedHeader + "\n";
        const hash = crypto.HmacSHA256(stringToSign, crypto.enc.Base64.parse(debase64url(apiKeyValue)));
        //get an signature
        const signature = crypto.enc.Base64.stringify(hash);
        //String prefix
        const verintAuthId = "Vrnt-1-HMAC-SHA256";
        //Generate Authorization Header Value
        const authHeaderValue = verintAuthId + " " + "salt=" + salt + "," + "iat=" + issuedAt + "," + "kid=" + apiKeyId +
            "," + "sig=" + urlConvertBase64(signature);
        return authHeaderValue;

	}
};

function ISODateString(d) {
    function pad(n) {
        return n < 10 ? '0' + n : n
    }
    return d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate()) + 'T' +
        pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes()) + ':' + pad(d.getUTCSeconds()) + 'Z'
}
//generate base64url by using cryptojs
function base64url(input) {
    const base64String = crypto.enc.Base64.stringify(input);
    return urlConvertBase64(base64String);
}
//convert base64url to base64
function debase64url(str) {
    return (str + '==='.slice((str.length + 3) % 4))
        .replace(/-/g, '+')
        .replace(/_/g, '/')
}
//convert to base 64 url
function urlConvertBase64(input) {
    let output = input.replace(/=+$/, '');
    output = output.replace(/\+/g, '-');
    output = output.replace(/\//g, '_');
    return output;
}



