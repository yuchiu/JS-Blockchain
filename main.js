const SHA256 = require('crypto-js/sha256')

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index
        this.timestamp = timestamp
        this.data = data
        this.previousHash = previousHash
        this.hash = this.calculateHash()
        this.nonce = 0
    }
    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    
    }
    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty)!==Array(difficulty+1).join("0")){
            this.nonce++
            this.hash = this.calculateHash()
        }
        console.log("Block mined: "+ this.hash)
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()]
        this.difficulty = 4
    }
    createGenesisBlock() {
        return new Block(0, "12/07/2017", "Genesis Block", "0")
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1]
    }
    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash
        newBlock.mineBlock(this.difficulty)
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
console.log('mining block 1...')
yuchiuCoin.addBlock(new Block(1, '12/20/2017', {
    amount: 4
}))
console.log('mining block 2...')
yuchiuCoin.addBlock(new Block(2, '12/21/2017', {
    amount: 11
}))
console.log('mining block 3...')
yuchiuCoin.addBlock(new Block(3, '12/21/2017', {
    amount: 111
}))
console.log('mining block 4...')
yuchiuCoin.addBlock(new Block(4, '12/21/2017', {
    amount: 2
}))

if(yuchiuCoin.isChainValid()){
    console.log('block chain is valid: '+JSON.stringify(yuchiuCoin, null, 4))
}
else{
    console.log('block chain is not valid')
}