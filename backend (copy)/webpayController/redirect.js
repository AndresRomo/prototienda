
function redirect(url,token){
  const view = `
    <!doctype html>
    <html>
      <head>
        <title>Reenvio</title>
      </head>
      <body>
      <form id="webpay-form" action="${url}" method="post">
        <input type="hidden" name="token_ws" value="${token}">
      </form>
      <script>document.getElementById("webpay-form").submit();</script>
      </body>
    </html>
  `
  return view
}

module.exports = redirect
