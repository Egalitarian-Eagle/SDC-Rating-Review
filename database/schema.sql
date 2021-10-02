-- DROP DATABASE sdc_test;
CREATE DATABASE sdc_test;
\c sdc_test
-- ========== reviews table =================
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  product_id INT NOT NULL,
  rating INT NOT NULL,
  date TEXT NOT NULL,
  summary TEXT NOT NULL,
  body TEXT NOT NULL,
  recommend BOOLEAN NOT NULL,
  reported BOOLEAN NOT NULL,
  reviewer_name VARCHAR(100) NOT NULL,
  reviewer_email VARCHAR(100) NOT NULL,
  response TEXT,
  helpfulness INT NOT NULL DEFAULT 0
);

-- CREATE INDEX reviews_id_index ON reviews(id);
-- CREATE INDEX reviews_product_id_index ON reviews(product_id);

-- ========== reviews_phtotos table =================
CREATE TABLE  reviews_photos (
  id SERIAL PRIMARY KEY,
  review_id INT NOT NULL,
  url VARCHAR(600) NOT NULL,
  FOREIGN KEY (review_id) REFERENCES reviews(id)
);

-- CREATE INDEX reviewS_photos_index ON reviews_photos(review_id)

-- ========== characteristics table =================
CREATE TABLE characteristics (
  id SERIAL PRIMARY KEY,
  product_id INT NOT NULL,
  name VARCHAR(100) NOT NULL
);

-- ========== characteristics_reviews table =================
CREATE TABLE characteristics_reviews (
  id SERIAL PRIMARY KEY,
  characteristics_id INT NOT NULL,
  review_id INT NOT NULL,
  value INT NOT NULL,
  FOREIGN KEY (characteristics_id) REFERENCES characteristics(id),
  FOREIGN KEY (review_id) REFERENCES reviews(id)
);

-- CREATE INDEX cha_id_index ON characteristics_reviews(characteristics_id);

-- COPY reviews(id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) FROM '/home/yue_zhang/hackreactor/w9/SDC-Rating-Review/seeds/reviews.csv' DELIMITER ',' CSV HEADER;
-- COPY reviews_photos(id, review_id, url) FROM '/home/yue_zhang/hackreactor/w9/SDC-Rating-Review/seeds/reviews_photos.csv' DELIMITER ',' CSV HEADER;
-- COPY characteristics(id, product_id, name) FROM '/home/yue_zhang/hackreactor/w9/SDC-Rating-Review/seeds/characteristics.csv  DELIMITER ',' CSV HEADER;