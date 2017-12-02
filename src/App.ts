import * as express from 'express';
import HelloWorld from './hello/hello-world';

class App {
  public express: any;

  constructor () {
    this.express = express();
    new HelloWorld(this.express);
  }

  listen(port: number): void {
    this.express.listen(port, (err) => {
      if (err) {
        return console.log(err)
      }
    
      return console.log(`server is listening on ${port} ...`)
    });
  }
}

export default App
