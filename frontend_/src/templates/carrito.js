
import navbar from "./navbar"
import swal from 'sweetalert';
import crud from '../crud/crud'

function goToPay(){
  let amount = $('#amount').text().split(':')[1]
  let email = $('#mail-contacto').val()
  let dir = $('#direccion-envio').val()
  let date = (new Date()).toDateString()
  let status = 0

  let form = $(`
    <form id='webpay-form' action='/webpayinit' method = 'post'>
      <input type='hidden' name='amount' value='${amount}'>
      <input type='hidden' name='email' value='${email}'>
      <input type='hidden' name='direccion' value='${dir}'>
      <input type='hidden' name='date' value='${date}'>
      <input type='hidden' name='status' value='${status}'>
      <input type='hidden' name='items' value='${sessionStorage.getItem('carrito_liberty')}'>
    </form>
    `)
    $('#main').append(form)
    document.getElementById("webpay-form").submit()
}

async function findItem(id){
  const items = await crud.get({'_id':id})
  return items.items[0]
}

async function calculateTotal(){
  let items_compra = JSON.parse(sessionStorage.getItem('carrito_liberty'))
  var total = 0
  Object.keys(items_compra).forEach(async item_key=>{
    let item = await findItem(item_key)
    total += item.price*items_compra[item_key]
    $('#amount').text(`Total: ${total}`)
  })

}


async function template_carrito(){

  navbar()
                                                                    // render estructura base
  const carrito_container = $(`
    <div id='carrito-container'>
      <section id="carrito"></section>
      <section id='carrito-contacto'>
        <input type='text' id='mail-contacto' placeholder='Correo de contacto'>
        <input type='text' id='direccion-envio' placeholder='Direccion de envio'>
      </section>
      <section id='carrito-comprar'>
        <img src='../assets/webpaycl.jpg'>
        <div>
          <div id='amount'></div>
          <input type='button' id='send-button' value='Comprar'>
        </div>
      </section>
    </div>
    `)
  $('#main').html(carrito_container)
  $('#send-button').click(()=>{
    goToPay()
  })
  calculateTotal()

  const carrito = $('#carrito')

  let items_compra = sessionStorage.getItem('carrito_liberty')
  items_compra = JSON.parse(items_compra)

  if(items_compra == null || $.isEmptyObject(items_compra)){        //Render empty-carrito
    const msg = `
      <div id="empty-carrito-div">
        <h1>Aun no se ha agregado nada al carrito</h1>
      </div>
    `
    carrito_container.html(msg)
    return ;
  }


  Object.keys(items_compra).forEach(async item_id => {                    //Render carrito
    if(item_id != 'items'){
      const item = await findItem(item_id)
      let item_vista = $(`
        <article class='item'>
          <h4>${item.name}</h4>
          <figure><img src='${item.img}'></figure>
          <div id='buy-price'>Precio: ${item.price}</div>
          <div id='buy-quantity-${item._id}'>Cantidad: ${items_compra[item_id]}</div>
          <div class='buttons'>
            <i class="fas fa-plus" id="buy-plus-${item._id}"></i>
            <i class="fas fa-minus" id="buy-minus-${item._id}"></i>
            <i class="fas fa-times" id="buy-cancel-${item._id}"></i>
          </div>
        </article>
        `)
      carrito.append(item_vista)

      $(`#buy-plus-${item._id}`).click(()=>{                                     //JS button +
        let items_compra_ = sessionStorage.getItem('carrito_liberty')
        items_compra_ = JSON.parse(items_compra_)
        items_compra_[item._id] += 1;
        $(`#buy-quantity-${item._id}`).text(`Cantidad: ${items_compra_[item._id]}`)
        sessionStorage.setItem('carrito_liberty',JSON.stringify(items_compra_))
        calculateTotal()
      })
      $(`#buy-cancel-${item._id}`).click(()=>{                                   //JS button x
        swal('¿Eliminar del carrito?',{
          icon: 'error',
          buttons:{
            sip: {text:'Eliminalo!',value:true,className:'myButton-black'},
            nop: {text:'Mejor no',value:false, className:'myButton-wheat'}
          }
        }).then(response =>{
          if(response){
            let items_compra_ = sessionStorage.getItem('carrito_liberty')
            items_compra_ = JSON.parse(items_compra_)
            delete items_compra_[item._id]
            sessionStorage.setItem('carrito_liberty',JSON.stringify(items_compra_))
            location.reload()
          }
        })
      })

      $(`#buy-minus-${item._id}`).click(()=>{                                      //JS button -
        let items_compra_ = sessionStorage.getItem('carrito_liberty')
        items_compra_ = JSON.parse(items_compra_)
        if(items_compra_[item._id] == 1){
          swal('¿Eliminar del carrito?',{
            icon: 'error',
            buttons:{
              sip: {text:'Eliminalo!',value:true,className:'myButton-black'},
              nop: {text:'Mejor no',value:false, className:'myButton-wheat'}
            }
          }).then(response =>{
            if(response){
              delete items_compra_[item._id]
              sessionStorage.setItem('carrito_liberty',JSON.stringify(items_compra_))
              location.reload()
            }
          })
        }else{
          items_compra_[item._id] -= 1;
          $(`#buy-quantity-${item._id}`).text(`Cantidad: ${items_compra_[item._id]}`)
          sessionStorage.setItem('carrito_liberty',JSON.stringify(items_compra_))
          calculateTotal()
        }
      })
    }
  })

}



export default template_carrito
