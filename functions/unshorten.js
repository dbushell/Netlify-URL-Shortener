const url = require('url');
const http = require('http');
const https = require('https');

const defaults = {
  method: 'HEAD',
  redirects: 5
};

function unshorten(short, config) {
  config = {...defaults, ...(config || {})};
  return new Promise((resolve, reject) => {
    try {
      // Parse short URL and validate parts
      const {host, protocol, pathname: path} = url.parse(short);
      if (!host || !protocol || !path) {
        return reject(new Error(`Invalid URL`));
      }
      // Setup request callback
      const callback = response => {
        // Handle recursive redirects
        let {location} = response.headers;
        if (location && config.redirects--) {
          if (!/^http/.test(location)) {
            location = `${protocol}//${host}${location}`;
          }
          return resolve(unshorten(location, config));
        }
        // Resolve expanded URL
        return resolve(short);
      };
      // Send HTTP(S) request
      const {request} = protocol === 'https:' ? https : http;
      return request(
        {
          host,
          path,
          protocol,
          method: config.method,
          rejectUnauthorized: false
        },
        callback
      )
        .on('error', reject)
        .end();
    } catch (err) {
      // Reject any unknown errors
      return reject(err);
    }
  });
}

module.exports = {
  handler: (event, context, callback) => {
    const json = JSON.parse(event.body);
    callback(null, {
      statusCode: 200,
      body: {
        url: unshorten(json.url)
      }
    });
  }
};
