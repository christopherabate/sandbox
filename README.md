# sandbox
An simple HTML/CSS/JS sandbox

## Get started

```html
<div class="sandbox">
  <pre><code class="language-html"></code></pre>
  <pre><code class="language-css"></code></pre>
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
|--------|-------------|---------|
| «selector» | css selector | ".sandbox" |
