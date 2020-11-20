
import navbar2 from './navbar2'
import crud from '../crud/crud'

function addItem(){
  navbar2()
  $('#main').html(`

    <div id='addForm'>
      <h2>Añadir producto</h2>
      <input type="text" id='name' class='form' placeholder='Nombre del producto'>
      <textarea id='description' class='form' placeholder='Breve descripcion del producto'></textarea>
      <select id='type'>
        <optgroup label='Categoria'>
          <option value='polera'>Poleras</option>
          <option value='otros'>Otros</otros>
        </optgroup>
      </select>
      <input type="text" id='price' class='form' placeholder='Precio'>
      <input type="text" id='image' class='form' placeholder='Link de la fotografia'>
      <input type="button" class='form' value="Añadir producto" id="send"></input>
    </div>
    `)

  $('#send').click(()=>{

    let name = $('#name').val()
    let description = $('#description').val()
    let type = $('#type').val()
    let price = $('#price').val()
    let img = $('#image').val()

    if(isNaN(price) || !Number.isInteger(Number(price)) || Number(price)<0 || price==''){
      swal({
        text: "El precio ingresado debe ser un numero entero mayor a cero",
        icon: "error",
        timer: 1500
      })
      return ;
    }


    let item_data = {
      name: name,
      description: description,
      type: type,
      price: price,
      img: img
    }


    crud.create(item_data)


  })

}

export default addItem
