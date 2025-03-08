-- Drop existing table if it exists
DROP TABLE IF EXISTS books;

-- Create the books table
CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    description TEXT DEFAULT '',
    price REAL,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add indexes for common queries
CREATE INDEX IF NOT EXISTS idx_title ON books(title);
CREATE INDEX IF NOT EXISTS idx_author ON books(author);

-- Add example data if the table is empty
INSERT OR IGNORE INTO books (title, author, description, price) 
SELECT 'The Great Gatsby', 'F. Scott Fitzgerald', 'A story of decadence and excess', 19.99
WHERE NOT EXISTS (SELECT 1 FROM books LIMIT 1);

INSERT OR IGNORE INTO books (title, author, description, price)
SELECT '1984', 'George Orwell', 'A dystopian social science fiction', 15.99
WHERE NOT EXISTS (SELECT 1 FROM books LIMIT 1);

INSERT OR IGNORE INTO books (title, author, description, price)
SELECT 'To Kill a Mockingbird', 'Harper Lee', 'A story of racial injustice', 12.99
WHERE NOT EXISTS (SELECT 1 FROM books LIMIT 1); 