

function webpayfinish(id){
  const view =  `
  <!DOCTYPE html>
  <html lang="en" dir="ltr">
    <head>
      <meta charset="utf-8">
      <title>Compra exitosa</title>
      <style media="screen">
        body{
          display: flex;
        }
        #container{
          background: antiquewhite;
          padding: 10px;
          border: 1px solid black;
          display: flex;
          flex-direction: column;
        }
      </style>
    </head>
    <body>
      <div id='container'>
        <h1>Gracias por su compra</h1>
        <h3>Su numero de orden es ${id}</h3>
        <h4>Nos pondemos en contacto con usted para confirmar el pedido</h4>
      </div>
    </body>
  </html>

  `
  return view
}

module.exports = webpayfinish
