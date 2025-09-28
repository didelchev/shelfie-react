import { Router } from "express";
import { addToBookList, getAll, getOne } from "../services/book-service.js";
import { getUserById } from "../services/user-service.js";
import { Types } from 'mongoose';
import User from "../models/User.js";

const catalogController = Router();


catalogController.get("/", (req, res) => {
  getAll()
    .then(data => res.json(data))
    .catch(err => {
      res.status(500).json({
        message: 'Failed to fetch books',
        error: err.message
      })
    })
  
});


catalogController.get("/:bookId", (req, res) => {
  let id = req.params.bookId

  getOne(id)
    .then(data => {
      if(!data){
        return res.status(404).json({ message: 'Book not found !'})
      }
      res.json(data)
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to fetch book",
        error: err.message
      })
    })

});

catalogController.post("/:bookId", async (req, res) => {
  const bookId = req.params.bookId
  const userId = req.user._id
  const requestList = req.body.shelf


try {
  await addToBookList(userId, bookId, requestList)
  res.json({message: 'Book has been successfully added !'})
} catch (error) {
  res.status(400).json({message: error.message})
}

})


catalogController.patch("/:bookId", async (req, res) => {
  const bookId = req.params.bookId
  const { shelfType } = req.body;
  const userId = req.user._id;
  console.log(userId)
  
  

    if (!['read', 'toRead', 'currReading'].includes(shelfType)) {
    return res.status(400).json({ message: 'Invalid shelf.' });
  }

  try {
    const update = { $pull: { [shelfType]: new Types.ObjectId(bookId) } };

    await User.findByIdAndUpdate(userId, update);
    

    res.json({ message: 'Book removed.' });

  } catch (err) {
    console.error("❌ Failed to remove book:", {
    message: err.message,
    name: err.name,
    stack: err.stack,
    error: err,
  });

    res.status(500).json({ message: 'Failed to remove book.', error: err.message });
  }
})

export default catalogController;
