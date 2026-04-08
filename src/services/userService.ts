import { pool } from "../config/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../config/env";


export const createUser = async (name: string, email: string, password: string) => {

    const existingUser = await pool.query(
        `
        SELECT * FROM users WHERE email = $1
        `, [email]
    );

    if (existingUser.rows.length > 0) {
        throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
        `INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3)
        RETURNING *
        `, [name, email, hashedPassword]
    );

    return result.rows[0];
};

export const loginUser = async (email: string, password: string) => {
    const result = await pool.query(
        `SELECT * FROM users WHERE email = $1`, [email]
    );

    const user = result.rows[0];

    if (!user) {
        throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
        { userId: user.id },
        env.JWT_SECRET,
        { expiresIn: "1h"}
    );

    return token;
};
