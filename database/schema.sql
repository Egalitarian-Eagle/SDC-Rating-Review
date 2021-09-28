-- ========== reviews table =================
CREATE TABLE IF NOT EXISTS reviews (
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
)

CREATE INDEX reviews_id_index ON reviews(id);
CREATE INDEX reviews_product_id_index ON reviews(product_id);

-- ========== reviews_phtotos table =================
CREATE TABLE IF NOT EXISTS reviews_photos (
  id SERIAL PRIMARY KEY,
  review_id INT NOT NULL,
  url VARCHAR(600) NOT NULL,
  FOREIGN KEY (review_id) REFERENCES reviews(id)
)

CREATE INDEX reviewS_photos_index ON reviews_photos(review_id)

-- ========== characteristics table =================
CREATE TABLE IF NOT EXISTS characteristics (
  id SERIAL PRIMARY KEY,
  product_id INT NOT NULL,
  NAME VARCHAR(100) NOT NULL
)

-- ========== characteristics_reviews table =================
CREATE TABLE IF NOT EXISTS characteristics_reviews (
  id SERIAL PRIMARY KEY,
  characteristics_id INT NOT NULL,
  review_id INT NOT NULL,
  value INT NOT NULL,
  FOREIGN KEY (characteristics_id) REFERENCES characteristics(id);
  FOREIGN KEY (review_id) REFERENCES reviews(id)
)

CREATE INDEX cha_id_index ON characteristics_reviews(characteristics_id);
