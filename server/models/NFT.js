const { Schema, model } = require('mongoose');

const nftSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    image:{
        type: String,
        required: true,
    },
});

const NFT = model('Nft', nftSchema);

module.exports = NFT;