Dev Branch


To test CORS in dev via Terminal:

curl -H "Origin: http://localhost:5173" -i http://localhost:3001/api/regions

This should output similar to:

HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: http://localhost:5173
Vary: Origin
Content-Type: application/json; charset=utf-8
Content-Length: 174
ETag: W/"ae-QsGMGH5l7uoR950Dr6U9KsQSpq8"
Date: Wed, 27 Aug 2025 23:32:37 GMT
Connection: keep-alive
Keep-Alive: timeout=5

[{"id":1,"name":"Yorkshire & Humberside"},{"id":2,"name":"Yorkshire & Humberside"},{"id":3,"name":"Scotland"},{"id":4,"name":"Northern Ireland"},{"id":5,"name":"North East"}]%   