import songService from "../service/song-service.js";
import { logger } from "../application/logging.js";

const create = async (req, res, next) => {
    try {
        const user = req.user;
        const request = req.body;
        const result = await songService.create(user, request);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e);
    }
}

const get = async (req, res, next) => {
    try {
        const user = req.user;
        const songId = req.params.songId;
        const result = await songService.get(user, songId);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e);
    }
}

const update = async (req, res, next) => {
    try {
        const user = req.user;
        const songId = req.params.songId; // corrected variable name
        const request = req.body;
        request.id = songId; // corrected variable name

        const result = await songService.update(user, request);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e);
    }
}

const remove = async (req, res, next) => {
    try {
        const user = req.user;
        const songId = req.params.songId;

        await songService.remove(user, songId);
        res.status(200).json({
            data: "OK"
        })
    } catch (e) {
        next(e);
    }
}

const search = async (req, res, next) => {
    try {
        const user = req.user;
        const request = {
            name: req.query.name,
            email: req.query.email,
            phone: req.query.phone,
            page: req.query.page,
            size: req.query.size
        };

        const result = await songService.search(user, request);
        res.status(200).json({
            data: result.data,
            paging: result.paging
        });
    } catch (e) {
        next(e);
    }
}

export default {
    create,
    get,
    update,
    remove,
    search
}
