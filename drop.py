import sqlite3
import requests
from bs4 import BeautifulSoup
import re
import urllib2
from urllib2 import Request, urlopen, URLError
conn = sqlite3.connect('example.db')
c = conn.cursor()
c.execute('''DROP TABLE listdb''')
