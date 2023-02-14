const request = require("supertest");
const mongoose = require('mongoose');
const server = require("./server/index.js");

describe("Test the root path", () => {
  beforeAll(done => {
    done();
  });

  afterAll(done => {
    mongoose.connection.close();
    server.close();
    done();
  });

  test("SHOULD GET A REVIEW", () => {
    return request(server)
      .get('/getreviews')
      .query({id: "63e4530e1c39c3f23167be26"})
      .expect(200)
      .then(res => {
        console.log('result: ', res._body.full_name);
        expect(res._body.full_name).toBe('Keanu Reeves');
      })
  });

  test("SHOULD POST A REVIEW. REVIEW SHOULD COME FROM A PASSENGAR", () => {
    return request(server)
      .post('/newreview')
      .send(
        {
          revieweeId: "63db311d36cf1cd1ae8cfffe",
          full_name: "Luigi",
          rating: 5,
          review_text: "Excellent driver. Didn't talk much, which I appreciate. Got me to my destination on time",
          review_summary: "Excellent Driver",
          view: "rider"
        }
      )
      .expect(201)
      .then(res => {
        let review = res._body.driver_reviews.pop();
        expect(res._body.full_name).toBe('Jack Ryan');
        expect(review.full_name).toBe('Luigi');
        expect(review.rating).toBe(5);
        expect(review.review_text).toBe("Excellent driver. Didn't talk much, which I appreciate. Got me to my destination on time");
        expect(review.review_summary).toBe("Excellent Driver");
      })
  });

  test("SHOULD POST A REVIEW. REVIEW SHOULD COME FROM A DRIVER", () => {
    return request(server)
      .post('/newreview')
      .send(
        {
          revieweeId: "63db311d36cf1cd1ae8cfffe",
          full_name: "Mario",
          rating: 4,
          review_text: "Excellent driver. Drove me to Mushroom Kingdom on time. Faster than Yoshi in fact.",
          review_summary: "Excellent Driver",
          view: "driver"
        }
      )
      .expect(201)
      .then(res => {
        let review = res._body.rider_reviews.pop();
        expect(res._body.full_name).toBe('Jack Ryan');
        expect(review.full_name).toBe('Mario');
        expect(review.rating).toBe(4);
        expect(review.review_text).toBe("Excellent driver. Drove me to Mushroom Kingdom on time. Faster than Yoshi in fact.");
        expect(review.review_summary).toBe("Excellent Driver");
      })
  });

  test("SHOULD POST A REPORT", () => {
    return request(server)
      .post('/reviews/63db2ec4478993a15cedfa68/report')
      .send(
        {
          report_text: "Terrible driver. He sped the whole time. He didn't even drive me to the right destination",
          full_name: "Max Payne"
        }
      )
      .expect(201)
      .then(res => {
        let reported = res._body.reported.pop();
        expect(res._body.full_name).toBe('Robert Sullivan');
        expect(reported.full_name).toBe('Max Payne');
        expect(reported.report_text).toBe("Terrible driver. He sped the whole time. He didn't even drive me to the right destination");
      })
  });

});