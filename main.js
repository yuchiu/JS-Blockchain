const SHA256 = require('crypto-js/sha256')

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index
        this.timestamp = timestamp
        this.data = data
        this.previousHash = previousHash
        this.hash = this.calculateHash()
    }
    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()]
    }
    createGenesisBlock() {
        return new Block(0, "12/07/2017", "Genesis Block", "0")
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1]
    }
    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash
        newBlock.hash = newBlock.calculateHash()
        this.chain.push(newBlock)
    }
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i]
            const previousHash = this.chain[i - 1]
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false
            }
            if (currentBlock.previousHash !== previousHash.hash) {
                return false
            }

        }
        return true
    }
}

let yuchiuCoin = new Blockchain()
yuchiuCoin.addBlock(new Block(1, '12/20/2017', {
    amount: 4
}))
yuchiuCoin.addBlock(new Block(2, '12/21/2017', {
    amount: 11
}))
yuchiuCoin.addBlock(new Block(3, '12/21/2017', {
    amount: 111
}))
yuchiuCoin.addBlock(new Block(4, '12/21/2017', {
    amount: 2
}))

if(yuchiuCoin.isChainValid()){
    console.log(JSON.stringify(yuchiuCoin, null, 4))
}
yuchiuCoin.chain[1].data = {amount: 100}

if(yuchiuCoin.isChainValid()){
    console.log(JSON.stringify(yuchiuCoin, null, 4))
}