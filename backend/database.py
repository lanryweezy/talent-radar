from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

# Database configuration
DATABASE_URL = os.getenv(
    "DATABASE_URL", 
    "sqlite:///:memory:" if os.getenv("VERCEL") else "sqlite:///./talent_radar.db"
)

# SQLite specific connect_args
connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}

# Create engine
engine_args = {
    "connect_args": connect_args,
    "pool_pre_ping": True,
    "echo": False  # Set to True for SQL debugging
}

# pool_size and max_overflow are not supported by SQLite's default pool
if not DATABASE_URL.startswith("sqlite"):
    engine_args["pool_size"] = 10
    engine_args["max_overflow"] = 20

engine = create_engine(DATABASE_URL, **engine_args)

# Create session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Dependency to get database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()