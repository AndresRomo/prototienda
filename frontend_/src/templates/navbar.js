
function navbar(){
  $('#navbar').html( `
  <figure>
    <img src="assets/logo.png" alt="logo">
  </figure>
    <nav id='buttons-container'>
      <ul>
        <li><a href="#poleras"><h1 id="buttonPoleras">Poleras</h1></a></li>
        <li><a href="#otros"><h1 id="buttonOtros">Otros</h1></a></li>
      </ul>
    </nav>
    `)
}

export default navbar
