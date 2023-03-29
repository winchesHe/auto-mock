# @winches/auto-mock

约定式路由mock工具

## ⭐️ Feature
✅ Auto get mock route (自动获取mock路径)

✅ Hot Update 热更新支持（检测mock路径和配置文件）

✅ Dynamics routes 支持动态路由

✅ Contractual routing 约定式路由（文件路径 -> 路由路径）

🤖 Easy to get params（更简易的获取请求参数）

⚡ Faster response build with fastify（更快的响应速度）

## Install
```sh
npm i @winches/auto-mock -D
# or
yarn add @winches/auto-mock -D
# or
pnpm add @winches/auto-mock -D
```

## Usage
### Add script
```json
"scripts": {
  "mock": "auto-mock"
},
```

### Create a `mock.config.c?js` file set some config
```js
module.exports = {
  // default option value
  mockPath: '__mock__', // mock文件路径
  watch: false, // 是否热更新
  port: 5050, // 端口号
}
```

### Run script
```sh
npm run mock
```

### Run script with options
#### Watch mode
```sh
auto-mock -w
```

### Set port
```sh
auto-mock -p 8080
```

### Create a file under the `__mock__` folder
#### For instance
```
└── your mockPath（__mock__）
  │
  └──  hello
    │
    └──  index.js
```

and the http request will be transform `http://<host>:<port>/hello/index`

**index.js exports a function** it receive three parameters and the fn result is response

#### For instance
```js
// hello/index.js
module.exports = function(req, query, body) {
  // response result
  return {
    code: 0,
    msg: 'success',
    req,
    query,
    body
  }
}
```
### Dynamics Routes（动态路由）
#### For instance
```
└── your mockPath（__mock__）
  │
  └──  hello
    │
    └──  test:id.js
```
the http request will be transform `http://<host>:<port>/hello/test:id`

and when send a request `http://<...>/hello/test/1`
```js
// hello/test:id.js
module.exports = function(req, query, body) {
  // response result
  return {
    code: 0,
    msg: 'success',
    res: req.params // { id: 1 }
  }
}
```

> note: **node require 14+**