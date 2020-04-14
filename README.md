# Adonis.js Electron Starter Project

![Home](https://github.com/bayareawebpro/adonisjs-electron-starter/raw/master/preview.png)


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

> https://adonisjs.com/docs

> https://www.electronjs.org/docs


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
