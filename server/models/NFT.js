const { Schema, model } = require('mongoose');
//dd
const nftSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    discount: {
        type: Number
    },
    image:{
        type: String,
        required: true,
    },
});

const Nft = model('Nft', nftSchema);

module.exports = Nft;