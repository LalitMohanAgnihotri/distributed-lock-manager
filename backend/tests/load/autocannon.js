import autocannon from 'autocannon';

autocannon({
  url: 'http://localhost:5000/api/health',
  connections: 50,
  duration: 10
}, console.log);