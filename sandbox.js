'use strict';

const sandbox = (options = {}) => {
  
  const BOX = options.box || document.querySelector(".sandbox");
  const EDITABLE = options.editable || false;
  const TEMPLATE = BOX.querySelector("iframe").textContent;
  
  sandbox.update(BOX, TEMPLATE);
  
  if (EDITABLE !== false) {
    
    BOX.querySelectorAll("pre code").forEach((codebox) => {
    
      let editor = document.createElement("div");
      let textarea = document.createElement("textarea");
      let timeoutID;
      
      editor.classList.add("sandbox-editor");
      
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
      
      
      textarea.addEventListener("input", (e) => {
        
        codebox.textContent = e.target.value;
        
        clearTimeout(timeoutID);
        timeoutID = setTimeout(() => {
          sandbox.update(BOX, TEMPLATE);
        }, 400);
      })
    });
  }
  
  return BOX;
};

sandbox.update = (box, template) => {
  let input = [...template.matchAll(/\$\{([\w-]+)\}/g)].reduce((tag, language) => {
    return {...tag, [language[1]]: box.querySelector(`code[class*="${language[1]}"]`).textContent};
  }, {});
  let output = box.querySelector("iframe");
  let languages = Object.keys(input);
  let code = Object.values(input);
  let render = new Function(...languages, `return \`${template}\`;`)(...code);
  
  output.src = URL.createObjectURL(new Blob([render], {type: "text/html"}));
};

const SHEET = new CSSStyleSheet();
SHEET.insertRule(".sandbox-editor { display: grid; grid-template-columns: 1fr; grid-template-rows: 1fr; gap: 0; }");
SHEET.insertRule(".sandbox-editor pre, .sandbox-editor textarea { font-family: monospace; font-size: .875rem; line-height: 1.5rem; grid-area: 1 / 1 / 2 / 2; padding: 1em !important; margin: 0 !important; overflow: hidden; border: none; }");
SHEET.insertRule(".sandbox-editor textarea { caret-color: white; background-color: transparent; color: transparent; resize: none; appearance: none; }");
SHEET.insertRule(".sandbox-editor code { word-wrap: break-word; white-space: pre-wrap; overflow-wrap: anywhere; overflow: hidden; }");
document.adoptedStyleSheets = [SHEET];

export default sandbox
