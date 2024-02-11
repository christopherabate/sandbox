const sandbox = (options = {}) => {
  this.box = options.box || document.querySelector(".sandbox");
  this.editable = options.editable || false;
  
  this.output = this.box.querySelector("iframe");
  this.template = this.output.textContent;
  
  sandbox.update();
  
  if (this.editable !== false) {
    
    let codeboxes = this.box.querySelectorAll("pre code");
  
    codeboxes.forEach((codebox) => {
    
      let editor = document.createElement("div");
      editor.classList.add("sandbox-editor");
      
      let textarea = document.createElement("textarea");
      textarea.setAttribute("rows", "1");
      textarea.setAttribute("spellcheck", "false");
      textarea.setAttribute("autocorrect", "off");
      textarea.setAttribute("autocomplete", "off");
      textarea.setAttribute("autocapitalize", "off");
      textarea.setAttribute("translate", "no");
      textarea.setAttribute("title", codebox.getAttribute("title"));
      textarea.setAttribute("aria-label", codebox.getAttribute("title"));
      textarea.innerHTML = codebox.textContent;
      
      codebox.parentElement.insertAdjacentElement("beforebegin", editor);
      editor.appendChild(codebox.parentElement);
      editor.appendChild(textarea);
      
      let timeoutID;
      
      textarea.addEventListener("input", (e) => {
        
        codebox.textContent = e.target.value;
        
        clearTimeout(timeoutID);
        timeoutID = setTimeout(() => {
          sandbox.update()
        }, 400);
      })
    });
  }
  
  return this.box;
};

sandbox.update = () => {
  let input = [...template.matchAll(/\$\{([\w-]+)\}/g)].reduce((tag, language) => {
    return {...tag, [language[1]]: this.box.querySelector(`code[class*="${language[1]}"]`).textContent};
  }, {});
  
  let languages = Object.keys(input);
  let code = Object.values(input);
  
  let render = new Function(...languages, `return \`${template}\`;`)(...code);
  let clone = this.output.cloneNode();
  this.output.replaceWith(clone);
  this.output = clone;
  
  this.output.contentWindow.document.open();
  this.output.contentWindow.document.writeln(render);
  this.output.contentWindow.document.close();
  
  return true;
};

const sheet = new CSSStyleSheet();
sheet.insertRule(".sandbox-editor { display: grid; grid-template-columns: 1fr; grid-template-rows: 1fr; gap: 0; }");
sheet.insertRule(".sandbox-editor pre, .sandbox-editor textarea { font-family: monospace; font-size: .875rem; line-height: 1.5rem; grid-area: 1 / 1 / 2 / 2; padding: 1em !important; margin: 0 !important; overflow: hidden; border: none; }");
sheet.insertRule(".sandbox-editor textarea { caret-color: white; background-color: transparent; color: transparent; resize: none; appearance: none; }");
sheet.insertRule(".sandbox-editor code { word-wrap: break-word; white-space: pre-wrap; overflow-wrap: anywhere; overflow: hidden; }");
document.adoptedStyleSheets = [sheet];