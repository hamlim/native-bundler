# Native Bundler Architecture

The Native Bundler starts from calling the bundler method from the core package:

```js
import bundler from '@native-bundler/core'
bundler({
  entry: 'src/index.js',
  out: './dist',
  cache: new Map(),
})
```

From there, the bundler generates a dependency tree, crawling imports from the entry module
categorizing each based off of:

- Is it a local import or an external import?
- Is it a universal import?
- What is the asset type of the import?
