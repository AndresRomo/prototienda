
const URL = '/API'
//const URL = 'https://prototienda.herokuapp.com/API'

const crud = {
  create: item =>{
    $.ajax({
      type: "POST",
      crossDomain: true,
      url: URL,
      data: JSON.stringify(item ),
      success: (response)=>{
        if(!response.code){
          swal({
            text: 'Error subiendo el producto',
            icon: 'error',
            timer: 1900,
            button: false
          })
        }else{
          swal({
            text: 'Producto subido',
            icon: 'success',
            timer: 1900,
            button: false
          })
          $('#name').val('')
          $('#description').val('')
          $('#type').val('polera')
          $('#price').val('')
          $('#image').val('')

        }
      },
      contentType: 'application/json',
      dataType: 'json'
    })
  },

  edit: (new_item)=>{
    $.ajax({
      type: "PATCH",
      crossDomain: true,
      url: URL,
      data: JSON.stringify(new_item),
      success: (response)=>{
        if(!response.code){
          swal({
            text: 'Error modficando el producto',
            icon: 'error',
            timer: 1900,
            button: false
          })
        }else{
          swal({
            text: 'Producto modificado correctamente',
            icon: 'success',
            timer: 1900,
            button: false
          })
        }
      },
      contentType: 'application/json',
      dataType: 'json'
    })
  },

  delete: (item)=>{
    $.ajax({
      type: "DELETE",
      crossDomain: true,
      url: URL,
      data: JSON.stringify(item),
      success: (response)=>{
        if(!response.code){
          swal({
            text: 'No se ha podido eliminar el producto',
            icon: 'error',
            timer: 1900,
            button: false
          })
        }else{
          swal({
            text: 'Producto eliminado correctamente',
            icon: 'success',
            timer: 1900,
            button: false
          })
          setTimeout(()=>{
            location.reload()
          }, 2000)
        }
      },
      contentType: 'application/json',
      dataType: 'json'
    })
  },
  get: async (filter)=>{

    return new Promise((resolve, reject) => {
      $.ajax({
        type: "POST",
        crossDomain: true,
        url: URL + '/find',
        data: JSON.stringify(filter),
        success: (response)=>{
          resolve(response)
        },
        contentType: 'application/json',
        dataType: 'json'
      })

    })
  },

  pedidos: async ()=>{
      return new Promise((resolve, reject) => {
        $.ajax({
          type: 'POST',
          crossDomain: true,
          url: URL + '/pedidos',
          success: (response)=>{
            resolve(response)
          },
          dataType: 'json'
        })
      })
  },
  finalizarPedido: async new_item=>{
    console.log(new_item)
    $.ajax({
      type: "PATCH",
      crossDomain: true,
      url: URL + '/pedidos',
      data: JSON.stringify(new_item),
      success: (response)=>{
        if(!response.code){
          swal({
            text: 'No se ha podido finalizar el pedido',
            icon: 'error',
            timer: 1900,
            button: false
          })
        }else{
          swal({
            text: 'Producto finalizado',
            icon: 'success',
            timer: 1900,
            button: false
          })
          setTimeout(()=>{
            location.reload()
          }, 2000)
        }
      },
      contentType: 'application/json',
      dataType: 'json'
    })
  }
}


export default crud
