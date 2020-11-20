
import navbar2 from './navbar2'
import crud from '../crud/crud'

function prettyIds(items){
  items = JSON.parse(items)
  let pretty = ''
  Object.keys(items).forEach(key=>{
    pretty += `<p>${key}: ${items[key]}</p>`
  })
  return pretty
}


async function pedidos(){
  navbar2()
  $('#main').html(`
    <section id='pedidos'></section>
    `)
  let pedidos = await crud.pedidos()
  pedidos = pedidos.pedidos
  if(pedidos.length == 0){
    $('#pedidos').html('<h2>No se registran nuevos pedidos</h2>')
  }

  for(let i=0 ; i<pedidos.length ; i++){
    const item = $(`
        <article class='pedido'>
          <div class='datos'>
            <div>${pedidos[i].email}</div>
            <div>${pedidos[i].direccion}</div>
            <div>$${pedidos[i].amount}</div>
            <div>${pedidos[i].date}</div>
            <div>Status: ${pedidos[i].status}</div>
          </div>
          <div class='ids'>
            <div>Numero de pedido <br><br>${pedidos[i]._id}</div>
            <div>Productos comprados: <br>${prettyIds(pedidos[i].items)}</div>
            <div><a id='terminar-venta-${pedidos[i]._id}'>Finalizar venta</a></div>
          </div>
        </article>
      `)
    $('#pedidos').append(item)

    $(`#terminar-venta-${pedidos[i]._id}`).click(()=>{
      swal({
        text: "¿Esta seguro que desea dar la venta por finalizada?",
        icon: 'warning',
        buttons:{
          ok:{text: 'Finalizar', value: true, className:'myButton-black'},
          nop:{text: 'Cancelar', value: false, className:'myButton-wheat'}
        }
      }).then(response=>{
        if(response){
          let new_item = pedidos[i]
          new_item.status = '2'
          crud.finalizarPedido(new_item)
        }
      })
    })
  }
}

export default pedidos
