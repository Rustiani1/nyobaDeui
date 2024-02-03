import Joi from "joi";

const createSongValidation = Joi.object({
    title: Joi.string().max(100).required(),
    artist: Joi.string().max(100).optional(),
    duration: Joi.string().max(20).optional()
});

const getSongValidation = Joi.number().positive().required();

const updateSongValidation = Joi.object({
    id: Joi.number().positive().required(),
    title: Joi.string().max(100).required(),
    artist: Joi.string().max(100).optional(),
    duration: Joi.string().max(20).optional()
});

const searchSongValidation = Joi.object({
    page: Joi.number().min(1).positive().default(1),
    size: Joi.number().min(1).positive().max(100).default(10),
    title: Joi.string().optional(),
    artist: Joi.string().optional(),
    duration: Joi.string().optional()
})

export {
    createSongValidation,
    getSongValidation,
    updateSongValidation,
    searchSongValidation
}
