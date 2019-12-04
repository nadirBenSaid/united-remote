<h1  align="center">Welcome to united-remote-frontend 👋</h1>

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

This is the frontend part of the United Remote full-stack coding challenge, It's built using [Vue](https://github.com/vuejs/vue) and [MDB](https://github.com/mdbootstrap/Vue-Bootstrap-with-Material-Design) Vue bootstrap with material design.

### 🏠 [Full project](https://github.com/nadirBenSaid/united-remote)

# Usage:

## Use Locally, manual installation:

To run locally, clone this GitHub repository to your machine. Then proceed to install the [npm](https://www.npmjs.com/) dependencies under the path `/united-remote/frontend` using the command:

```

npm install

```

### Compiles and hot-reloads for development

```

npm run serve

```

### Compiles and minifies for production

```

npm run build

```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

If you wish to use a remote backend, you can do so by changing the variable in the `.env` file.

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
docker run -p 3000:3000 -d [IMAGE_NAME]:[TAG]
```

This will expose the project to port `3000` on your machine.

## Use online (DEMO):

At the time of the publication of this file, there are 4 containers running a docker image of this project on [Red Hat OpenShift](https://www.openshift.com/) [Pods](https://docs.openshift.com/enterprise/3.0/architecture/core_concepts/pods_and_services.html) to allow remote access for this project. You can access the project through the url:

-   [http://ur-coding-challenge.apps.us-east-1.starter.openshift-online.com/](http://ur-coding-challenge.apps.us-east-1.starter.openshift-online.com/)

Keep in mind that we can't get your location because the connection to this website is not secure. for location detection, consider installing the app locally. You might also experience some latency depending on your network due to the Pods being hosted on the US east region.

# Frontend Features

The website allows you to create a user account or login if you already have an account. As a user you can retrieve shops, like and dislike shops, remove a shop from your likes.

Liked and disliked shops disappear from the home page, disliked shops cease being in your dislikes after two hours from disliking them.

The shops are partially retrieved while the User scrolls down his main "feed". There are many filters to retrieve shops by in the backend but only the ones in the coding challenge are implemented in the frontend.

In the main feed, shops are sorted Nearest first to your current location. Note that if you don't allow your location, in the local usage case, the website defaults your location to the center of Rabat and retrieves shops that are within a 10 Km distance by default. check the [backend documentation](<[https://github.com/nadirBenSaid/united-remote/blob/master/backend/README.md](https://github.com/nadirBenSaid/united-remote/blob/master/backend/README.md)>) for more details on this.

## Screen captures:

Auth page:

![](https://i.ibb.co/XJ0HTcs/1.png)

Nearby shops page (main feed):

![](https://i.ibb.co/7zY9ryF/2.png)

Preferred shops page:

![](https://i.ibb.co/KhJSqVw/3.png)

##

## Author

👤 **Ben Said Nadir**

-   Website: https://www.linkedin.com/in/nadir-ben-said-49383a183/

-   Github: [@nadirBenSaid](https://github.com/nadirBenSaid)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br  />Feel free to check [issues page](https://github.com/nadirBenSaid/united-remote/issues).

## Show your support

Give a ⭐️ if you liked this project!

## 📝 License

Copyright © 2019 [Ben Said Nadir](https://github.com/nadirBenSaid).<br  />

This project is [SEE LICENSE IN <LICENSE>](https://github.com/nadirBenSaid/united-remote/blob/master/LICENSE) licensed.
