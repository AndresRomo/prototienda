
import navbar2 from './navbar2'
import crud from '../crud/crud'

async function search(_id){
  const items = await crud.get({'_id': _id})
  return items.items[0]
}

async function edit(){

  navbar2()

  let id = location.hash.split('=')[1]
  let item = await search(id)
                                                                                               //dibujar valores iniciales
  $('#main').html(`
    <div id='edit-item'>
      <div id='edit-name-container' class='edit-camp'><h3 id=''>${item.name}</h3></div>
      <div id='edit-image-container' class='edit-camp'><img src="${item.img}"></div>
      <div id='edit-description-container' class='edit-camp'><p>${item.description}</p></div>
      <div id='edit-price-container' class='edit-camp'><h5>${item.price}</h5></div>
      <div>
        <i id='send-changes' class="far fa-check-circle"></i>
      </div>
    </div>
    `)

    $('#edit-name-container').click(()=>{                                                             //cambiar texto por input
        $('#edit-name-container').html(`<input type='text' value='${item.name}' id='new-name'>`)
        $('#edit-name-container').unbind()
    })
    $('#edit-image-container').click(()=>{
        $('#edit-image-container').html(`<input type='text' value='${item.image}' id='new-image'>`)
        $('#edit-image-container').unbind()
    })
    $('#edit-description-container').click(()=>{
        $('#edit-description-container').html(`<textarea rows=5 cols=40 id='new-description'>${item.description}</textarea>`)
        $('#edit-description-container').unbind()
    })
    $('#edit-price-container').click(()=>{
        $('#edit-price-container').html(`<input type='text' value='${item.price}' id='new-price'>`)
        $('#edit-price-container').unbind()
    })

    $('#send-changes').click(()=>{                                                              //enviar cambios a la API
      let new_item = {
        _id: item._id,
        type: item.type,
        name: $('#new-name').val() || item.name,
        img: $('#new-image').val() || item.img,
        description: $('#new-description').val() || item.description,
        price: $('#new-price').val() || item.price
      }

      if(isNaN(new_item.price) || !Number.isInteger(Number(new_item.price)) || Number(new_item.price)<0 || new_item.price==''){
        swal({
          text: "El precio ingresado debe ser un numero entero mayor a cero",
          icon: "error",
          timer: 1500
        })
        return ;
      }
      console.log(new_item)

      crud.edit(new_item)

    })

}

export default edit
