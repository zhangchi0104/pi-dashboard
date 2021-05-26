/** @format */

import axios from 'axios';

const client = axios.create({
  socketPath: '/var/run/docker.sock',
  baseURL: 'http://localhost/v1.41',
});

export default client;
