# @silvenon/blog-utils

This package exports various utilities for common practices when building a blog. It used to be that every static site generator was its own universe, and sharing logic between them was hard, but their APIs are becoming [simpler][gatsby] and [simpler][react-static], so I decided to start maintaining a generic collection of utilities for extending these tools to make it easier to work with Markdown and [MDX] files.

These utilities heavily use [unified], a powerful ecosystem with a steep learning curve. Abstracting this logic away as much as possible was another motivation for creating this package.

The name of this package is scoped to emphasize the fact that these utilities reflect my own blogging preferences. If someone else wants to use these, but are missing some key features, I'm open to suggestions and contributions.

## Functions

### `extractPostMetadata`

```js
import { extractPostMetadata } from '@silvenon/blog-utils'
```

```
extractPostMetadata(filePath | vfile, features: {
  frontmatter: boolean,
  dateFromPath: boolean,
  excerpt: boolean,
  isMdx: boolean,
})
```

Let's say we have a blog post with a file name `1859-11-24-on-the-origin-of-species.md` containing:

```md
---
title: On the Origin of Species
author: Charles Darwin
---

> We all descended from monkeys, yo.
>
> --Charles Darwin

<!-- excerpt -->

On the Origin of Species, published on 24 November 1859, is a work of scientific literature by Charles Darwin which is considered to be the foundation of evolutionary biology. Darwin's book introduced the scientific theory that populations evolve over the course of generations through a process of natural selection.
```

And we want to extract YAML frontmatter, the date from the file path and the excerpt:

```js
const { extractPostMetadata } = require('@silvenon/blog-utils')

const postPath = `${__dirname}/1859-11-24-on-the-origin-of-species.md`

extractPostMetadata(postPath, {
  frontmatter: true,
  dateFromPath: true,
  excerpt: true,
}).then(metadata => {
  console.log(metadata)
})
```

Console output:

```js
{
  frontmatter: {
    title: 'On the Origin of Species',
    author: 'Charles Darwin',
  },
  date: '1859-11-24',
  excerpt: `<blockquote>
<p>We all descended from monkeys, yo.</p>
<p>--Charles Darwin</p>
</blockquote>`,
}
```

Other than the path to the file, `extractPostMetadata` can also take a [vfile] because that's the format that the unified ecosystem uses for text processing, and unified powers these utilities. Keep in mind that every time you call `extractPostMetadata` with a file path, that file has to be read, so if you know that the same file will be read multiple times, consider using a vfile.

If the file you're processing is written in MDX, set `isMdx` to `true`.

## Plugins

### `remark-remove-frontmatter`

You might want to use this to strip frontmatter away from files so it doesn't get processed as Markdown or MDX along with the rest of the file content. But before applying this plugin, you need to [use remark-frontmatter][remark-frontmatter] to detect frontmatter, so that remark-remove-frontmatter knows how to remove it from the syntax tree. For example, you might use it with @mdx-js/loader like this:

```js
const detectFrontmatter = require('remark-frontmatter')
const removeFrontmatter = require('@silvenon/blog-utils/remark-remove-frontmatter')

const format = 'toml'

// somewhere in the depths of a wepback config...

{
  test: /\.mdx$/,
  use: [
    'babel-loader',
    {
      loader: '@mdx-js/loader',
      options: {
        remarkPlugins: [
          [detectFrontmatter, { preset: format }],
          [removeFrontmatter, format],
        ],
      },
    },
  ],
}
```

Supports both YAML and TOML.

### `remark-save-frontmatter`

This plugin stores parsed frontmatter in file's `data` property, so you can retrieve this data after removing frontmatter.

```js
const remark = require('remark')
const detectFrontmatter = require('remark-frontmatter')
const saveFrontmatter = require('@silvenon/blog-utils/remark-save-frontmatter')
const removeFrontmatter = require('@silvenon/blog-utils/remark-remove-frontmatter')

const format = 'toml'

const file = remark()
  .use(detectFrontmatter, { preset: format })
  .use(saveFrontmatter, format)
  .use(removeFrontmatter, format)
  .processSync()

console.log(file.data) // { ... }
```

Supports both YAML and TOML.

### `remark-smartypants`

If you want to process Markdown or MDX with [SmartyPants] you can use this plugin. It uses [retext-smartypants] under the hood, so it takes the same options.

```js
const remark = require('remark')
const smartypants = require('@silvenon/blog-utils/remark-smartypants')

remark()
  .use(smartypants, {
    // options for retext-smartypants
  })
  .processSync(`# Title with "quotes"`)
```

This plugin exists because it's not possible to use retext-smartypants without converting the tree to retext, so instead remark-smartypants applies retext-smartypants to every text node, enabling us to continue using the remark tree.

[gatsby]: https://www.gatsbyjs.org
[react-static]: https://react-static.js.org
[vfile]: https://github.com/vfile/vfile
[unified]: https://unified.js.org
[MDX]: https://github.com/mdx-js/mdx
[remark-frontmatter]: https://github.com/remarkjs/remark-frontmatter
[SmartyPants]: https://daringfireball.net/projects/smartypants/
[retext-smartypants]: https://github.com/retextjs/retext-smartypants
