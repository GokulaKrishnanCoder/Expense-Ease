import {Schema, model} from 'mongoose';
const transactionSchema = new Schema({
    title:{
        type: String,
        required: true  
    },
    amount:{
        type: Number,
        required: true
    },
    type:{
        type: String,
        enum: ['income', 'expense'],
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }});
const Transaction = model('Transaction', transactionSchema);

export default Transaction;
