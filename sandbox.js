class Sandbox {
  
  constructor(options = {}) {
    
    this.box = options.box || document.querySelector(".sandbox");
    this.editable = options.editable || false;
    
    this.output = this.box.querySelector("iframe");
    this.template = this.output.textContent;
    
    this.update();
    
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
            this.update()
          }, 400);
        })
      });
    }
    
    return this.box;
  }
  
  update() {
    
    let input = [...this.template.matchAll(/\$\{([\w-]+)\}/g)].reduce((tag, language) => {
      return {...tag, [language[1]]: this.box.querySelector(`code[class*="${language[1]}"]`).textContent};
    }, {});
    
    let languages = Object.keys(input);
    let code = Object.values(input);
    
    let render = new Function(...languages, `return \`${this.template}\`;`)(...code);
    let clone = this.output.cloneNode();
    this.output.replaceWith(clone);
    this.output = clone;
    
    this.output.contentWindow.document.open();
    this.output.contentWindow.document.writeln(render);
    this.output.contentWindow.document.close();
  }
}