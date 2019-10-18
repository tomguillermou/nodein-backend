import { Request, Response } from "express";

import Message from "./model";
import User from "../User/model";

import { handleErrorReponse } from "../../core/errors";
import errorMessage from "../../config/errors/messages.json";

export async function createOne(req: Request, res: Response) {

    try {
        const receiverId = req.body.receiverId;
        const content = req.body.content;

        // Check if receiver exists
        const receiver = await User.findById(receiverId).exec();

        if (receiver === null) {
            throw new Error(errorMessage.userDoesNotExist);
        }

        const message = new Message({
            owner: req.authUser._id,
            receiver: receiverId,
            content
        });

        await message.save();

        res.json({ create: "done" });

    } catch (error) {
        handleErrorReponse(res, error);
    }
}

export async function readMany(req: Request, res: Response) {

    try {
        const ownerId = req.authUser._id;
        const receiverId = req.query.receiverId;

        const messages = await Message.find()
            .where("owner").equals(ownerId)
            .where("receiver").equals(receiverId)
            .exec();

        res.json({ data: messages });

    } catch (error) {
        handleErrorReponse(res, error);
    }
}