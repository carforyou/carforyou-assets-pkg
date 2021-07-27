# CAR FOR YOU assets

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## Usage
```
npm install @carforyou/assets-pkg
```

### clean `dist`
```
npx cfy-assets clean
```

### optimize svg from `src` to `dist`
```
npx cfy-assets optimize
```

### generate components from optimized svg
```
npx cfy-assets components
```


### create index
```
npx cfy-assets index
```

### run all commands at once without worrying about the order
```
npx cfy-assets build
```

## Configuration
You can create a `assets.config.json` file in your root directory and specify the following things:

| Property       | Type    | Format |
| -------------- | ------- | ------ |
| `rootPath`     | string  | Add the root path to your svg assets relative to your config file. Your svgs must then be placed within that root folder in an `src` directory |
| `indexFiles`   | array   | Add the path to the directory you want to create an index file of. |
| `replaceColors`| array   | Array of strings with colors you want to replace with `currentColor` |
| `debug`        | boolean | If you want to log details to your console or not |

**Your svgs have to be placed within a rootPath/src folder.**

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