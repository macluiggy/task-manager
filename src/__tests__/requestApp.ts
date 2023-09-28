import request from 'supertest';
import app from '../index';
const requestApp = request(app);
module.exports = { requestApp };
