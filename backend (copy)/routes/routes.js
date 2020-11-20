const mongoLib  = require('../lib/mongoLib')
const webpayController = require('../webpayController/WebpayNormalController')
const path = require('path')

myMongo = new mongoLib()

function routes_(app){

  app.get('/', (req,res) =>{

      res.sendFile(path.join(__dirname, '/../dist/index.html'))
})

  app.get('/API', async (req,res) =>{                                               //inventory operations
    let items = await myMongo.getAll()
    res.json({"items": items})
  })

  app.post('/API/find', async (req,res) =>{
    let items = await myMongo.get(req.body)
    res.json({"items": items})
  })

  app.post('/API',async (req,res) =>{
    let _id = await myMongo.create(req.body)
    let response_json = {code:1}
    if( _id == -1){
      response_json.code = 0
    }
    res.json(response_json)
  })
  app.patch('/API', async (req,res)=>{
    let _id = req.body._id
    delete req.body._id
    let response_db = await myMongo.update(_id, req.body)
    let response_json = {code: 1}
    if(response_db == -1 || response_db.modifiedCount==0 ){
      response_json.code = 0
    }
    res.json(response_json)
  })
  app.delete('/API', async (req,res)=>{
    let response_db = await myMongo.delete(req.body._id)
    let response_json = {code:1}
    if(response_db == -1 || response_db.deletedCount == 0){
      response_json.code = 0
    }
    res.json(response_json)
  })                                                                                // webpay
  app.post('/webpayinit', webpayController.init)
  app.post('/webpayresponse', webpayController.response)
  app.post('/webpayfinish', webpayController.finish)

                                                                                   // pedidos
  app.post('/API/pedidos', async (req,res)=>{
    let pedidos = await myMongo.get({'status': 1}, 'pedidos')
    res.json({'pedidos': pedidos})
  })
  app.patch('/API/pedidos', async (req,res) => {
    let _id = req.body._id
    delete req.body._id
    let response_db = await myMongo.update(_id, req.body,'pedidos')
    let response_json = {code: 1}
    if(response_db == -1 || response_db.modifiedCount==0 ){
      response_json.code = 0
    }
    res.json(response_json)
  })
}

module.exports = routes_
