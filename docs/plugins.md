# Native Bundler Plugin Architecture

The bundler itself has a few stages:

1. Asset traversal (creating the asset graph)
2. External asset downloading
3. Transforming assets
4. Concatenating transformed assets

Ideally plugins would be able to describe how certain files should be handled within stages 2 and primarily 3.

All that a plugin would need to do in stage 2 is to determine how the asset is saved locally, and how it is wrapped so stage 4 can correctly integrate with it.

Stage 3 should be all custom depending on the plugin.

## Second Concept:

A plugin only really needs to define the following things:

- `code` the new returned value after transformation
- `map` optional, allows for better dev experiences
- `dependencies` optional array of other modules that the transformed asset depends upon (on top of assets `require`d)

Export a function called `plugin` that the core package can import (for builtins) or that a user can provide via config to be imported and used.

```js
export const plugin = async ({
  source,
  config
}) => Promise<{ code, map, dependencies }>
```

### Example text transformation plugin

```js
export const plugin = async ({ source, config }) => {
  return Promise.resolve({
    code: `return ${source}`,
  })
}
```

## Initial Concept:

A plugin can export a function that returns an object of three keys:

```js
export default function PluginName() {
  return {
    async downloadAsset(assetURL: string, saveLocation: string) {
      return new Promise(resolve => {
        resolve({
          filename: string,
          createdTime: number,
          filepath: string,
        })
      })
    },
    async wrapModule(pathToDownloadedAsset: string) {
      return new Promise(resolve => {
        resolve({
          dependencies: Array,
        })
      })
    },
    async transformAsset(fileContents: string) {
      return new Promise(resolve => {
        resolve({
          content: string,
        })
      })
    },
  }
}
```

### Example Text Asset (`.txt`) Plugin

First example is a barebones plugin, it only handles downloading the file.

```js
export default function TextPlugin({ downloadFile, writeFile, fileStats }) {
  return {
    async downloadAsset(assetURL, saveLocation) {
      const splitAssetName = assetURL.split('/')
      const fileName = splitAssetName[splitAssetName - 1]

      const filePath = `${saveLocation}/${fileName}`

      const fileContents = await downloadFile(assetURL)

      await writeFile(filePath, fileContents)

      const { birthtime } = await fileStats(filePath)

      return Promise.resolve({
        filePath,
        fileName,
        createdTime: birthtime,
      })
    },
  }
}
```
