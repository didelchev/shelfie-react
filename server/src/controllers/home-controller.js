import { Router } from "express";

const homeController = Router()


homeController.get("/", (req, res) => {
    res.send('This is the home controller.')
})


export default homeController