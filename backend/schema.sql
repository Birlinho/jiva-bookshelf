-- Drop existing table if it exists
DROP TABLE IF EXISTS books;

-- Create the books table
CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2),
    image_url VARCHAR(2048),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Add indexes for common queries
CREATE INDEX idx_title ON books(title);
CREATE INDEX idx_author ON books(author);

-- Add example data
INSERT INTO books (title, author, description, price) VALUES 
    ('The Great Gatsby', 'F. Scott Fitzgerald', 'A story of decadence and excess', 19.99),
    ('1984', 'George Orwell', 'A dystopian social science fiction', 15.99),
    ('To Kill a Mockingbird', 'Harper Lee', 'A story of racial injustice', 12.99); 