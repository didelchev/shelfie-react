import Book from "../models/Book.js";
import User from "../models/User.js";


const getTopGenre = (readBooks) => {
    const genreCounts = {};

    readBooks.forEach(book => {
        book.genre.forEach(g => {
            genreCounts[g] = (genreCounts[g] || 0) + 1;
        });
    });

}

const getRecommendations = async (req, res, next) =>{
    const userId = req.params.userId
    const recBooksCount = 5;


    try {
        const user = await User.findById(userId).lean();

        console.log(user)

        if(!user){
            return res.status(404).json({message: "User not found !"});
        }

        const readBooks = await Book.find({ _id: { $in: user.read } }).lean();

        const topGenre = getTopGenre(readBooks);

        const excludedIds = [...user.read, ...user.currReading, ...user.toRead]

       const recommendations = await Book.find({
            _id: { $nin: excludedIds },
            genres: topGenre 
        })
        .limit(recBooksCount)
        .lean();

        req.recommendations = recommendations;
        next();



    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export default getRecommendations;