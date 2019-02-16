
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);
const { should } = chai;
should();

describe('API ENDPOINTS', () => {
  describe('POST', () => {
    it('should return success on a successful setting of menu', () => {
      chai
        .request(app)
        .post('/api/v1/menu')
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
          res.body.should.have.property('message');
        });
    });
  });

  it('should not return success on  creation of menu', (done) => {
    chai
      .request(app)
      .post('/api/v1/menu')
      .send({
        id: 1,
        img:
            'https://imagesvc.timeincapp.com/v3/mm/image?url=https%3A%2F%2Fcdn-image.myrecipes.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2Fgrilled-flank-steak-cherry-pecan-rice-ck.jpg%3Fitok%3DG3CZbicH&w=450&c=sc&poi=face&q=85',
        title: '',
        desc: 'Jollof Rice, Beef and Plantain. 4 pieces of beef per plate',
        price: 1500
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('status');
        res.body.should.have.property('error');
      });
    done();
  });

  describe('GET', () => {
    it('should get all menu ', (done) => {
      chai.request(app)
        .get('/api/v1/menu')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('status');
        });
      done();
    });
  });

  describe('GET', () => {
    it('should not get all menu', (done) => {
      chai.request(app)
        .get('/api/v1/fakeaddress')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.an('object');
          res.body.should.have.property('error');
        });
      done();
    });
  });
});