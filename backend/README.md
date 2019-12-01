
<h1  align="center">Welcome to united-remote-backend 👋</h1>

<p>

<img  alt="Version"  src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000"  />

<a  href="https://github.com/nadirBenSaid/united-remote#readme"  target="_blank">

<img  alt="Documentation"  src="https://img.shields.io/badge/documentation-yes-brightgreen.svg"  />

</a>

<a  href="https://github.com/nadirBenSaid/united-remote/graphs/commit-activity"  target="_blank">

<img  alt="Maintenance"  src="https://img.shields.io/badge/Maintained%3F-yes-green.svg"  />

</a>

</p>

  

> United Remote Coding Challenge

  

This is the backend part of the United Remote full-stack coding challenge, It's built using [NodeJS](https://github.com/nodejs/node), [Express](https://github.com/expressjs/express) and [MongoDB](https://github.com/mongodb/mongo)'s cloud platform [Atlas](https://www.mongodb.com/cloud/atlas) for persistence.

  
  

### 🏠 [Full project](https://github.com/nadirBenSaid/united-remote)

  # Usage:

## Use Locally, manual installation:

To run locally, clone this GitHub repository to your machine. You ultimately only need the backend folder. Then proceed to install  the [npm](https://www.npmjs.com/)  dependencies using the command:

```bash

npm install

```

The public folder in the backend repo contains a pre-built [Vue](https://github.com/vuejs/vue) project that is served to `http://localhost:3000/` once you run the project.

To run the project use the command:

```bash

npm run start

```

## Use Locally, Docker container:

You can also use this project as a [Docker](https://www.docker.com/) container, there is a `Dockerfile` ready in the backend folder that you can use to build an image for a docker container with the command:

```bash
docker build -t [IMAGE_NAME]:[TAG] .
``` 
This image is built using a lightweight [Alpine Linux](https://alpinelinux.org/) distribution, in addition to some dependencies needed for the [npm](https://www.npmjs.com/) packages. the image size is somewhat around ~90 Mo.

Alternatively, you can also pull a [pre-built image](https://hub.docker.com/repository/docker/bensaidnadir/united-remote-backend) from the Docker Hub by running the command:
```bash
docker pull bensaidnadir/united-remote-backend:latest
```
then proceed to run a Docker container using the command:
```bash
docker run [IMAGE_NAME]:[TAG]
```
This will expose the project to port `3000` on your machine.

## Use online (DEMO):

At the time of the publication of this file, there are two containers running a docker image of this project on a [Red Hat OpenShift](https://www.openshift.com/) [Pod](https://docs.openshift.com/enterprise/3.0/architecture/core_concepts/pods_and_services.html) to allow remote access for this project. You can access the project through the url:

 - [http://ur-coding-challenge.apps.us-east-1.starter.openshift-online.com/](http://ur-coding-challenge.apps.us-east-1.starter.openshift-online.com/)

Keep in mind that you might experience some latency depending on your network due to the Pods being hosted on the US east region.

# Backend Documentation:

## API:

All API calls should be sent to:
```
http://[BASE_URL]/api/v1/[endpoint]
```
This is for the purpose of grouping API calls and having a clear version included in the request's URL.

There are two main resources on this project. `stores` and `users`. 

`stores` is completely public, no authorization header needed to make requests to this endpoint. it is also completely RESTful, you can perform all CRUD operations on shops although they are not implemented in the Vue app. 

Shop `JSON` Example:

```JSON
{
   "location":{
      "coordinates":[
         -6.83193,
         33.98657
      ],
      "type":"Point"
   },
   "_id":"5a0c6bd5fd3eb67969316dfe",
   "picture":"http://placehold.it/1200x600",
   "name":"Kineticut",
   "email":"leilaware@kineticut.com",
   "city":"Rabat"
}
```

`users` on the other hands is not entirely RESTful and most of its endpoints require a `Bearer` Authorization header.

User `JSON` example:
```JSON
{
   "likes":[
      "5a0c6bd5fd3eb67969316ded",
      "5a0c67e9fd3eb67969316d03",
      "5a0c6bd5fd3eb67969316dfe",
      "5a0c6b55fd3eb67969316d9f",
      "5a0c6b90fd3eb67969316de5",
      "5a0c6817fd3eb67969316d1c",
      "5a0c6b61fd3eb67969316dba",
      "5a0c6b55fd3eb67969316d96",
      "5a0c6bd5fd3eb67969316dfd",
      "5a0c6b61fd3eb67969316db7",
      "5a0c6b83fd3eb67969316dd7"
   ],
   "_id":"5de11a188180c532f8f27c83",
   "name":"Ben Said Nadir",
   "email":"bensaidnadir@gmail.com",
   "password":"$2b$10$ekHAR77Gt96.xPE2K38C6euFUTSX.AgrFfAdBsSMeihMayADU3JWK",
   "dislikes":[
      {
         "_id":"5a0c6797fd3eb67969316ce7",
         "_time":"5de43e888f84e77a30465b0d"
      },
      {
         "_id":"5a0c689efd3eb67969316d43",
         "_time":"5de43e8b8f84e7c2a4465b0e"
      },
      {
         "_id":"5a0c689efd3eb67969316d57",
         "_time":"5de43efc8f84e70e69465b0f"
      }
   ]
}
```

## Shops Endpoints:

- `GET /api/v1/shops`

This endpoint is used to bulk retrieve shops, it doesn't require any special `HTTP` headers. this endpoint takes the following query parameters:

|Param  | Usage |
|---|---|
| `name` | This query parameter is used to perform a search by name, it looks for any Shop with a name that is similar to the passed value. **Example:** `api/v1/shops?name=cu` would return shops with names like Cujo and Securia. *This feature **is not** implemented in the Vue app.*|
|`city`|This query parameter is used to perform a search by shop's city, it works in a similar manner to `name`. *This feature **is not** implemented in the Vue app.*|
| `location` | This parameter represents the center of a circle, it is used by the backend to return shops sorted nearest first. **Example:** `shops?location=-6.82,33.86` where `-6.82` is longitude and `33.86` is latitude. if no location query parameter sent, the location defaults to `-6.8498, 33.9716` (center of Rabat). *This feature **is** implemented in the Vue app.* |
|`distance`|This parameter defines the radius of a circle which center is the `location`, the server will only return shops that exist within this circle. **Example:** `shops?distance=1500` will define a radius of 1.5 Km from the center. if this parameter is undefined the server defaults it to a 10 Km radius. *This feature **is not** implemented in the Vue app* but it is still defaulted to 10 Km in the backend.|
| `limit` | this parameter only works with `skip`, together they allow users to batch request shops. **Example:** `shops?skip=4&limit=16` will skip first 4 shops then return the following 16 shops. *this feature **is** implemented in the Vue app.*|
| `skip` | this parameter only works with `limit`, vue `limit` for details on usage. |
| `fields` | this parameter defines the shop fields to return. By default, the server returns `_id`, `name`, `city` and `picture`. **Example:** 	`shops?fields=name,picture` will return a list of shops with the fields `_id`, `name` and `picture`. this can take any combination of fields and `_id` is always present. *this feature **is not** implemented in the Vue app.*||

#### Example:

Request:
```http
GET /api/v1/shops?name=cu&amp; skip=2&amp; limit=3 HTTP/1.1
Host: ur-coding-challenge.apps.us-east-1.starter.openshift-online.com
Connection: keep-alive
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3
Accept-Encoding: gzip, deflate
Accept-Language: en-US,en;q=0.9
Cookie: b026fff084b032c2e9aeea8b60b32c55=4370585437b31d2e3dab266d84410bfa
If-None-Match: W/"169-ism33Ur5OKqDFzsyElbbaYlbc4M"
cache-control: no-cache
Postman-Token: 7678589d-2018-4e38-9b31-af033c5dd87f
```
This returns a `JSON` file with three fields: `error` that is set to null, `docs` that is the array containing the shops, and `totalCount` which is the total number of shops that match this criteria (useful for pagination). Here is the response:
```JSON
{
   "error":null,
   "docs":[
      {
         "_id":"5a0c6711fb3aac66aafe26d4",
         "picture":"http://placehold.it/1200x600",
         "name":"Securia",
         "city":"Rabat"
      },
      {
         "_id":"5a0c6b1dfd3eb67969316d66",
         "picture":"http://placehold.it/1200x600",
         "name":"Comcur",
         "city":"Rabat"
      },
      {
         "_id":"5a0c6bd5fd3eb67969316df1",
         "picture":"http://placehold.it/1200x600",
         "name":"Incubus",
         "city":"Rabat"
      }
   ],
   "totalCount":7
}
```

- `POST /api/v1/shops`

This endpoint is used to create a new Shop, it requires a `Content-Type: application/json` HTTP header. the request to this endpoint should be accompanied with a payload `JSON` containing all Shop's fields except for the `_id`, the absence of a field would result in a response with a `422 HTTP status` containing the missing fields. Request success results in a `201 HTTP status` response with a payload containing the new Shop.  *This feature **is not** implemented in Vue app.*

#### Example:

Request:

```http
POST /api/v1/shops HTTP/1.1
Host: localhost:3000
Content-Type: application/json
User-Agent: PostmanRuntime/7.19.0
Accept: */*
Cache-Control: no-cache
Postman-Token: b2a2dbff-6f17-4fd2-8c95-c7bf32a317f1,fb1b743d-5826-4d3c-a6fa-22b21212e486
Host: localhost:3000
Accept-Encoding: gzip, deflate
Content-Length: 242
Connection: keep-alive
cache-control: no-cache

{
   "location":{
      "coordinates":[
         -6.88193,
         33.98757
      ],
      "type":"Point"
   },
   "picture":"http://placehold.it/1200x600",
   "name":"Kineticutit",
   "email":"leilaware@kineticutit.com",
   "city":"Rabat"
}
```

Response Payload:

```json
{
    "location": {
        "coordinates": [
            -6.88193,
            33.98757
        ],
        "type": "Point"
    },
    "_id": "5de449484b3dad27f95840b7",
    "picture": "http://placehold.it/1200x600",
    "name": "Kineticutit",
    "email": "leilaware@kineticutit.com",
    "city": "Rabat"
}
```


- `GET /api/v1/shops/[id]`



- `PUT /api/v1/shops/[id]`



- `DELETE /api/v1/shops/[id]`




## Users Endpoints:
## 

## Author

  

👤 **Ben Said Nadir**

  

* Website: https://www.linkedin.com/in/nadir-ben-said-49383a183/

* Github: [@nadirBenSaid](https://github.com/nadirBenSaid)

  

## 🤝 Contributing

  

Contributions, issues and feature requests are welcome!<br  />Feel free to check [issues page](https://github.com/nadirBenSaid/united-remote/issues).

  

## Show your support

  

Give a ⭐️ if you like this project!

  

## 📝 License

  

Copyright © 2019 [Ben Said Nadir](https://github.com/nadirBenSaid).<br  />

This project is [SEE LICENSE IN <LICENSE>]
