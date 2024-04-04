async function init(){
  await includeHTML();
  dynamicallyLoadScriptsFromFolder("./js");
}

/**
 * Includes HTML-Files into container containing "w3-include-html"-attribute 
 */
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
      const element = includeElements[i];
      file = element.getAttribute("w3-include-html");
      let resp = await fetch(file);
      if (resp.ok) {
        element.innerHTML = await resp.text();
      } else {
        element.innerHTML = 'Page not found';
      }
    }
  }

  
/**
 * 
 * @param {String} folderPath 
 */
function dynamicallyLoadScriptsFromFolder(folderPath) {
  var scripts = [
    'allTasks.js',
    'board.js',
    'contacts.js',
    'contact_list.js',
    'contact_popups.js',
    'login.js',
    'register.js',
    'storage.js',
    'summary.js'
  ];

  scripts.forEach(function(script) {
      var scriptElement = document.createElement("script");
      scriptElement.src = folderPath + "/" + script;
      scriptElement.setAttribute("defer","");
      document.head.appendChild(scriptElement);
  });
  console.log("JS imported")
}