import {
    createManyTestSongs,
    createTestSong,
    createTestUser,
    getTestSong,
    removeAllTestSongs,
    removeTestUser
} from "./test-util.js";
import supertest from "supertest";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";

describe('POST /api/songs', function () {
    beforeEach(async () => {
        await createTestUser();
    })

    afterEach(async () => {
        await removeAllTestSongs();
        await removeTestUser();
    })

    it('should can create new song', async () => {
        const result = await supertest(web)
            .post("/api/songs")
            .set('Authorization', 'test')
            .send({
                title: "test",
                artist: "test",
                duration: "3:30"
            });

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.title).toBe("test");
        expect(result.body.data.artist).toBe("test");
        expect(result.body.data.duration).toBe("3:30");
    });

    it('should reject if request is not valid', async () => {
        const result = await supertest(web)
            .post("/api/songs")
            .set('Authorization', 'test')
            .send({
                title: "",
                artist: "test",
                duration: "3:30"
            });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });
});

describe('GET /api/songs/:songId', function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestSong();
    })

    afterEach(async () => {
        await removeAllTestSongs();
        await removeTestUser();
    })

    it('should can get song', async () => {
        const testSong = await getTestSong();

        const result = await supertest(web)
            .get("/api/songs/" + testSong.id)
            .set('Authorization', 'test');

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBe(testSong.id);
        expect(result.body.data.title).toBe(testSong.title);
        expect(result.body.data.artist).toBe(testSong.artist);
        expect(result.body.data.duration).toBe(testSong.duration);
    });

    it('should return 404 if song id is not found', async () => {
        const testSong = await getTestSong();

        const result = await supertest(web)
            .get("/api/songs/" + (testSong.id + 1))
            .set('Authorization', 'test');

        expect(result.status).toBe(404);
    });
});

describe('PUT /api/songs/:songId', function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestSong();
    })

    afterEach(async () => {
        await removeAllTestSongs();
        await removeTestUser();
    })

    it('should can update existing song', async () => {
        const testSong = await getTestSong();

        const result = await supertest(web)
            .put('/api/songs/' + testSong.id)
            .set('Authorization', 'test')
            .send({
                title: "New Title",
                artist: "New Artist",
                duration: "4:30"
            });

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBe(testSong.id);
        expect(result.body.data.title).toBe("New Title");
        expect(result.body.data.artist).toBe("New Artist");
        expect(result.body.data.duration).toBe("4:30");
    });

    it('should reject if request is invalid', async () => {
        const testSong = await getTestSong();

        const result = await supertest(web)
            .put('/api/songs/' + testSong.id)
            .set('Authorization', 'test')
            .send({
                title: "",
                artist: "",
                duration: ""
            });

        expect(result.status).toBe(400);
    });

    it('should reject if song is not found', async () => {
        const testSong = await getTestSong();

        const result = await supertest(web)
            .put('/api/songs/' + (testSong.id + 1))
            .set('Authorization', 'test')
            .send({
                title: "New Title",
                artist: "New Artist",
                duration: "4:30"
            });

        expect(result.status).toBe(404);
    });
});

describe('DELETE /api/songs/:songId', function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestSong();
    })

    afterEach(async () => {
        await removeAllTestSongs();
        await removeTestUser();
    })

    it('should can delete song', async () => {
        let testSong = await getTestSong();
        const result = await supertest(web)
            .delete('/api/songs/' + testSong.id)
            .set('Authorization', 'test');

        expect(result.status).toBe(200);
        expect(result.body.data).toBe("OK");

        testSong = await getTestSong();
        expect(testSong).toBeNull();
    });

    it('should reject if song is not found', async () => {
        let testSong = await getTestSong();
        const result = await supertest(web)
            .delete('/api/songs/' + (testSong.id + 1))
            .set('Authorization', 'test');

        expect(result.status).toBe(404);
    });
});

describe('GET /api/songs', function () {
    beforeEach(async () => {
        await createTestUser();
        await createManyTestSongs();
    })

    afterEach(async () => {
        await removeAllTestSongs();
        await removeTestUser();
    })

    it('should can search without parameter', async () => {
        const result = await supertest(web)
            .get('/api/songs')
            .set('Authorization', 'test');

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(10);
        expect(result.body.paging.page).toBe(1);
        expect(result.body.paging.total_page).toBe(2);
        expect(result.body.paging.total_item).toBe(15);
    });

    it('should can search to page 2', async () => {
        const result = await supertest(web)
            .get('/api/songs')
            .query({
                page: 2
            })
            .set('Authorization', 'test');

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(5);
        expect(result.body.paging.page).toBe(2);
        expect(result.body.paging.total_page).toBe(2);
        expect(result.body.paging.total_item).toBe(15);
    });

    it('should can search using title', async () => {
        const result = await supertest(web)
            .get('/api/songs')
            .query({
                title: "test 1"
            })
            .set('Authorization', 'test');

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(6);
        expect(result.body.paging.page).toBe(1);
        expect(result.body.paging.total_page).toBe(1);
        expect(result.body.paging.total_item).toBe(6);
    });

    it('should can search using artist', async () => {
        const result = await supertest(web)
            .get('/api/songs')
            .query({
                artist: "artist 1"
            })
            .set('Authorization', 'test');

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(6);
        expect(result.body.paging.page).toBe(1);
        expect(result.body.paging.total_page).toBe(1);
        expect(result.body.paging.total_item).toBe(6);
    });

    it('should can search using duration', async () => {
        const result = await supertest(web)
            .get('/api/songs')
            .query({
                duration: "3:30"
            })
            .set('Authorization', 'test');

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(6);
        expect(result.body.paging.page).toBe(1);
        expect(result.body.paging.total_page).toBe(1);
        expect(result.body.paging.total_item).toBe(6);
    });
});
