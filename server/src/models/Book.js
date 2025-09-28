import { model, Schema, Types } from "mongoose";

const bookSchema = new Schema({
    title: {
        type: String
    },
    author: {
        type: String
    },
    pages: {
        type: Number
    },
    description: {
        type: String
    },
    image: { 
        type: String
    },
    genre: {
        type: Array
    },
    ratings: {
        average: { type: Number, default: 0, min:1, max: 5},
        count: {type: Number, default: 0},
        details:[{
            userId: { type: Types.ObjectId, ref: 'User'},
            value: { type: Number,min: 1, max: 5, default: 0}
        }]
    }
})

const Book = model("Book", bookSchema )

export default Book