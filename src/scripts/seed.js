import { db } from "@vercel/postgres";
import { books } from "../scripts/dummyData.js";

async function seedBooks(client) {
  try {
    // ext used to generate unique ids
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // creates 'books' table if it doesn't exist
    const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS books (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                author VARCHAR(255) NOT NULL,
                notes VARCHAR(255) NOT NULL
            )
        `;

    console.log(`created 'books' table`);

    // inserts 'data' into books table
    const insertBooks = await Promise.all(
      books.map(
        (book) => client.sql`
            INSERT INTO books (id, title, author, notes)
            VALUES (${book.id}, ${book.title}, ${book.author}, ${book.notes})
            ON CONFLICT (id) DO NOTHING;
        `,
      ),
    );

    console.log(`seeded ${books.length} books`);

    return {
      createTable,
      books: insertBooks,
    };
  } catch (error) {
    console.error("error seeding books:", error);
    throw error;
  }
}

async function seed() {
  const client = await db.connect();

  await seedBooks(client);

  await client.end();
}

seed().catch((error) => {
  console.error(`error occured attempting to seed db:`, error);
});
