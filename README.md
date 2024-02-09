# sandbox
An simple HTML/CSS/JS sandbox

## Get started

Your HTML document must contain at least these elements:
- Nested `<pre><code>` for each code box with a class containing at least .
- `iframe` containing the tagged template.

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
        <p>My HTML</p>
        ${html}
        <script type="module">${js}</script>
      </body>
    </html>
  </iframe>
</div>

<link rel="stylesheet" href="/path/to/styles/sandbox.css">
<script src="/path/to/sandbox.js"></script>
<script>let sandbox = new Sandbox({options});</script>
```

## Options

| Option | Description | Default |
|---|---|---|
| `selector` | Allows any CSS selector. | `".sandbox"` |
| `editable` | Allows `true` or a callback function for each change on text box. | `false` |
