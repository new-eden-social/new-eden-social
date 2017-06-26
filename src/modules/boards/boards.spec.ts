import { expect } from 'chai';
import * as request from 'supertest';
import { Seed } from '../../seed';
import { Board } from './board.entety';
import { async } from 'rxjs/scheduler/async';

describe('Boards Service', () => {

  let boardId : number;
  const board = { name: 'Test board' };

  before(() => {
    const seed = new Seed();
    return seed.board(new Board(board.name))
    .then(seedBoard => boardId = seedBoard.id);
  });

  describe('GET /boards/:boardId', () => {
    it('should get a board by id', () => {
      return request(process.env.SERVER)
      .get(`/boards/${boardId}`)
      .expect(200)
      .then(({ body }) => {
        expect(body).to.be.a('object');
        expect(body).to.have.property('id', boardId);
        expect(body).to.have.property('name', board.name);
      });
    });
    it('should failed 404 for invalid id', () => {
      const invalidBoardId = boardId + 1;

      return request(process.env.SERVER)
      .get(`/boards/${invalidBoardId}`)
      .expect(404);
    });
  });

  describe('GET /boards', () => {
    it('should get all boards', () => {
      return request(process.env.SERVER)
      .get('/boards')
      .expect(200)
      .then(({ body }) => {
        expect(body).to.be.a('array');
      });
    });
  });

});
