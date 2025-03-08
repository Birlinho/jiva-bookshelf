import sqlite3
from contextlib import contextmanager
import os

# Database configuration
DATABASE_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "books.db")
SCHEMA_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "schema.sql")

def init_db():
    """Initialize the database with schema"""
    try:
        print(f"Initializing database at {DATABASE_PATH}")
        # Always execute schema to ensure tables exist
        with get_db_connection() as conn:
            print("Creating/updating database schema...")
            with open(SCHEMA_PATH, 'r') as f:
                schema_sql = f.read()
                conn.executescript(schema_sql)
            print("Database schema initialized successfully!")
    except Exception as e:
        print(f"Error initializing database: {e}")
        raise

@contextmanager
def get_db_connection():
    """Context manager for database connections"""
    connection = None
    try:
        print("Connecting to SQLite database...")
        connection = sqlite3.connect(DATABASE_PATH)
        connection.row_factory = sqlite3.Row
        print("Successfully connected to SQLite database!")
        yield connection
    except Exception as e:
        print(f"Error connecting to SQLite: {e}")
        raise
    finally:
        if connection:
            print("Closing database connection...")
            connection.close()
            print("Database connection closed.")

@contextmanager
def get_db_cursor(commit=False):
    """Context manager for database cursors"""
    with get_db_connection() as connection:
        cursor = connection.cursor()
        try:
            print(f"Created database cursor (commit={commit})")
            yield cursor
            if commit:
                print("Committing transaction...")
                connection.commit()
                print("Transaction committed successfully!")
        except Exception as e:
            print(f"Error in database operation: {e}")
            if commit:
                print("Rolling back transaction...")
                connection.rollback()
                print("Transaction rolled back.")
            raise
        finally:
            print("Closing cursor...")
            cursor.close()
            print("Cursor closed.") 