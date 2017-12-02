import * as express from 'express';

class HelloWorld {

  constructor (exp: any) {
    let router = express.Router();
    router.get('/', (req, res) => {
      res.json({
        message: 'Hello World!!!'
      })
    })
    exp.use('/', router)
  }
}

export default HelloWorld