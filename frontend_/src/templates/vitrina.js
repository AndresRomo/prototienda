import navbar from "./navbar"

function vitrina(items){

  navbar()

  const tienda_container = $('<section id="tienda"></section>')
  tienda_container.html("")
  $('#main').html(tienda_container)

  for(let i=0 ; i<items.length ; i++){
    let item = $(`
      <article class="item">
        <figure><img src='${items[i].img}'></figure>
        <h4>${items[i].name}</h4>
        <p>${items[i].description}</p>
        <p>Precio: $${items[i].price}</p>
        <div class='buy-button', id="buy-${items[i]._id}">
          Añadir al carrito
          <i class="fas fa-shopping-cart"></i>
        </div>
      </article>`)
    tienda_container.append(item)

    $(`#buy-${items[i]._id}`).click(()=>{
      swal({
        text: "Añadido al carrito",
        timer: 1000,
        icon: 'success',
        button: false
      })
      if(sessionStorage.getItem('carrito_liberty')==null){          // si no esta el objeto en el sessionStorage entonces se crea
        sessionStorage.setItem('carrito_liberty',JSON.stringify({}))
      }

      let carrito = sessionStorage.getItem('carrito_liberty')
      carrito = JSON.parse(carrito)
      if(carrito[`${items[i]._id}`] == undefined){       //si no esta el item se agrega con valor 1. Si ya esta entonces se incrementa la cantidad del item
          carrito[`${items[i]._id}`] = 1
      }else{
        carrito[`${items[i]._id}`] += 1
      }
      sessionStorage.setItem('carrito_liberty',JSON.stringify(carrito))
    })
  }
}

export default vitrina
