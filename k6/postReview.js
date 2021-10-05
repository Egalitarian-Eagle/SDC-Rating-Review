import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
  const body = {
      "product_id": 1234,
      "rating": 3,
      "summary": "this is second test",
      "body": "This body is only for test purpose",
      "recommend": true,
      "name": "hahae",
      "email": "test@email.com",
      "photos": ["https://cdn.pixabay.com/photo/2019/08/25/16/15/cat-4429808_960_720.jpg"],
      "characteristics": {
          "761": 2,
          "762": 5,
          "763": 3,
          "760": 4
      }
  }
  http.post('http://localhost:3002/reviews', body)
}