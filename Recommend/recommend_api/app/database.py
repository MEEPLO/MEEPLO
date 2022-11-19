from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os 

load_dotenv()

USER = os.environ.get('USER')
PASSWORD = os.environ.get('PASSWORD')
HOST = os.environ.get('HOST')
PORT = os.environ.get('PORT')
SCHEMA = os.environ.get('SCHEMA')
MYSQL_URL = f'mysql+pymysql://{USER}:{PASSWORD}@{HOST}:{PORT}/{SCHEMA}'
engine = create_engine(MYSQL_URL, encoding='utf-8')
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()