import { prismaClient } from "../src/application/database.js";
import bcrypt from "bcrypt";

// User Operations
export const removeTestUser = async () => {
    await prismaClient.user.deleteMany({
        where: {
            username: "test",
        },
    });
};

export const createTestUser = async () => {
    await prismaClient.user.create({
        data: {
            username: "test",
            password: await bcrypt.hash("rahasia", 10),
            name: "test",
            token: "test",
        },
    });
};

export const getTestUser = async () => {
    return prismaClient.user.findUnique({
        where: {
            username: "test",
        },
    });
};

// Song Operations
export const removeAllTestSongs = async () => {
    await prismaClient.song.deleteMany({
        where: {
            username: 'test', // Assuming songs are associated with a user
        },
    });
};

export const createTestSong = async () => {
    await prismaClient.song.create({
        data: {
            username: "test", // Assuming songs are associated with a user
            title: "Test Song",
            artist: "Test Artist",
            album: "Test Album",
            // Add other song fields as needed
        },
    });
};

export const getTestSong = async () => {
    return prismaClient.song.findFirst({
        where: {
            username: 'test', // Assuming songs are associated with a user
        },
    });
};
