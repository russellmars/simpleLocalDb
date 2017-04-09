# simpleLocalDb

> simpleLocalDb is a local data store with localStorage and cookie

## Installation

``` bash
# install dependencies
npm install simple-local-db --save
```

## Getting started
``` javascript
import 'simple-local-db'

// 给key添加前缀，避免同域名下的key值重复. 
// 应尽可能的把设置前缀的语句往前放
simpleLocalDb.setPrefix('example')

// 保存一个key-value
simpleLocalDb.setItem(key, value)

// 获取key对应的value
simpleLocalDb.getItem(key)

// 清空所有的存值
simpleLocalDb.clear()

// 移除某一项
simpleLocalDb.removeItem(key)
```
