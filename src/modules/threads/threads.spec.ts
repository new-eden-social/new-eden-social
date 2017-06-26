import { expect } from 'chai';
import * as request from 'supertest';

describe('Threads', () => {

  let threadId: number;
  const thread = { name: 'Test thread', content: 'Some test thread content' };

  it('should failed 404 on not existing board', () => {
    return request(process.env.SERVER)
    .post('/boards/9999999/threads')
    .send({ thread })
    .expect(404);
  });

  describe('POST /boards/:boardId/threads', () => {
    it('should create a thread', () => {
      return request(process.env.SERVER)
      .post('/boards/1/threads')
      .send({ thread })
      .expect(201)
      .then(({ body }) => {
        expect(body).to.be.a('object');
        expect(body).to.have.property('name', thread.name);
        expect(body).to.have.property('content', thread.content);
        expect(body).to.have.property('id');

        threadId = body.id;
      });
    });

    it('should failed 400 missing params', () => {
      return request(process.env.SERVER)
      .post('/boards/1/threads')
      .send({ thread: { name: 'missing params' } })
      .expect(400);
    });
  });

  describe('GET /boards/:boardId/threads/:threadId', () => {
    it('should get a thread by id', () => {
      return request(process.env.SERVER)
      .get(`/boards/1/threads/${threadId}`)
      .expect(200)
      .then(({ body }) => {
        expect(body).to.be.a('object');
        expect(body).to.have.property('id', threadId);
        expect(body).to.have.property('name', thread.name);
        expect(body).to.have.property('content', thread.content);
      });
    });
    it('should failed 404 for invalid id', () => {
      const invalidThreadId = threadId + 1;

      return request(process.env.SERVER)
      .get(`/boards/1/threads/${invalidThreadId}`)
      .expect(404);
    });
  });

  describe('GET /boards/:boardId/threads', () => {
    it('should get all threads for board', () => {
      return request(process.env.SERVER)
      .get('/boards/1/threads')
      .expect(200)
      .then(({ body }) => {
        expect(body).to.be.a('array');
      });
    });
  });

});
