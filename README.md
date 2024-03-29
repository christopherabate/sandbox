# Sandbox

A simple HTML/CSS/JS sandbox

## Install

Install sandbox in your Node.js powered apps with [the npm package](https://www.npmjs.com/package/@christopherabate/sandbox):

```sh
npm install @christopherabate/sandbox
```

## Get started

The HTML document must contain:
- Single `iframe` containing the tagged template.
- As many `<pre><code>` as tags in iframe template.
- A class containing the tag name for each `<code>`.
  
> [!IMPORTANT]
> Inside the template, tags must respect the convention: dollar sign followed by curly braces ${}.

```html
<div class="sandbox">
  <pre><code class="html"></code></pre>
  <pre><code class="css"></code></pre>
  <pre><code class="js"></code></pre>
  <iframe>
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>${css}</style>
      </head>
      <body>
        ${html}
        <script>${js}</script>
      </body>
    </html>
  </iframe>
</div>

<script type="module">
  import sandbox from "path/to/@christopherabate/sandbox/sandbox.js";
  sandbox({ options });
</script>
```

## Options

| Option | Values | Description | Default |
|---|---|---|---|
| `box` | Allows any DOM element | Must be a parent of the `<iframe>` and `<pre><code>` elements. Applies to the first element within the document that matches the specified selector. | `"document.querySelector(".sandbox")"` |
| `editable` | Allows `true` or `false` | `true` sync each `<code>` with a new `<textarea>` and update output on change with a 400ms debounce. | `false` |

## Return value

> [!NOTE]
> The constructor returns the DOM element.

## Advanced examples

### With options

```js
// Custom element "#Sandbox-1"
// Enable edition
sandbox({ box: document.querySelector("#Sandbox-1"), editable: true });
```
### Multiple sandboxes

```js
// Turn every ".sandbox" element to Sandbox
document.querySelectorAll(".sandbox").forEach((box) => {
  sandbox({ box: box });
});
```
