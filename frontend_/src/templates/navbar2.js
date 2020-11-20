function navbar2(){
  $('#navbar').html(`
  <figure>
    <img src="assets/logo.png" alt="logo">
  </figure>
    <nav id='buttons-container'>
      <ul>
        <li><a href="#additem"><h3 id="buttonOtros">Agregar Producto</h3></a></li>
        <li><a href="#edititem"><h3 id="buttonPoleras">Editar producto</h3></a></li>
        <li><a href="#pedidos"><h3 id="buttonOtros">Ver pedidos</h3></a></li>
      </ul>
    </nav>
    `)
}

export default navbar2
