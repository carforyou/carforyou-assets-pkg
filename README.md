# CAR FOR YOU assets

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## Usage
```
npm install @carforyou/assets-pkg
```
This package generates minified `tsx` components from your svg files so that you can include it as an inline svg into your React components.

### build optimized assets
```
npx cfy-assets build
```
1. Cleans the `dist` directory
2. Optimizes the svg files into the `dist` directory
3. Generates the `tsx` components into the `dist` directory
4. Generates the index files for the configured files

#### Before
```
your-project
├── assets.config.json
└── assets
  └── src
    ├── your svg files
    └── some_subfolder
        └── other svg files
```

#### After
```
your-project
├── assets.config.json
└── assets
  └── src
  | ├── your original svg files
  | └── some_subfolder
  |     └── other original svg files
  └── dist
    ├── your minified svg files
    ├── your minified tsx components
    └── some_subfolder
        ├── other minified svg files
        ├── other minified tsx components
        └── index.js file
```

### clean `dist` directory
```
npx cfy-assets clean
```
Removes all the auto-generated files.

## Configuration
You can create a configuration file called `assets.config.json` in your root directory and specify the following things:

| Property       | Type    | Default    | Format | 
| -------------- | ------- | ---------- | ------ |
| `rootPath`     | string  | `./assets` | Add the root path to your svg assets relative to your config file. Your svg must then be placed within that root folder in an `src` directory |
| `indexFiles`   | array   | `[]`       | Add the path relative to the directory you want to create an index file of. The option will create an `index.js` file with all the svg/tsx components in this directory |
| `replaceColors`| array   | `[]`       | Array of strings with colors you want to replace with `currentColor` |
| `debug`        | boolean | `false`    | If you want to log details to your console or not |

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

### Ignore automatically generated folders/files

You may want to ignore the folders and files the package generates automatically and only check in the original files
into your git repository. For that, please add the line `rootPath/dist/` (e.g. _assets/dist_ or _src/assets/dist_) to:
- .gitignore
- .prettierignore

### Configure eslint
eslint can help you to enforce defined rules in your code base. To restrict imports of original svgs so that only minified svgs are used, you can configure eslint as follows:
````javascript
module.exports = {
    rules: {
        "no-restricted-imports": ["error", { patterns: ["~/assets/src"] } ],
        "no-restricted-modules": ["error", { patterns: ["~/assets/src"] } ]
    }
}
````

### Accessibility
To make your svg accessible, assets-pkg automatically adds you a title tag and an `aria-label` to the svg that will be picked up by a screen reader.
By default, the title tag contains of the file name and the directory where it's located. E.g.:
- assets/src/instagram.svg -> title = instagram
- assets/src/badges/verified.svg -> title = verified badge
For better browser support, assets-pkg also adds `aria-label` and `role=img`.
  
If you are not happy with the auto-generated result, you can add a title tag and `aria-label` to your original svg. assets-pkg will not overwrite it.

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