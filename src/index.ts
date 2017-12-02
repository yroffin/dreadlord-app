import App from './App'

const port = process.env.PORT || 3000

console.log(`server is listening`)

let app: App = new App();

app.listen(port);
