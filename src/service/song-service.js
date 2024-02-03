import { validate } from "../validation/validation.js";
import {
    createSongValidation,
    getSongValidation,
    searchSongValidation,
    updateSongValidation
} from "../validation/song-validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

const create = async (user, request) => {
    const song = validate(createSongValidation, request);
    song.username = user.username;

    return prismaClient.song.create({
        data: song,
        select: {
            id: true,
            title: true,
            artist: true,
            duration: true
        }
    });
}

const get = async (user, songId) => {
    songId = validate(getSongValidation, songId);

    const song = await prismaClient.song.findFirst({
        where: {
            username: user.username,
            id: songId
        },
        select: {
            id: true,
            title: true,
            artist: true,
            duration: true
        }
    });

    if (!song) {
        throw new ResponseError(404, "Song is not found");
    }

    return song;
}

const update = async (user, request) => {
    const song = validate(updateSongValidation, request);

    const totalSongsInDatabase = await prismaClient.song.count({
        where: {
            username: user.username,
            id: song.id
        }
    });

    if (totalSongsInDatabase !== 1) {
        throw new ResponseError(404, "Song is not found");
    }

    return prismaClient.song.update({
        where: {
            id: song.id
        },
        data: {
            title: song.title,
            artist: song.artist,
            duration: song.duration
        },
        select: {
            id: true,
            title: true,
            artist: true,
            duration: true
        }
    });
}

const remove = async (user, songId) => {
    songId = validate(getSongValidation, songId);

    const totalInDatabase = await prismaClient.song.count({
        where: {
            username: user.username,
            id: songId
        }
    });

    if (totalInDatabase !== 1) {
        throw new ResponseError(404, "Song is not found");
    }

    return prismaClient.song.delete({
        where: {
            id: songId
        }
    });
}

const search = async (user, request) => {
    request = validate(searchSongValidation, request);

    const skip = (request.page - 1) * request.size;

    const filters = [{
        username: user.username
    }];

    if (request.title) {
        filters.push({
            title: {
                contains: request.title
            }
        });
    }
    if (request.artist) {
        filters.push({
            artist: {
                contains: request.artist
            }
        });
    }
    if (request.duration) {
        filters.push({
            duration: {
                contains: request.duration
            }
        });
    }

    const songs = await prismaClient.song.findMany({
        where: {
            AND: filters
        },
        take: request.size,
        skip: skip
    });

    const totalItems = await prismaClient.song.count({
        where: {
            AND: filters
        }
    });

    return {
        data: songs,
        paging: {
            page: request.page,
            total_item: totalItems,
            total_page: Math.ceil(totalItems / request.size)
        }
    };
}

export default {
    create,
    get,
    update,
    remove,
    search
};
