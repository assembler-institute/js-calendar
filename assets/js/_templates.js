//
/* Append selected template in selected parent */
export function swapTemplate(templateId, parentId) {
  var template = document.getElementById(templateId);
  var parent = document.getElementById(parentId);

  parent.innerHTML = "";

  parent.appendChild(document.importNode(template.content, true));
}

/* remove selected template in selected parent */
export function removeTemplate(templateId, parentId) {
  let template = document.getElementById(templateId);
  let parent = document.getElementById(parentId);

  parent.innerHTML = "";
}
