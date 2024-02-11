# Sandbox

A simple HTML/CSS/JS sandbox

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

<script src="/path/to/sandbox.js"></script>
<script>sandbox({ options });</script>
```

## Options

| Option | Values | Description | Default |
|---|---|---|---|
| `box` | Allows any DOM element | Applies to the first element within the document that matches the specified selector. | `"document.querySelector(".sandbox")"` |
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
let sandboxes = this.box.querySelectorAll(".sandbox")forEach((box) => {
  sandbox({ box: box });
});
```
