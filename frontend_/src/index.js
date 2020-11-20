
import router from './router/router'


function loadRouter(){
  router()
}

window.addEventListener("hashchange", loadRouter, false);
window.addEventListener("load", loadRouter, false);
