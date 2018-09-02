# Native Bundler

This is an attempt at making a javascript bundler program that follows the next constraints/features:

1. Imports must be from absolute locations (`import React from 'https://unpkg.com/react@16.4.2/umd/react.production.min.js';`) or relative assets (i.e. no node_modules)
2. Support for imports of other assets

- CSS
- HTML
- SVG
- txt
- More?

3. Support static builds

Maybe more as well, but those are the ones I want to start with.
