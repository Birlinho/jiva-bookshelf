import mysql.connector
from mysql.connector import Error
from contextlib import contextmanager

# Database configuration
DB_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': 'books',
    'autocommit': True,
    'consume_results': True  # Add this to handle unread results
}

@contextmanager
def get_db_connection():
    """Context manager for database connections"""
    connection = None
    try:
        print("Attempting to connect to MySQL database...")
        connection = mysql.connector.connect(**DB_CONFIG)
        print("Successfully connected to MySQL database!")
        yield connection
    except Error as e:
        print(f"Error connecting to MySQL: {e}")
        print(f"Connection parameters: host={DB_CONFIG['host']}, user={DB_CONFIG['user']}, database={DB_CONFIG['database']}")
        raise
    finally:
        if connection and connection.is_connected():
            print("Closing database connection...")
            connection.close()
            print("Database connection closed.")

@contextmanager
def get_db_cursor(commit=False):
    """Context manager for database cursors"""
    with get_db_connection() as connection:
        cursor = connection.cursor(dictionary=True, buffered=True)  # Add buffered=True to handle results properly
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