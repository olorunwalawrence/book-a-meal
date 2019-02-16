
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);
const { should } = chai;
should();

describe('API ENDPOINTS', () => {
  describe('POST', () => {
    it('should make a single order', () => {
      chai
        .request(app)
        .post('/api/v1/orders')
        .send({
          img: 'https://imagec.timeincapp.com/v3/mm/image?url=https%3A%2F%2Fcdn-image.myrecipes.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2Fgrilled-flank-steak-cherry-pecan-rice-ck.jpg%3Fitok%3DG3CZbicH&w=450&c=sc&poi=face&q=85',
          title: 'cake',
          description: 'rice with beef',
          price: '1500'
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.an('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
        });
    });
  });

  it('should not create a single order', (done) => {
    chai
      .request(app)
      .post('/api/v1/meals')
      .send({
        img:
          'https://imagesvc.timeincapp.com/v3/mm/image?url=https%3A%2F%2Fcdn-image.myrecipes.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2Fgrilled-flank-steak-cherry-pecan-rice-ck.jpg%3Fitok%3DG3CZbicH&w=450&c=sc&poi=face&q=85',
        title: '',
        description: '',
        price: 1500
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('message');
     
      });
    done();
  });

  it('should not create a single order', (done) => {
    chai
      .request(app)
      .post('/api/v1/orders')
      .send({
          id:1,
        img:
          'https://imagesvc.timeincapp.com/v3/mm/image?url=https%3A%2F%2Fcdn-image.myrecipes.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2Fgrilled-flank-steak-cherry-pecan-rice-ck.jpg%3Fitok%3DG3CZbicH&w=450&c=sc&poi=face&q=85',
        title: '',
        desc: 'rice with beef',
        price: 1500
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        res.body.error.should.be.equal(
          'JSON object should contain { img, title, decription, price }'
        );
      });
    done();
  });

  it('should not create a single order', (done) => {
    chai
      .request(app)
      .post('/api/v1/orders')
      .send({
        img:
            'https://imagesvc.timeincapp.com/v3/mm/image?url=https%3A%2F%2Fcdn-image.myrecipes.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2Fgrilled-flank-steak-cherry-pecan-rice-ck.jpg%3Fitok%3DG3CZbicH&w=450&c=sc&poi=face&q=85',
        title: 'rice with beef',
        desc: 'rice with 4 pices of beef',
        price: ''
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('status');
        
      });
    done();
  });

  describe('GET', () => {
    it('should get all meal ', (done) => {
      chai.request(app)
        .get('/api/v1/orders')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('data');
        });
      done();
    });
    it('should not get orders', (done) => {
      chai.request(app)
        .get('/api/v1/ordders')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.an('object');
          res.body.should.have.property('status');
          res.body.should.have.property('error');
        });
      done();
    });
  });

  describe('PUT', () => {
    it('should update an order and return 200 status code', (done) => {
      chai.request(app)
        .put('/api/v1/orders/1')
        .send({
            img: 'https://imagec.timeincapp.com/v3/mm/image?url=https%3A%2F%2Fcdn-image.myrecipes.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2Fgrilled-flank-steak-cherry-pecan-rice-ck.jpg%3Fitok%3DG3CZbicH&w=450&c=sc&poi=face&q=85',
            title: 'cake',
            description: 'rice with beef',
            price: '1500'
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('status');
          res.body.should.have.property('message');
        });
      done();
    });
    it('should not update a request and return 400 status code', (done) => {
      chai.request(app)
        .patch('/api/v1/orders/fakeId')
        .send({
            id:1,
            img: 'https://imagec.timeincapp.com/v3/mm/image?url=https%3A%2F%2Fcdn-image.myrecipes.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2Fgrilled-flank-steak-cherry-pecan-rice-ck.jpg%3Fitok%3DG3CZbicH&w=450&c=sc&poi=face&q=85',
            title: 'cake',
            description: 'rice with beef',
            price: '1500'
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.an('object');
          res.body.should.have.property('status');
          res.body.should.have.property('error');
        });
      done();
    });
  });

});

