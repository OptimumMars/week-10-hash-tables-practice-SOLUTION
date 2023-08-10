const sha256 = require('js-sha256');

class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable {

  constructor(numBuckets = 4) {
    this.count = 0
    this.capacity = numBuckets
    this.data = new Array(this.capacity).fill(null)
  }

  hash(key) {
    let hashString = sha256(key).slice(0, 8)

    return parseInt(hashString, 16)
  }

  hashMod(key) {
    return this.hash(key) % this.capacity;
  }

  insertNoCollisions(key, value) {
    let index = this.hashMod(key);

    if (!this.data[index]) {
      this.data[index] = new KeyValuePair(key, value);
      this.count++
    } else {
      throw Error('hash collision or same key/value pair already exists!')
    }

  }

  insertWithHashCollisions(key, value) {
    let index = this.hashMod(key);
    let newPair = new KeyValuePair(key, value);

    if (!this.data[index]) {
      this.data[index] = newPair;
    } else {
      newPair.next = this.data[index];
      this.data[index] = newPair
    }
    this.count++;
  }

  insert(key, value) {
    let index = this.hashMod(key);
    let oldPair = this.data[index];

    while (oldPair && oldPair.key !== key) {
      oldPair = oldPair.next;
    }

    if (oldPair) {
      oldPair.value = value;
    } else {
      let newPair = new KeyValuePair(key, value);

      if (!this.data[index]) {
        this.data[index] = newPair;
      } else {
        newPair.next = this.data[index];
        this.data[index] = newPair;
      }

      this.count++
    }

    // Edward's Solution
    // let newHash = new KeyValuePair(key, value);

    // let spot = this.hashMod(key);

    // if (!this.data[spot]) {
    //   this.data[spot] = newHash;
    //   this.count++;
    // }
    // else {
    //   let currentKey = this.data[spot]
    //   while (currentKey) {
    //     if (currentKey.key === newHash.key) {
    //       currentKey.value = newHash.value;
    //       return;
    //     }
    //     currentKey = currentKey.next;
    //   }
    //   newHash.next = this.data[spot];
    //   this.data[spot] = newHash;
    //   this.count++;
    // }

  }

}


module.exports = HashTable;
