# Adonis.js Electron Starter Project

### Installation
```js
npm install
npm run install
npm run serve
```

### Compile
```js
npm run compile
```

> Edit ./build/build.sh for compiler options.


- https://www.electronjs.org/docs
- https://adonisjs.com/docs
- https://adonisjs.com/docs/4.1/websocket-client
-  https://github.com/steelbrain/node-ssh

### Shell Service

```javascript
const {exec} = require('../Services/Shell')
exec('ls ./',
    (stdout)=>{},
    (stderr)=>{}
)
.then(()=>{
  //
})
.catch((code)=>{
  //
})
```

### SSH Package

```
ssh.connect({
  host: host,
  port: port,
  username: user,
  privateKey: fs.readFileSync(key, 'utf8')
})
.then(() => {
  return ssh.exec(command, [], {
    cwd: cwd,
    onStdout: (chunk) => {
      Logger.info('onStdout',output)
    },
    onStderr: (chunk) =>{
      Logger.error('onStderr',output)
    },
  })
})
.catch((error)=>{
  Logger.error(error.toString())
})
```
