import { pool } from "../config/db";

export const createProgramForUser = async (userId: number, name: string, description: string) => {

    const existingProgram = await pool.query(
        `
        SELECT 1 FROM programs 
        WHERE name = $1 AND user_id = $2
        `, [name, userId]
    );

    if (existingProgram.rows.length > 0) {
        throw new Error(`Program already exists`);
    };

    const result = await pool.query(
        `
        INSERT INTO programs (user_id, name, description)
        VALUES ($1, $2, $3)
        RETURNING *
        `, [userId, name, description]
    )

    return result.rows[0];
};

export const getProgramsByUser = async (userId: number) => {

    const result = await pool.query(
        `
        SELECT * FROM programs
        WHERE user_id = $1
        `, [userId]
    );

    return result.rows;

}

export const updateProgram = async (userId: number, programId: number, name: string, description: string) => {

    const result = await pool.query(
        `
        UPDATE programs 
        SET name = $1,
            description = $2
        WHERE user_id = $3 AND id = $4
        RETURNING *
        `, [name, description, userId, programId]
    );
    
    if (result.rows.length === 0) {
        throw new Error("Program not found");
    }

    return result.rows[0];
}

export const deleteProgram = async (userId: number, programId: number) => {

    const result = await pool.query(
        `
        DELETE FROM programs
        WHERE user_id = $1 and id = $2
        RETURNING *
        `, [userId, programId]
    ) 
        
    if (result.rows.length === 0) {
        throw new Error("Program not found");
    }

    return result.rows[0];
    
}