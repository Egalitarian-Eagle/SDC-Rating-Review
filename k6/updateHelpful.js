import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
  const obj = {
    review_id: 12345
    }
  http.post('http://localhost:3002/reviews/12345/helpful', obj)
}