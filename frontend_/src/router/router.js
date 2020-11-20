

import template_poleras from '../templates/poleras'
import template_otros from '../templates/otros'
import template_404 from '../templates/404'
import template_carrito from '../templates/carrito'
import addItem from '../templates/addItem'
import editItem from '../templates/editItem'
import edit from '../templates/edit'
import pedidos from '../templates/pedidos'

const routes = {
  "": template_poleras,
  'poleras':  template_poleras,
  'otros': template_otros,
  'carritofacho': template_carrito,
  'additem': addItem,
  'edititem': editItem,
  'edit': edit,
  'pedidos': pedidos,
  '404': template_404
}

function router(){
  const hash = location.hash.substr(1).split('?')[0]
  if(routes[hash] == undefined){
    routes['404']()
  }else{
    routes[hash]()
  }
}

export default router
