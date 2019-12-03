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

To run locally, clone this GitHub repository to your machine. You ultimately only need the backend folder. Then proceed to install the [npm](https://www.npmjs.com/) dependencies using the command:

```bash

npm install

```

The public folder in the backend repo contains a pre-built [Vue](https://github.com/vuejs/vue) project that is served to `http://localhost:3000/` once you run the project.

To run the project use the command:

```bash

npm run start

```

If you wish to use a local database, you can do so by changing the Variables in the `.env` file.

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

-   [http://ur-coding-challenge.apps.us-east-1.starter.openshift-online.com/](http://ur-coding-challenge.apps.us-east-1.starter.openshift-online.com/)

Keep in mind that we can't get your location because the connection to this website is not secure. for location detection, consider installing the app locally. You might also experience some latency depending on your network due to the Pods being hosted on the US east region.

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

-- `GET /api/v1/shops`

This endpoint is used to bulk retrieve shops, it doesn't require any special `HTTP` headers. this endpoint takes the following query parameters _(None of these parameters is required to make a request)_:

| Parameter  |      Param format       | Usage                                                                                                                                                                                                                                                                                                                                                                                                              |
| ---------- | :---------------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `name`     |        `String`         | This query parameter is used to perform a search by name, it looks for any Shop with a name that is similar to the passed value. **Example:** `api/v1/shops?name=cu` would return shops with names like Cujo and Securia. _This feature **is not** implemented in the Vue app._                                                                                                                                    |
| `city`     |        `String`         | This query parameter is used to perform a search by shop's city, it works in a similar manner to `name`. _This feature **is not** implemented in the Vue app._                                                                                                                                                                                                                                                     |
| `location` |  `longitude,latitude`   | This parameter represents the center of a circle, it is used by the backend to return shops sorted nearest first. **Example:** `shops?location=-6.82,33.86` where `-6.82` is longitude and `33.86` is latitude. if no location query parameter sent, the location defaults to `-6.8498, 33.9716` (center of Rabat). _This feature **is** implemented in the Vue app._                                              |
| `distance` |        `number`         | This parameter defines the radius of a circle which center is the `location`, the server will only return shops that exist within this circle. **Example:** `shops?distance=1500` will define a radius of 1.5 Km from the center. if this parameter is undefined the server defaults it to a 10 Km radius. _This feature **is not** implemented in the Vue app_ but it is still defaulted to 10 Km in the backend. |
| `limit`    |        `number`         | this parameter only works with `skip`, together they allow users to batch request shops. **Example:** `shops?skip=4&limit=16` will skip first 4 shops then return the following 16 shops. _this feature **is** implemented in the Vue app._                                                                                                                                                                        |
| `skip`     |        `number`         | this parameter only works with `limit`, vue `limit` for details on usage.                                                                                                                                                                                                                                                                                                                                          |
| `fields`   | list of `String` fields | this parameter defines the shop fields to return. By default, the server returns `_id`, `name`, `city` and `picture`. **Example:** `shops?fields=name,picture` will return a list of shops with the fields `_id`, `name` and `picture`. this can take any combination of fields and `_id` is always present. _this feature **is not** implemented in the Vue app._                                                 |  |

#### Example:

Request:

```http
GET /api/v1/shops?name=cu&amp; skip=2&amp; limit=3 HTTP/1.1
Host: ur-coding-challenge.apps.us-east-1.starter.openshift-online.com


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

-- `POST /api/v1/shops`

This endpoint is used to create a new Shop, it requires a `Content-Type: application/json` HTTP header. the request to this endpoint should be accompanied with a payload `JSON` containing all Shop's fields except for the `_id`, the absence of a field would result in a response with a `422 HTTP status` containing the missing fields. Request success results in a `201 HTTP status` response with a payload containing the new Shop. _This feature **is not** implemented in Vue app._

#### Example:

Request:

```http
POST /api/v1/shops HTTP/1.1
Host: ur-coding-challenge.apps.us-east-1.starter.openshift-online.com
Content-Type: application/json

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
		"coordinates": [-6.88193, 33.98757],
		"type": "Point"
	},
	"_id": "5de449484b3dad27f95840b7",
	"picture": "http://placehold.it/1200x600",
	"name": "Kineticutit",
	"email": "leilaware@kineticutit.com",
	"city": "Rabat"
}
```

-- `GET /api/v1/shops/[id]`

This endpoint is used to retrieve a shop's details, it doesn't take any special `HTTP` headers, neither a payload nor query parameters. if there is no shop with the `_id` equal to `[id]`, the server will return a not found `404 status code`. On the other hand if the shop exists, the server will return a `200 status code` with a payload containing all of the shop's fields. _This feature **is not** implemented in Vue app._

#### Example:

Request:

```http
GET /api/v1/shops/5de449484b3dad27f95840b7 HTTP/1.1
Host: ur-coding-challenge.apps.us-east-1.starter.openshift-online.com


```

Response payload:

```json
{
	"location": {
		"coordinates": [-6.88193, 33.98757],
		"type": "Point"
	},
	"_id": "5de449484b3dad27f95840b7",
	"picture": "http://placehold.it/1200x600",
	"name": "Kineticutit",
	"email": "leilaware@kineticutit.com",
	"city": "Rabat"
}
```

-- `PUT /api/v1/shops/[id]`

This endpoint is used to update a shop's data, it requires a `Content-Type: application/json` HTTP header. the request to this endpoint should be accompanied with a `JSON` payload containing all fields that need to be updated alongside their values, a bad payload would result in an `422 HTTP status`. if the shop doesn't exist it returns a `404 status code`. Request success results in a `200 HTTP status` response with a payload containing the updated Shop's `_id`. _This feature **is not** implemented in Vue app._

#### Example:

request:

```http
PUT /api/v1/shops/5de449484b3dad27f95840b7 HTTP/1.1
Host: ur-coding-challenge.apps.us-east-1.starter.openshift-online.com
Content-Type: application/json

{
   "city":"Casablanca"
}
```

Response payload:

```json
"5de449484b3dad27f95840b7"
```

-- `DELETE /api/v1/shops/[id]`

This endpoint is used to delete a shop, it doesn't take any special `HTTP` headers, neither a payload nor query parameters. if the shop doesn't exist it returns a `404 status code`. Request success results in a `200 HTTP status` response with a payload containing the deleted Shop's `_id`. _This feature **is not** implemented in Vue app._

#### Example:

request:

```http
DELETE /api/v1/shops/5de449484b3dad27f95840b7 HTTP/1.1
Host: ur-coding-challenge.apps.us-east-1.starter.openshift-online.com


```

Response payload:

```json
"5de449484b3dad27f95840b7"
```

## Users Endpoints:

All of the following features are included in the Vue app:

-- `POST /api/v1/users`

This endpoint allows the creation of new users (signup), it takes a `JSON` payload containing user fields; `name`, `email` and `password`. The server then creates a `JSON Web Token` and returns it as a payload with a `201 status code`. If the fields are not conformable or there is an error, The server returns either a `422` or `500 status error` accordingly.

#### Example:

Request:

```http
POST /api/v1/users HTTP/1.1
Host: ur-coding-challenge.apps.us-east-1.starter.openshift-online.com
Content-Type: application/json

{
	"name": "United Remote",
	"email": "test@unitedremote.com",
	"password": "urururur"
}
```

Response Payload:

```json
"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGU0YjMwMjhmODRlN2E2YWQ0NjViMTMiLCJpYXQiOjE1NzUyNjkxMjJ9.UV2BbclsNhnokHoNQwxoHBLOyGijvCqwSGfoVu93R5F7qmJ7efo_4X2FOh8qVs2WqLtQTMrGaWrOq5XvCqVb05Sbapm2a6stEKUC1uWF54D_cmhLdRODdHlaEhjo_4eOW7T8JuriDSa_IIh30wTb00YtFJZHJZVHaQiBQsOyea_0bcBVwkTZLb-02NCxrpSFebg-nGuaA9niq2vUWdH--7eqTP-eccOKutzU_q88Z6WzFxJMkR3RO3T-mlIbLkl5cXYA8Ro3Cq6FThdhOVl0cn0cIvyMqymKAHPKTpMGPm8FtpidOalnoxXQZRQLhCscIFPmXSmbDAoxkBvUsguIT4q43-uOO_ymVy7XyKVf85U0xd_akgBDH_H7yTRIuwRXb_2gylKHlvyloFfyK0ujek-LZysSl9fKgpUT0XSZDnKmDMnCI1k8FngmB5wUeFi1kQYLbGO0-HP24wF8M-aj3HcELGqtv06YyW4UTmBfuuOkMX8krcLyrAidnTUPnl_Jn-9loQMm4aEt87VDetxWqSFzrteJL2AHQyY5LAn3_84RyRqOJ5RzpjSrM8FN_YQwnm6sdmR-KCE6R_f3i3R-QTF8X0l42Otc6u2XaOsFJJs4fqlqr1wkiuph9U6mWxJ9x4LnLXwaJbZ2miGe391WyDg8tOP4us0nfxwtsqauCE8"
```

-- `POST /api/v1/users/login`

This endpoint returns a user's token (login), it takes a `JSON` payload containing user fields; `email` and `password`. The server then creates a `JSON Web Token` and returns it as a payload with a `200 status code`. If the `email` or `password` are wrong or there is an error, The server returns either a `404` or `500 status error` accordingly.

#### Example:

Request:

```http
POST /api/v1/users/login HTTP/1.1
Host: ur-coding-challenge.apps.us-east-1.starter.openshift-online.com
Content-Type: application/json

{
	"email": "test@unitedremote.com",
	"password": "urururur"
}
```

Response Payload:

```json
"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGU0YjMwMjhmODRlN2E2YWQ0NjViMTMiLCJpYXQiOjE1NzUyNjk1Mzh9.ez3xwVkdurKQmTFyYcR4PAaV58Psty5bXU2NXHdz46k41Q7vtutBccVKvHGjFRCW2hBhoHk3XxHTm8SenZKCDs2BxNCAXrJIWbWK8x6Nl4Tfe2qp9xjsMKhv3Y0u51x2qRglxPCXc8-2cpfWBugMEIPdDN-vluOklVX4hdIHBLDdSniEY_SZRPhPYoCy3-9Ju5AsdpozDBrOoFkLSIz23DeY_JEigQ7fZKRMb3lY07IgDfP_FdObH8k9-8PwhMPDfgAGXbO9BLjPPLLobVb-PVj2RYwkxrYxub_1n_w-lq1APciqDAFHxqXztZGI0lRUi85O_KRq3oUU-t7kDisZuEve6DAd9_vuPKeCR1eyWJBcjKiACXfnCmHk0ir80mPzuVG-pCGw45ouXCuQe3B4NhwqvYTpfAUok4tG8ZWlr0iDtH5YruaC38Syx3qijZA06NGbsE9JyX6luJfjzkF1OO6r3TSuJTXRKmzyaMRt4GQX2b5ubGN42CkdUvFbAZ2eS-b1s2wtcl_uODgOpnAopP6LiXAXiLPV-S6cGkUCoFqTTYCnAl6LIYBch3sk1RgoBR_p8LSeWcP9D-IOQBWNgneeX8C1aX8Ri4AGgccVgnUBO9m4Au0lCmphu_k21RDT-qXDZfyr25C0UxZJHx5qhtPtkqdpMR4ZjxX4U4_zo_0"
```

-- `GET /api/v1/users/shops`

This endpoint has two possible uses:

-   **Case 1:** it can be used to return arrays containing user's liked and disliked shops `_id`s. this is used to filter those shops from the Nearby Shops page in the Vue app.

-   **Case 2:** it can be used to return an array containing the details of a user's liked shops. if there are no liked shops, the server returns a `404 status code` This is used in the preferred shops page in the Vue app.

To differentiate the use cases, we add a `liked=true` as a query parameter to let the server know that we want the second use case. both use cases require an Authorization header in the following form:

```http
Authorization: Bearer [token]
```

if there is no `Authorization` header included, the server returns a `403 status code`.

#### Examples:

-   **Case 1:**

Request:

```http
GET /api/v1/users/shops HTTP/1.1
Host: ur-coding-challenge.apps.us-east-1.starter.openshift-online.com
Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGUxNmNlYjJlMWY3MzRiMWVjZTRiYTQiLCJpYXQiOjE1NzUyNzA1MTh9.KvSa9uC2DKmAKYWdoo3Mn_lA8nwp_mRf-YzaSTeEOHeIqU3kxeAvtKtBy6VnRD3Fg_rtqJDoXCvUnxfrGk7ehmRPMGHbrf8FaS18ZZqjxsMNbzKo4YPfvs3sELRckLB-u5REU7_B92u99VfB77ufQBFTgx4LFnbeaPpYkuSs96zT1PEE7G-OfPEDt3vNy9eD3D9v2WW8fBsrUYryOJP8_RuvQ2Or-lRP-SDFMEPN2lU3pppKcxs1_3-jTmwkumdc9WG_N1T9ZcBqHWG8ddW7Xrl5WssumDPa-CzCGpaAHwyv17VZRDDpRH7Jn3Y9saine50mUNdtd1AvOmxkdndatsOjCmfLegzT5RD5IZH1tZkF-a6yq5ZWWBMJBvVY_N29rCHV-ON-ednx8uKfHj0bLPT1_nREIfVArFKcvajda4ZvWSa57ivx_d0OThZQ6hg_gAcNqxs2aNh9BhetzvIDtuDWrdmO9P-jcCu3z4O2cIRH-ZpIje0i-H85EiOnDshIL1ojkd1Ra30mcaTjw2zbIp8dX60-Jsv6l4wt5dyVzoItEj3S5KQC4lOCkRUPKlBzgaj5fh2G-3qnks1XZEBnS35KvWNC2GJ5YUUMiwWNbPprJGTa99RqdoMB_NSsYMCcYSBO6zlYyys-lB0s6GZU0zmvFzr9al7zw8t5CQLCoNA


```

Response payload:

```json
{
	"likes": [
		"5a0c680afd3eb67969316d0c",
		"5a0c6817fd3eb67969316d23",
		"5a0c6b42fd3eb67969316d87",
		"5a0c689efd3eb67969316d58",
		"5a0c6bd5fd3eb67969316ded",
		"5a0c67cafd3eb67969316cee"
	],
	"dislikes": []
}
```

-   **Case 2:**

Request:

```http
GET /api/v1/users/shops?likes=true HTTP/1.1
Host: ur-coding-challenge.apps.us-east-1.starter.openshift-online.com
Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGUxNmNlYjJlMWY3MzRiMWVjZTRiYTQiLCJpYXQiOjE1NzUyNzA1MTh9.KvSa9uC2DKmAKYWdoo3Mn_lA8nwp_mRf-YzaSTeEOHeIqU3kxeAvtKtBy6VnRD3Fg_rtqJDoXCvUnxfrGk7ehmRPMGHbrf8FaS18ZZqjxsMNbzKo4YPfvs3sELRckLB-u5REU7_B92u99VfB77ufQBFTgx4LFnbeaPpYkuSs96zT1PEE7G-OfPEDt3vNy9eD3D9v2WW8fBsrUYryOJP8_RuvQ2Or-lRP-SDFMEPN2lU3pppKcxs1_3-jTmwkumdc9WG_N1T9ZcBqHWG8ddW7Xrl5WssumDPa-CzCGpaAHwyv17VZRDDpRH7Jn3Y9saine50mUNdtd1AvOmxkdndatsOjCmfLegzT5RD5IZH1tZkF-a6yq5ZWWBMJBvVY_N29rCHV-ON-ednx8uKfHj0bLPT1_nREIfVArFKcvajda4ZvWSa57ivx_d0OThZQ6hg_gAcNqxs2aNh9BhetzvIDtuDWrdmO9P-jcCu3z4O2cIRH-ZpIje0i-H85EiOnDshIL1ojkd1Ra30mcaTjw2zbIp8dX60-Jsv6l4wt5dyVzoItEj3S5KQC4lOCkRUPKlBzgaj5fh2G-3qnks1XZEBnS35KvWNC2GJ5YUUMiwWNbPprJGTa99RqdoMB_NSsYMCcYSBO6zlYyys-lB0s6GZU0zmvFzr9al7zw8t5CQLCoNA

```

Response payload:

```json
[
	{
		"location": {
			"coordinates": [-6.83326, 33.96551],
			"type": "Point"
		},
		"_id": "5a0c67cafd3eb67969316cee",
		"picture": "http://placehold.it/1200x600",
		"name": "Scentric",
		"email": "leilaware@scentric.com",
		"city": "Rabat"
	},
	{
		"location": {
			"coordinates": [-6.84039, 33.97518],
			"type": "Point"
		},
		"_id": "5a0c680afd3eb67969316d0c",
		"picture": "http://placehold.it/1200x600",
		"name": "Limage",
		"email": "leilaware@limage.com",
		"city": "Rabat"
	},
	{
		"location": {
			"coordinates": [-6.84015, 33.97918],
			"type": "Point"
		},
		"_id": "5a0c6817fd3eb67969316d23",
		"picture": "http://placehold.it/1200x600",
		"name": "Insurety",
		"email": "leilaware@insurety.com",
		"city": "Rabat"
	},
	{
		"location": {
			"coordinates": [-6.78895, 33.97824],
			"type": "Point"
		},
		"_id": "5a0c689efd3eb67969316d58",
		"picture": "http://placehold.it/1200x600",
		"name": "Waretel",
		"email": "leilaware@waretel.com",
		"city": "Rabat"
	},
	{
		"location": {
			"coordinates": [-6.84009, 33.94218],
			"type": "Point"
		},
		"_id": "5a0c6b42fd3eb67969316d87",
		"picture": "http://placehold.it/1200x600",
		"name": "Trollery",
		"email": "leilaware@trollery.com",
		"city": "Rabat"
	},
	{
		"location": {
			"coordinates": [-6.84032, 33.96739],
			"type": "Point"
		},
		"_id": "5a0c6bd5fd3eb67969316ded",
		"picture": "http://placehold.it/1200x600",
		"name": "Zounds",
		"email": "leilaware@zounds.com",
		"city": "Rabat"
	}
]
```

-- `PUT /api/v1/users/shops/[shop_id]`

This endpoint is used to move a Shop between a user's likes and dislikes, which is the equivalent of **liking a shop**, **disliking a shop**, and **removing it from liked shops**. You cannot remove a shop from dislikes, this process is done automatically in the backend. **Shops are removed from dislikes once they have been there for two hours**.

-   To like a shop, it needs to not be in the dislikes nor likes. You also need to accompany the request with the following payload:

```json
{ "up": true }
```

-   To dislike a shop, it needs to not be in the dislikes nor likes. You also need to accompany the request with the following payload:

```json
{ "up": false }
```

-   To remove a shop from likes, it needs to be likes. You also need to accompany the request with the following payload:

```json
{ "up": false }
```

requests to this endpoint should have the `Authorization` header same as previous request.

#### Examples:

-   Liking a shop:

Request:

```http
PUT /api/v1/users/shops/5a0c67cafd3eb67969316cee HTTP/1.1
Host: ur-coding-challenge.apps.us-east-1.starter.openshift-online.com
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGUxNmNlYjJlMWY3MzRiMWVjZTRiYTQiLCJpYXQiOjE1NzUyNzA1MTh9.KvSa9uC2DKmAKYWdoo3Mn_lA8nwp_mRf-YzaSTeEOHeIqU3kxeAvtKtBy6VnRD3Fg_rtqJDoXCvUnxfrGk7ehmRPMGHbrf8FaS18ZZqjxsMNbzKo4YPfvs3sELRckLB-u5REU7_B92u99VfB77ufQBFTgx4LFnbeaPpYkuSs96zT1PEE7G-OfPEDt3vNy9eD3D9v2WW8fBsrUYryOJP8_RuvQ2Or-lRP-SDFMEPN2lU3pppKcxs1_3-jTmwkumdc9WG_N1T9ZcBqHWG8ddW7Xrl5WssumDPa-CzCGpaAHwyv17VZRDDpRH7Jn3Y9saine50mUNdtd1AvOmxkdndatsOjCmfLegzT5RD5IZH1tZkF-a6yq5ZWWBMJBvVY_N29rCHV-ON-ednx8uKfHj0bLPT1_nREIfVArFKcvajda4ZvWSa57ivx_d0OThZQ6hg_gAcNqxs2aNh9BhetzvIDtuDWrdmO9P-jcCu3z4O2cIRH-ZpIje0i-H85EiOnDshIL1ojkd1Ra30mcaTjw2zbIp8dX60-Jsv6l4wt5dyVzoItEj3S5KQC4lOCkRUPKlBzgaj5fh2G-3qnks1XZEBnS35KvWNC2GJ5YUUMiwWNbPprJGTa99RqdoMB_NSsYMCcYSBO6zlYyys-lB0s6GZU0zmvFzr9al7zw8t5CQLCoNA

{
	"up" : true
}
```

-   Removing a shop from likes:

Request:

```http
PUT /api/v1/users/shops/5a0c67cafd3eb67969316cee HTTP/1.1
Host: ur-coding-challenge.apps.us-east-1.starter.openshift-online.com
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGUxNmNlYjJlMWY3MzRiMWVjZTRiYTQiLCJpYXQiOjE1NzUyNzA1MTh9.KvSa9uC2DKmAKYWdoo3Mn_lA8nwp_mRf-YzaSTeEOHeIqU3kxeAvtKtBy6VnRD3Fg_rtqJDoXCvUnxfrGk7ehmRPMGHbrf8FaS18ZZqjxsMNbzKo4YPfvs3sELRckLB-u5REU7_B92u99VfB77ufQBFTgx4LFnbeaPpYkuSs96zT1PEE7G-OfPEDt3vNy9eD3D9v2WW8fBsrUYryOJP8_RuvQ2Or-lRP-SDFMEPN2lU3pppKcxs1_3-jTmwkumdc9WG_N1T9ZcBqHWG8ddW7Xrl5WssumDPa-CzCGpaAHwyv17VZRDDpRH7Jn3Y9saine50mUNdtd1AvOmxkdndatsOjCmfLegzT5RD5IZH1tZkF-a6yq5ZWWBMJBvVY_N29rCHV-ON-ednx8uKfHj0bLPT1_nREIfVArFKcvajda4ZvWSa57ivx_d0OThZQ6hg_gAcNqxs2aNh9BhetzvIDtuDWrdmO9P-jcCu3z4O2cIRH-ZpIje0i-H85EiOnDshIL1ojkd1Ra30mcaTjw2zbIp8dX60-Jsv6l4wt5dyVzoItEj3S5KQC4lOCkRUPKlBzgaj5fh2G-3qnks1XZEBnS35KvWNC2GJ5YUUMiwWNbPprJGTa99RqdoMB_NSsYMCcYSBO6zlYyys-lB0s6GZU0zmvFzr9al7zw8t5CQLCoNA

{
	"up" : false
}
```

-   Disiking a shop:

Request:

```http
PUT /api/v1/users/shops/5a0c67cafd3eb67969316cee HTTP/1.1
Host: ur-coding-challenge.apps.us-east-1.starter.openshift-online.com
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGUxNmNlYjJlMWY3MzRiMWVjZTRiYTQiLCJpYXQiOjE1NzUyNzA1MTh9.KvSa9uC2DKmAKYWdoo3Mn_lA8nwp_mRf-YzaSTeEOHeIqU3kxeAvtKtBy6VnRD3Fg_rtqJDoXCvUnxfrGk7ehmRPMGHbrf8FaS18ZZqjxsMNbzKo4YPfvs3sELRckLB-u5REU7_B92u99VfB77ufQBFTgx4LFnbeaPpYkuSs96zT1PEE7G-OfPEDt3vNy9eD3D9v2WW8fBsrUYryOJP8_RuvQ2Or-lRP-SDFMEPN2lU3pppKcxs1_3-jTmwkumdc9WG_N1T9ZcBqHWG8ddW7Xrl5WssumDPa-CzCGpaAHwyv17VZRDDpRH7Jn3Y9saine50mUNdtd1AvOmxkdndatsOjCmfLegzT5RD5IZH1tZkF-a6yq5ZWWBMJBvVY_N29rCHV-ON-ednx8uKfHj0bLPT1_nREIfVArFKcvajda4ZvWSa57ivx_d0OThZQ6hg_gAcNqxs2aNh9BhetzvIDtuDWrdmO9P-jcCu3z4O2cIRH-ZpIje0i-H85EiOnDshIL1ojkd1Ra30mcaTjw2zbIp8dX60-Jsv6l4wt5dyVzoItEj3S5KQC4lOCkRUPKlBzgaj5fh2G-3qnks1XZEBnS35KvWNC2GJ5YUUMiwWNbPprJGTa99RqdoMB_NSsYMCcYSBO6zlYyys-lB0s6GZU0zmvFzr9al7zw8t5CQLCoNA

{
	"up" : false
}
```

**All of these requests return the updated user as a `JSON` payload:**

```json
{
	"likes": [
		"5a0c680afd3eb67969316d0c",
		"5a0c6817fd3eb67969316d23",
		"5a0c6b42fd3eb67969316d87",
		"5a0c689efd3eb67969316d58",
		"5a0c6bd5fd3eb67969316ded"
	],
	"_id": "5de16ceb2e1f734b1ece4ba4",
	"email": "a@gmail.com",
	"password": "$2b$10$TawGdMbKvQvYsMxO0Yr7a.ZdLUNGxTfsbYLXFtDyxvBHHh2.nDeKu",
	"name": "ben",
	"dislikes": [
		{
			"_id": "5a0c67cafd3eb67969316cee",
			"_time": "5de4c06d8f84e7175b465b14"
		}
	]
}
```

_For details on how the shops are removed from dislikes in two hours please refer to code comments._

## Dependencies

-   **[express](https://www.npmjs.com/package/express)**: Minimalist web framework used for routing

-   **[mongoose](https://www.npmjs.com/package/mongoose)**: Object modeling tool used to interact with MongoDB and perform various operations on the database.

-   **[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)**: Implementation of `JSON Web Tokens` used to generate user tokens and retrieve payload from tokens.

-   **[bcrypt](https://www.npmjs.com/package/bcrypt)**: Used to hash and salt passwords on signup and perform password comparison on login.

-   **[body-parser](https://www.npmjs.com/package/body-parser)**: Node middleware, used for request body parsing.

-   **[compression](https://www.npmjs.com/package/compression)**: Node middleware for compressing (gzip and deflate) responses if supported by client.

-   **[cors](https://www.npmjs.com/package/cors)**: Node middleware used to allow `CORS` from all origins.

-   **[dotenv](https://www.npmjs.com/package/dotenv)**: Used to read Environment variables from a `.env` file into `process.env`

## Author

👤 **Ben Said Nadir**

-   Website: https://www.linkedin.com/in/nadir-ben-said-49383a183/

-   Github: [@nadirBenSaid](https://github.com/nadirBenSaid)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br  />Feel free to check [issues page](https://github.com/nadirBenSaid/united-remote/issues).

## Show your support

Give a ⭐️ if you like this project!

## 📝 License

Copyright © 2019 [Ben Said Nadir](https://github.com/nadirBenSaid).<br  />

See license in the root of this project.
