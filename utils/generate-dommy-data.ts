import { fa, faker } from "@faker-js/faker";
import { Thread, User } from "../types/threads";

const name = faker.person.firstName() + "" + faker.person.lastName();

export function createRandomFollower(): User {
    return {
        id: faker.string.uuid(),
        photo: faker.image.avatar(),
        name,
        verified: Math.random() >= 0.5,
        bio: faker.person.bio(),
        username: faker.internet.userName(),
        link: faker.internet.url(),
    };
}
export function createRandomUser(): User {
    return {
        id: faker.string.uuid(),
        photo: faker.image.avatar(),
        name,
        verified: Math.random() >= 0.5,
        bio: faker.person.bio(),
        username: faker.internet.userName(),
        link: faker.internet.url(),
        followers: new Array(Math.floor(Math.random() * 10))
            .fill(null)
            .map((_) => createRandomFollower()),
    };
}

export function createRandomThread(): Thread {
    const author = createRandomUser();
    const mentionUser = createRandomUser();
    return {
        id: faker.string.uuid(),
        author,
        content: faker.lorem.sentence(),
        image: Math.random() >= 0.5 ? faker.image.url() : undefined,
        replies: new Array(Math.floor(Math.random() * 10))
            .fill(null)
            .map(() => ({
                id: faker.string.uuid(),
                author: createRandomUser(),
                content: faker.lorem.sentence(),
                likes: Math.floor(Math.random() * 10),
                createdAt: faker.date.recent().toISOString(),
            })),
        repliesCount: Math.floor(Math.random() * 100),
        likesCount: Math.floor(Math.random() * 100),
        mention: Math.random() > 0.5,
        mentionUser,
        createdAt: faker.date.recent().toISOString(),
    };
}

//reload
export function generateThreads(): Thread[] {
    return new Array(50).fill(null).map((_) => createRandomThread());
}
