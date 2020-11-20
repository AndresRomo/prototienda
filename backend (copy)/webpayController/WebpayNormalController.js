
const mongoLib = require('../lib/mongoLib')
const Transbank = require("transbank-sdk")
const redirect = require('./redirect')

const webpayfinish_view = require('../templates/webpayfinish')

const transactions = {}

myMongo = new mongoLib()

class WebpayPlusController {
  static async init (req, res) {
    req.body.status = 0
    const id = await myMongo.create(req.body, 'pedidos')
    if(id ==-1){
      res.send('error conectando a la base de datos')
      return -1
    }


    const configuration = Transbank.Configuration.forTestingWebpayPlusNormal()
    let Webpay = new Transbank.Webpay(configuration).getNormalTransaction()
    let url = "http://" + req.get("host")
    let amount = req.body.amount

    Webpay.initTransaction(
      amount,
      `${id}`,
      "asd",
      url + "/webpayresponse",
      url + "/webpayfinish").then((data) => {
      transactions[data.token] = { amount: amount }
      res.send(redirect(data.url, data.token, "token_ws"))
    })

  }

  static async response (req, res) {
    // Esta inicialización que se repite, es mejor llevarla a nu lugar en donde
    // se pueda reutilizar. Por simplicidad, en este ejemplo está el código
    // duplicado en cada método
    const configuration = Transbank.Configuration.forTestingWebpayPlusNormal()
    let Webpay = new Transbank.Webpay(configuration).getNormalTransaction()

    let token = req.body.token_ws

    Webpay.getTransactionResult(token).then(async response => {
      transactions[token] = response
      let item = await myMongo.get({'_id': response.buyOrder}, 'pedidos')
      item = item[0]
      item.status = 1
      const id = item._id
      delete item._id
      const update = await myMongo.update(id,item,'pedidos')

      res.send(redirect(response.urlRedirection, token, "token_ws"))

    }).catch((e) => {
      console.log(e, `id: ${id}` )
      res.send("Error")
    })
  }

  static finish (req, res) {
    let status = null;
    let transaction = null;

    // Si se recibe TBK_TOKEN en vez de token_ws, la compra fue anulada por el usuario
    if (typeof req.body.TBK_TOKEN !== "undefined") {
      status = 'ABORTED';
    }

    if (typeof req.body.token_ws !== "undefined") {
      transaction = transactions[req.body.token_ws];
      if (transaction.detailOutput[0].responseCode === 0) {
        status = 'AUTHORIZED';
      } else {
        status = 'REJECTED';
      }
    }

    // Si no se recibió ni token_ws ni TBK_TOKEN, es un usuario que entró directo
    if (status === null) {
      return res.status(404).send("Not found.");
    }

    if(status == 'AUTHORIZED') {
        res.send(webpayfinish_view(transaction.buyOrder))
    }
    else{

      res.send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title></title>
        </head>
        <body>
        <script type='text/javascript'>
        document.location='/'
        </script>
        </body>
        </html>
`)
    }



  }
}

module.exports = WebpayPlusController
