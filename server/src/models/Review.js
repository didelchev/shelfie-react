import { model, Schema, Types } from "mongoose";

const reviewSchema = new Schema({
    bookId: {
        type: Types.ObjectId,
        ref: 'Books'
    },
    userEmail: {
        type: String,
        required: true

    },
    review: {
        type: String,
        required: true

    }
})

const Review = model('Review', reviewSchema)

export default Review