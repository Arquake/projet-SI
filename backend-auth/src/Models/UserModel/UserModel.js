import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

async function createUser(username, email, password) {
    try {
        return await prisma.user.create({
            data: {
                username: username,
                email: email,
                password: password
            }
        })
    }
    catch (_) {
        throw new Error('Could not create user');
    }
}


async function getUserByEmail(email) {
    try {
        return await prisma.user.findUniqueOrThrow({
            where: {
                email: email,
            }
        })
    }
    catch (_) {
        throw new Error('No user found');
    }
}

export default {
    createUser,
    getUserByEmail
}