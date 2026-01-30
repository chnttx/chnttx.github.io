---
outline: deep
---

# Runtime API Examples

This page demonstrates usage of some of the runtime APIs provided by VitePress.

The main `useData()` API can be used to access site, theme, and page data for the current page. It works in both `.md` and `.vue` files:

```md
<script setup>
import { useData } from 'vitepress'

const { theme, page, frontmatter } = useData()
</script>

## Results

### Theme Data

<pre class="runtime-code" v-text="JSON.stringify(theme, null, 2)"></pre>

### Page Data

<pre class="runtime-code" v-text="JSON.stringify(page, null, 2)"></pre>

### Page Frontmatter

<pre class="runtime-code" v-text="JSON.stringify(frontmatter, null, 2)"></pre>
```

<script setup>
import { useData } from 'vitepress'

const { site, theme, page, frontmatter } = useData()
</script>

## Results

### Theme Data

<pre class="runtime-code" v-text="JSON.stringify(theme, null, 2)"></pre>

### Page Data

<pre class="runtime-code" v-text="JSON.stringify(page, null, 2)"></pre>

### Page Frontmatter

<pre class="runtime-code" v-text="JSON.stringify(frontmatter, null, 2)"></pre>

## More

Check out the documentation for the [full list of runtime APIs](https://vitepress.dev/reference/runtime-api#usedata).
