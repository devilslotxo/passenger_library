function inputs() {
  return Array.from(document.querySelectorAll('.radio-choices input'));
}

function apply(fn) {
  return inputs().forEach(fn);
}

function applySelection(label, value) {
  const map = {
    "Heroku":"deploying_your_app",
    "Cloud66":"deploying_your_app",
    "AWS":"launch_server",
    "Ownserver":"installations",
    "Digital Ocean":"launch_server",
  };

  const button = document.querySelector('#next-step a.first-step');
  const prefix = '/deploy_to_production/';
  if (button && Object.keys(map).includes(value)) {
    button.href = button.href.replace(new RegExp(prefix+'[^/]+'), prefix+map[value]);
  }
  apply(e=>{if(e.dataset.label == label){e.checked=(e.value == value)}});
}

function handleChange(event) {
  const label = event.target.dataset.label;
  const value = event.target.value;
  //trigger dropdown onchange, which calls applySelection(label, value);
  const element = document.querySelector(`.${label.toLowerCase()} select`);
  element.value = value;
  var evt = document.createEvent("HTMLEvents");
  evt.initEvent("change", false, true);
  element.dispatchEvent(evt);
}

function toggleLang(event) {
  const installed = event.target.value == "yes";
  const target = document.querySelector('#yes-no-target')
  if (target) {
    target.style.display = (installed ? "none" : "inherit");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  inputs()
    .map(e=>e.dataset.label) // get labels
    .filter((e,i,a)=>a.indexOf(e) == i) // uniq
    .forEach(l=>{
      const v = window.localStorage.getItem(l);
      if (v) { apply(e=>{
        if(e.dataset.label == l){e.checked=(e.value == v)}
      }) }
    });

  apply(e=>e.addEventListener('change', handleChange));
  document.querySelectorAll('#yes-no-radio input').forEach(e=>e.addEventListener('change', toggleLang));
  toggleLang({target:{value:"yes"}});
});

export default applySelection;
