const db = require('../../database/index.js');

// ========= GET /reviews =================

const getReviews = async (req, res) => {

  const product_id= req.query.product_id || 123;
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
const getMetaData = async (req, res) => {
  // console.log('req.query', req.query)
  const product_id= Number(req.query.product_id) || 123;
  let sendBack = {
    product_id: product_id,
    ratings: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0
    },
    recommend: {
      0: 0
    },
    characteristics: {},
  }
  try {
    const rrQuery =  {
      text: 'Select rating, recommend FROM reviews WHERE product_id = $1',
      values: [product_id]
    }
    const rrResults = await db.query(rrQuery.text, rrQuery.values)
    rrResults.rows.forEach((review) => {
      if (review.recommend) {
        sendBack.recommend[0]++;
      }
      if (review.rating === 1) {
        sendBack.ratings[1]++;
      }
      if (review.rating === 2) {
        sendBack.ratings[2]++;
      }
      if (review.rating === 3) {
        sendBack.ratings[3]++;
      }
      if (review.rating === 4) {
        sendBack.ratings[4]++;
      }
      if (review.rating === 5) {
        sendBack.ratings[5]++;
      }
    })

    const charQuery = {
      text: `SELECT json_build_object(characteristics.name, json_build_object (
              'id', characteristics.id,
              'value', AVG(characteristics_reviews.value)
              )) as characteristics
              FROM characteristics
              LEFT JOIN characteristics_reviews
                ON characteristics.id = characteristics_reviews.characteristics_id
                  WHERE characteristics.product_id = $1
                    GROUP BY characteristics.id`,
      values: [product_id]
    };

    const charResults = await db.query (charQuery.text, charQuery.values);
    const charObj = charResults.rows;
    charObj.forEach((row) => {
      // console.log('row :', row)
      if (row.characteristics) {
        let char = 'characteristics';
        Object.keys(row[char]).forEach((key) => {
          sendBack[char][key] = row[char][key];
        })
      }
    });
    res.status(200).send(sendBack);
  } catch(e) {
    console.log(e);
    res.sendStatus(400).end();
  }

}
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

// ============== POST /reviews =====================
// const postReview = async (req, res) => {
//   const {
//     product_id, rating, summary, body, recommend, name, email, photos, characteristics,
//   } = req.body;
//   const date = Number(new Date());

//   try {
//     const reqQuery = 'INSERT INTO reviews (id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id;';
//     const reqValues = [product_id, rating, date, summary, body, recommend, false, name, email, null, 0];
//     const results = await db.query(reqQuery, reqValues);
//     console.log('this is results: ', results);
//     const review_id = results.rows[0].id;

//     insert photo links
//     if(photos) {
//       photos.forEach((photo) => {
//           const addPhotoQuery = {
//           text: `INSERT INTO reviews_photos(id, review_id, url) VALUES (DEFAULT, $1, $2)`,
//           values: [review_id, photo]
//           }
//           db.query(addPhotoQuery.text, addPhotoQuery.values);
//       })
//     }

//     // insert characteristics
//     const charsKeys = Object.keys(characteristics);
//     console.log('this is keys array:', charsKeys)
//     if (charsKeys) {
//       charsKeys.forEach((key) => {
//         const addCharacteristicReviewQuery = 'INSERT INTO characteristic_reviews (id, characteristics_id, review_id, value) VALUES (DEFAULT, $1, $2, $3);';
//         const value = characteristics[charsKeys[i]];
//         const char_id = charsKeys[i];
//         db.query(addCharacteristicReviewQuery, [char_id, review_id, value]);
//       })
//     }

//     response.sendStatus(201);
//   } catch(e) {
//     console.log(e);
//     res.sendStatus(500).end();
//   }

// }


module.exports = {
  getReviews,
  getMetaData,
  updateHelpful,
  updateReport,
};
