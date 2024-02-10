# sandbox
An simple HTML/CSS/JS sandbox

## Get started

The HTML document must contain:
- Single `iframe` containing the tagged template.
- As many `<pre><code>` as tags in iframe template.
- A class containing the tag name for each `<code>`.

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
        <script type="module">${js}</script>
      </body>
    </html>
  </iframe>
</div>

<link rel="stylesheet" href="/path/to/sandbox.css">
<script src="/path/to/sandbox.js"></script>
<script>let sandbox = new Sandbox({options});</script>
```

## Options

| Option | Description | Default |
|---|---|---|
| `box` | Allows any DOM element. Applies to the first element within the document that matches the specified selector. | `"document.querySelector(".sandbox")"` |
| `editable` | Allows `true` or a callback function for each change on text box. | `false` |

## Advances examples
### With options

```js
// Custom element "#Sandbox-1"
// Custom callback for each change 
new Sandbox({box: document.querySelector("#Sandbox-1"), editable: () => {
  alert("Text changed");
}});
```
### Multiple sandboxes

```js
// Turn every ".sandbox" element to Sandbox
let codeboxes = this.box.querySelectorAll(".sandbox")forEach((box) => {
  new Sandbox({box: box)});
});
```
