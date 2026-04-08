import dotenv from "dotenv";

dotenv.config();

function getEnv(name: string): string {
    const value = process.env[name];

    if (!value) {
        throw new Error(`Enviroment variable ${name} is missing`);
    }

    return value
}

export const env = {
    DB_USER: getEnv("DB_USER"),
    DB_HOST: getEnv("DB_HOST"),
    DB_NAME: getEnv("DB_NAME"),
    DB_PASSWORD: getEnv("DB_PASSWORD"),
    DB_PORT: getEnv("DB_PORT"),
    JWT_SECRET: getEnv("JWT_SECRET")
};

