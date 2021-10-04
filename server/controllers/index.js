const db = require('../../database/index.js');

// ========= GET /reviews =================

const getReviews = async (req, res) => {

  const product_id= req.query.product_id || 66;
  const page = req.query.page || 1;
  const count = req.query.count || 5;
  const sort = req.query.sort || 'date';
  const offset = (page - 1) * count;

  try {
    const data = await db.query (
      `SELECT reviews.id, reviews.rating, reviews.summary, reviews.recommend, reviews.response, reviews.body, reviews.date, reviews.reviewer_name, reviews.helpfulness, (select coalesce(json_agg(photos), '[]'::json)
        AS photos FROM
          (SELECT reviews_photos.id, reviews_photos.url FROM reviews_photos WHERE reviews_photos.review_id = reviews.id) AS photos)
            FROM reviews WHERE product_id = $1 AND reported = false ORDER BY $2 DESC LIMIT $3 offset $4;`,
              [product_id, sort, count, offset]
    );

    const sendBack = {
      product: product_id,
      page,
      count,
      results: data.rows
    };
    res.status(200).send(sendBack);

  } catch (e) {
    console.log(e);
    res.status(400).end()
  }
}


// ============ GET / reviews /mata =================

// ============ PUT /reviews/:review_id/helpful ====================
const updateHelpful = async (req, res) => {
  const { review_id } = req.params;

  try {
    await db.query(`UPDATE reviews SET helpfulness = helpfulness + 1 WHERE id = ${review_id}`);
    res.sendStatus(204).end();
  } catch (e) {
    console.log(e);
    res.sendStatus(400).end();
  }
};

// ============== PUT /reviews/:review_id/report =====================
const updateReport = async (req, res) => {
  const { review_id } = req.params;

  try {
    await db.query(`UPDATE reviews SET reported = true WHERE id = ${review_id}`);
    res.sendStatus(204).end();
  } catch (e) {
    res.sendStatus(400).end();
  }
};

module.exports = {
  getReviews,
  updateHelpful,
  updateReport
}