const supertest = require('supertest');
const fs = require('fs');
const micro = require('micro');
const pgController = require('./pgController');
//const pgController = require('');
const newsAPI = require('./index.js');


describe ('API Endpoints', () => {

  let superAPI;
  let done;
  
  beforeEach( async () => {
    
    superAPI = await supertest.agent(micro(newsAPI).listen());

  });

  afterEach( async () => {

  });


  test('It should respond to the / path with status 200 list of 10 articles', async () => {
    //pgController.latest = jest.spyOn(spotQueueController, 'assign');
    //pgController.latest.mockImplementation(() => ({id: null}));

    let rootRequest = await superAPI.get('/');

    expect(rootRequest.body.length).toBe(10);

    expect(rootRequest.statusCode).toBe(200); //error or not?

    //expect(pgController.assign).toHaveBeenCalled();

  });


  

});