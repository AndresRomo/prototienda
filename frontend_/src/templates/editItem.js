
import navbar2 from './navbar2'
import crud from '../crud/crud'

function renderFound(items){
  let results_div = $('#results')
  results_div.html('')
  items.forEach(item =>{
    let item_article = $(`
      <article class='item'>
        <div>${item._id}</div>
        <div><h3>${item.name}</h3></div>
        <div><img src="${item.img}"></div>
        <div><p>${item.description}</p></div>
        <div><h5>${item.price}</h5></div>
        <div>
          <a href='#edit?id=${item._id}'><i class="fas fa-edit"></i></a>
          <a id='delete-${item._id}'><i class="fas fa-ban"></i></a>
        </div>
      </article>
      `)
    results_div.append(item_article)


    $(`#delete-${item._id}`).click(()=>{
      swal({
        text: "¿Desea eliminar el producto?",
        icon: 'warning',
        buttons: {
          sip: {text: 'Eliminalo', value: true, className: 'myButton-black'},
          nop: {text: 'Mejor no', value: false, className: 'myButton-wheat'}
        }
      }).then(value=>{
        if(value){
            crud.delete({"_id": item._id})
        }
      })

    })

  })
}

async function editItem(){
  navbar2()

  let items = await crud.get({})

  $('#main').html(`
    <div id="edit-container">
      <div id='search'>
        <input type='text' id='search-input' placeholder='id'>
        <input type='button' id='search-id-button' value='Buscar id'>
        <input type='button' id='search-all-button' value='Buscar todos'>
      </div>
      <div id='results'>
      </div>
    </div>
    `)

  renderFound(items.items)

  $('#search-id-button').click(async () =>{
    let items_ = await crud.get({"_id": $('#search-input').val()})
    renderFound(items_.items)
  })
  $('#search-all-button').click(async () =>{
    let items_ = await crud.get({})
    renderFound(items_.items)
  })

}

export default editItem
