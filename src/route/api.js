import express from "express";
import userController from "../controller/user-controller.js";
import songController from "../controller/song-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const userRouter = new express.Router();
userRouter.use(authMiddleware);

// User API
userRouter.get('/api/users/current', userController.get);
userRouter.patch('/api/users/current', userController.update);
userRouter.delete('/api/users/logout', userController.logout);

// Song API
userRouter.post('/api/songs', songController.create);
userRouter.get('/api/songs/:songId', songController.get);
userRouter.put('/api/songs/:songId', songController.update);
userRouter.delete('/api/songs/:songId', songController.remove);
userRouter.get('/api/songs', songController.search);

export {
    userRouter
}
