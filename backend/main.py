from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from database import get_db_cursor, init_db
import uvicorn
import sqlite3

app = FastAPI()

# Initialize database on startup
@app.on_event("startup")
async def startup_event():
    init_db()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Book model
class Book(BaseModel):
    id: Optional[int] = None
    title: str
    author: str
    description: str
    price: Optional[float] = None
    image_url: Optional[str] = None

@app.get("/")
def read_root():
    return {"message": "Welcome to the Book API"}

@app.get("/api/books", response_model=List[Book])
def get_books():
    try:
        with get_db_cursor() as cursor:
            cursor.execute("SELECT * FROM books ORDER BY created_at DESC")
            books = cursor.fetchall()
            
            # Convert SQLite Row objects to dictionaries and ensure we return a list
            if books is None:
                return []
                
            book_list = []
            for book in books:
                book_dict = dict(book)
                # Ensure all required fields are present
                book_dict.setdefault('description', '')
                book_dict.setdefault('price', None)
                book_dict.setdefault('image_url', None)
                book_list.append(book_dict)
                
            return book_list
            
    except Exception as e:
        print(f"Error fetching books: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/books", response_model=Book)
def create_book(book: Book):
    try:
        print("\n=== Starting book creation ===")
        print("Received book data:", book.dict())
        
        with get_db_cursor(commit=True) as cursor:
            # Insert the new book
            sql = """
                INSERT INTO books (title, author, description, price, image_url)
                VALUES (?, ?, ?, ?, ?)
            """
            values = (
                book.title,
                book.author,
                book.description or '',  # Use empty string if None
                book.price,
                book.image_url
            )
            print("Executing SQL:", sql.strip())
            print("With values:", values)
            
            try:
                cursor.execute(sql, values)
                book_id = cursor.lastrowid
                print(f"Book inserted successfully with ID: {book_id}")
            except sqlite3.Error as e:
                print(f"SQLite error during insert: {e}")
                raise HTTPException(status_code=500, detail=f"Database error during insert: {str(e)}")
            
            # Fetch the created book
            try:
                cursor.execute("SELECT * FROM books WHERE id = ?", (book_id,))
                created_book = cursor.fetchone()
                if created_book is None:
                    raise HTTPException(status_code=500, detail="Book was not created successfully")
                
                # Convert to dictionary and ensure all fields are present
                book_dict = dict(created_book)
                book_dict.setdefault('description', '')
                book_dict.setdefault('price', None)
                book_dict.setdefault('image_url', None)
                
                print("=== Book creation completed successfully ===\n")
                return book_dict
                
            except sqlite3.Error as e:
                print(f"SQLite error during fetch: {e}")
                raise HTTPException(status_code=500, detail=f"Database error during fetch: {str(e)}")
            
    except Exception as e:
        print("Error creating book:", str(e))
        print("Error type:", type(e))
        print("=== Book creation failed ===\n")
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/books/{book_id}", response_model=Book)
def get_book(book_id: int):
    try:
        with get_db_cursor() as cursor:
            cursor.execute("SELECT * FROM books WHERE id = ?", (book_id,))
            book = cursor.fetchone()
            if book is None:
                raise HTTPException(status_code=404, detail="Book not found")
            return dict(book)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/api/books/{book_id}")
def delete_book(book_id: int):
    try:
        with get_db_cursor(commit=True) as cursor:
            cursor.execute("DELETE FROM books WHERE id = ?", (book_id,))
            if cursor.rowcount == 0:
                raise HTTPException(status_code=404, detail="Book not found")
            return {"message": "Book deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.put("/api/books/{book_id}", response_model=Book)
def update_book(book_id: int, book: Book):
    try:
        with get_db_cursor(commit=True) as cursor:
            sql = """
                UPDATE books 
                SET title = ?, author = ?, description = ?, price = ?, image_url = ?
                WHERE id = ?
            """
            values = (book.title, book.author, book.description, book.price, book.image_url, book_id)
            cursor.execute(sql, values)
            
            if cursor.rowcount == 0:
                raise HTTPException(status_code=404, detail="Book not found")
                
            # Fetch and return the updated book
            cursor.execute("SELECT * FROM books WHERE id = ?", (book_id,))
            updated_book = cursor.fetchone()
            return dict(updated_book)
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True) 