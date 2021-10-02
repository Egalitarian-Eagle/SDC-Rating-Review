const db = require('../../database/index.js');

// ========= GET /reviews =================

const getReviews = (req, res) => {

  const product_id= req.query.product_id || 12345;
  const page = req.query.page || 1;
  const count = req.query.count || 5;
  const sort = req.query.sort ? `ORDER BY ${req.query.sort}DESC` : `ORDER BY date DESC`;
  const startIdx = (page - 1) * count;
  const endIdx = page * count;

  const fetchData = async () => {
    const data = db.query(
      `SELECT reviews.id AS review_id,rating,summary,recommend,response,body,to_char(to_timestamp(date/1000),'MM/DD/YYYY HH24:MI:SS') AS date,reviewer_name,helpfulness,reported,COUNT(url),json_build_object('url', array_agg(url)) AS photos
      FROM reviews
        LEFT JOIN reviews_photos ON reviews.id=reviews_photos.review_id
      WHERE product_id=${product_id} AND reported=false
      GROUP BY 1
      ${sort}`
    )
    const reviews = await Promise.all([data]);
    return reviews;
  }

  fetchData()
    .then(data => {

      data[0].rows.forEach(review => {
        const urls = review.photos.url;
        review.photos = [];
        urls.forEach((photo,index) => {
          if(photo) {
            review.photos.push({id: index, url: photo})
          }
        })
      })

      const sendData = { product: product_id, page: page, count:count, data: data[0].rows.slice(startIdx, endIdx)}
      res.status(200);
      res.send(sendData);
    })
    .catch(err => console.log(err))
};





// ============ GET / reviews /mata =================
const getMeta = (req, res) => {
  const product_id= req.query.product_id || 66;

  const getMetaData = async () => {
    const ratings = db.query(
    `SELECT json_build_object(recommend, COALESCE(sum(CASE WHEN recommend THEN 1 ELSE 0 END),0)) AS recommend,json_build_object(not recommend,COALESCE(sum(CASE WHEN recommend THEN 0 ELSE 1 END),0))AS notRecommend,json_build_object(rating, count(rating)) AS ratings
    FROM reviews
    WHERE product_id=${product_id} AND reported=false
    GROUP BY rating, recommend`)

    // ============= characteristics query ================

    const reviews = await Promise.all([ratings]);
    return reviews;
  }


  getMetaData()
  .then(data => {
    let ratings = {};
    let recommended = { 0: 0, 1: 0};
    let backData = {product_id: product_id.toString(), ratings: {}, recommended: recommended}
    data[0].rows.forEach(eachRating => {
      rating = {...ratings,...eachRating.ratings};
      if (eachRating.recommend.true) {
        backData.recommended[1]++;
      }
      if (eachRating.notrecommend.false) {
        backData.recommended[0]++;
      }
    });
    backData.ratings = ratings;;
  })
  .catch(err => console.log(err))

};


module.exports = {
  getReviews,
  getMeta,
}