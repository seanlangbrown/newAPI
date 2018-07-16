-- run with: psql -d postgres -a -f seedNewsAPI.sql

--SETUP SYSTEM for large file load, see; https://www.postgresql.org/docs/current/static/populate.html
ALTER SYSTEM SET max_wal_size = 4;
-- increase max_wal_size: The default settings are 5 minutes and 1 GB, respectively (aws t2 micro has 1, aws t2 small has 2)


DROP DATABASE IF EXISTS newsapi;

CREATE DATABASE newsapi;

\c newsapi;

CREATE TABLE articles(
  -- place_id,name,formatted_address,international_phone_number,website,url,open_now,open_periods,weekday_text,lat,lon
  article_id VARCHAR(10) NOT NULL,
  kaggle_id VARCHAR(10) NOT NULL,
  title VARCHAR NOT NULL,
  publication VARCHAR NOT NULL,
  author VARCHAR,
  published date,
  year numeric,
  month numeric,
  url TEXT,
  content TEXT

);


\copy articles FROM 'articles1.csv' WITH (DELIMITER',', FORMAT CSV, HEADER);

-- add index/keys to articles
ALTER TABLE articles ADD PRIMARY KEY(article_id);
ALTER TABLE articles ADD UNIQUE (article_id);

--create index to optimize primary key lookup and join
CREATE INDEX articleDateOrdered ON articles (published);
--create index to optimiz ordering open periods by day
CREATE INDEX articleIdOrdered ON articles (article_id);


ANALYZE articles;

-- reset system 
ALTER SYSTEM RESET wal_level;