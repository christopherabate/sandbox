class Sandbox {
  
  constructor(options = {}) {
    
    this.selector = options.selector || ".sandbox";
    this.editable = options.editable || false;
    
    this.sandbox = document.querySelector(this.selector);
    this.output = this.sandbox.querySelector("iframe");
    this.template = this.output.textContent;
    
    this.updateOutput();
    
    if (this.editable !== false) {
      
      let codeboxes = this.sandbox.querySelectorAll("pre code");
    
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
          
          if (typeof this.editable === "function") {
            try {
              this.editable();
            } catch (error) {
              console.log(error);
            }
          }
          
          clearTimeout(timeoutID);
          timeoutID = setTimeout(() => {
            this.updateOutput()
          }, 400);
        })
      });
    }
  }
  
  updateOutput() {
    
    let input = {
      html: this.sandbox.querySelector("code[class*='html']").textContent,
      css: this.sandbox.querySelector("code[class*='css']").textContent,
      js: this.sandbox.querySelector("code[class*='js']").textContent,
    };
    
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