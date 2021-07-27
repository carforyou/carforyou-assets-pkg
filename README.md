# CAR FOR YOU assets

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## Usage
```
npm install @carforyou/assets-pkg
```

### clean, optimize, generate components and index without worrying about the order
```
npx cfy-assets build
```

### clean `dist` directory
```
npx cfy-assets clean
```
Removes all the auto-generated files.

### optimize svg from `src` to `dist`
```
npx cfy-assets optimize
```
Copies the original svg to the `dist` directory and optimizes them.

### generate components from optimized svg
```
npx cfy-assets components
```
Generates `tsx` components from the optimized svg.

### create index
```
npx cfy-assets index
```
Creates an index file from a complete directory so that they can be included as follows:
```javascript
import * as bodyTypeIcons from "~/assets/dist/bodyTypes"
```

## Configuration
You can create a configuration file called `assets.config.json` in your root directory and specify the following things:

| Property       | Type    | Format |
| -------------- | ------- | ------ |
| `rootPath`     | string  | Add the root path to your svg assets relative to your config file. Your svg must then be placed within that root folder in an `src` directory |
| `indexFiles`   | array   | Add the path to the directory you want to create an index file of. |
| `replaceColors`| array   | Array of strings with colors you want to replace with `currentColor` |
| `debug`        | boolean | If you want to log details to your console or not |

**Your svg have to be placed within a rootPath/src folder.**

````json
{
  "rootPath": "./assets",
  "indexFiles": [
    {
      "path": "bodyTypes",
      "extension": "tsx"
    },
    {
      "path": "badges",
      "extension": "svg"
    }
  ],
  "replaceColors": [
    "#222",
    "#FF301C",
    "#FFFFFF"
  ],
  "debug": false
}
````

```
your-project
├── assets.config.json
├── assets
  └── src
    └── your svg files
    ├── bodyTypes
    ├   └── your bodyTypes svg files
    ├── badges
        └── your badges svg files
```

## Development
```
npm run build
```

```
npm run test
```
to run unit and integration tests

You can link your local npm package to integrate it with any local project:
```
cd carforyou-assets-pkg
npm run build

cd carforyou-listings-web
npm link ../carforyou-assets-pkg/pkg
```

## Release a new version

New versions are released on the ci using semantic-release as soon as you merge into master. Please
make sure your merge commit message adheres to the corresponding conventions.