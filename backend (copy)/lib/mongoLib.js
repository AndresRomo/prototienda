const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

const URI = 'mongodb+srv://andrew:Slashisthe12@platzi-course.k18cy.mongodb.net/platzi?retryWrites=true&w=majority'

class MongoLib{
  constructor(){
    this.client = new MongoClient(URI,{ useUnifiedTopology: true })
    this.db_name = 'protoTienda'
  }
  //--------------------------------------Connect
  connect(){
    if(!this.connection){
      this.connection = new Promise((resolve,reject) =>{
        this.client.connect(err=>{
          if(err){
            reject(err)
          }else{
            console.log('ok db connected')
            resolve()
          }
        })
      })
    }

    return this.connection
  }
  //--------------------------------------getAll
  async getAll(collection='inventario'){
    try
    {
      await this.connect()
      const db = this.client.db(this.db_name)
      const r = await db.collection(collection).find({}).toArray()
      return r
    }catch(error)
    {
      console.log(error)
      return -1
    }
  }
  //--------------------------------------get
  async get(params,collection='inventario'){
    if(params._id){
      params._id = ObjectId(params._id)
    }
    try
    {
      await this.connect()
      const db = this.client.db(this.db_name)
      const r = await db.collection(collection).find(params).toArray()
      return r
    }catch(error)
    {
      console.log(error)
      return -1
    }
  }
  //--------------------------------------create
  async create(item,collection='inventario'){

    try{
      await this.connect()
      const db = this.client.db(this.db_name)
      const r = await db.collection(collection).insertOne(item)
      return r.insertedId

    }catch(err){
      console.log(err)
      return -1
    }

  }
  //--------------------------------------update
  async update(id, item, collection='inventario'){
    try{
      await this.connect()
      const db = this.client.db(this.db_name)
      const r = await db.collection(collection).replaceOne({_id: ObjectId(id)}, item)
      return r

    }catch(err){
      console.log(err)
      return -1
    }
  }
  //--------------------------------------delete
  async delete(id,collection='inventario'){
    try{
      await this.connect()
      const db = this.client.db(this.db_name)
      const r = await db.collection(collection).deleteOne({_id: ObjectId(id)})
      return r
    }catch(err){
      console.log(err)
      return -1
    }
  }
}

module.exports = MongoLib
