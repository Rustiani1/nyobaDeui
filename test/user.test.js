import supertest from "supertest";
import { web } from "../src/application/web.js";
import { prismaClient } from "../src/application/database.js";

describe('POST /api/users', function() {

    afterEach(async () => {
        await prismaClient.user.deleteMany({
            where: {
                username: "Rusti"
            }
        });
    });

    it('should can register new user', async () => {
        const result = await supertest(web)
            .post('/api/users')
            .send({
                username: 'Rusti',
                password: 'rahasia',
                name: 'Yuni'
            });

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("Rusti");
        expect(result.body.data.name).toBe("Yuni");
        expect(result.body.data.password).toBeUndefined();
    });
});
