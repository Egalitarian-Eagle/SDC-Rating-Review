import http from 'k6/http';
import { sleep, check, group } from 'k6';

export let options = {
  stages: [
    { duration: '5s', target: 1 }, // below normal
    { duration: '10s', target: 10 }, // normal
    { duration: '10s', target: 100 }, // around breaking point
    { duration: '10s', target: 500 }, // beyond breaking point
    { duration: '10s', target: 50 }, // scale down
  ],

  thresholds: {
    http_req_failed: ['rate<0.01'],   // http errors should be less than 1%
    http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms
  }
};

const SLEEP_DURATION = 1;

export default function() {
  group('app startup', () => {
    const max = 999999;
    const min = 1;
    const product_id = Math.round((Math.random() * (max - min)) + min);


    let getMetaData = http.get('http://localhost:3002/reviews/meta');
    check (getMetaData, {
      'is status 200' : (r) => r.status === 200,
      'is duration < 250ms': (r) => r.timings.duration < 250,
    })
    sleep (SLEEP_DURATION);

  })
}