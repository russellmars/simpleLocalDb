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

// add prefix for key, the real key name will renamed by example_key, avoid duplicate key. 
// this statement put front position as possible
simpleLocalDb.setPrefix('example')

// save item
simpleLocalDb.setItem(key, value)

// get item
simpleLocalDb.getItem(key)

// clear all item
simpleLocalDb.clear()

// remove item
simpleLocalDb.removeItem(key)
```
