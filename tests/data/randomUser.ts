
export function getRandomName(): string {
    const names: string[] = ["Jakub", "Anna", "Michał", "Katarzyna", "Paweł", "Agnieszka", "Krzysztof", "Małgorzata", "Piotr", "Ewa"];
    const randomIndex: number = Math.floor(Math.random() * names.length);
    return names[randomIndex];
}

export function getRandomEmail(): string {
    const randomString: string = Math.random().toString(36).substring(2, 10); // Generate a random string
    return `${randomString}@example.com`;
}

export interface User {
    name: string;
    email: string;
    gender: string;
    status: string;
}

export function createRandomUser(): User {
    return {
        name: getRandomName(),
        email: getRandomEmail(),
        gender: Math.random() < 0.5 ? "male" : "female", // Randomly assign gender
        status: Math.random() < 0.5 ? "active" : "inactive", // Randomly assign status
    };
}

export const randomUser: User = createRandomUser();
