[![Travis Build Status][build-badge]][build]

# smashbits

```
// TODO: Short description of the product.
```

## Getting Started

Our repo is currently split into `client/` and `server/` code, and these are two different projects (though this will change).

We recommend using Visual Studio Code for development.

To lint, run `npm run lint`. To format run `npm run format`.

### client/

After cloning the repo and installing dependencies with `npm install`, use these commands from the `client/` directory:

| Command         | Description                                                        |
| --------------- | ------------------------------------------------------------------ |
| `npm run start` | Run the app client app locally with hot reload at `localhost:8080` |
| `npm run build` | Build the app. Built files are in the `dist/` folder.              |

For local development with fake data (no server communication at all), edit `client/.env`. By default, the client will hit a local version of the server stack that connects to a (test) live DB environment

See [the Cookbook](https://github.com/hopskipnfall/smashbits/wiki/Cookbook) for full documentation.

[build-badge]: https://travis-ci.org/hopskipnfall/smashbits.svg?branch=master&style=style=flat-square
[build]: https://travis-ci.org/hopskipnfall/smashbits
