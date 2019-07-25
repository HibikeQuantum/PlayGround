var expect = chai.expect;

// 외부 라이브러리를 불러오는 예제입니다. #js
describe('#operators', () => {
  before(() => {
    console.log("mocha before");
  });
  beforeEach(() => {
    console.log("mocha beforeEach");
  });
  it('sum()', done => {
    let result = sum(10, 20);
    expect(result).equal(30);
    done();
  });
  after(() => {
    console.log("after");
  });
  afterEach(() => {
    console.log("afterEach");
  });
});

describe('#mocha Guide ', () => {
  it(' ok 테스트입니다.', done => { //truthy 한 값인지 확인
    expect(false).to.be.not.ok;
    expect(undefined).to.be.not.ok;
    expect(1).to.be.ok;
    done();
  })
  it(' 객체 비교 deep', done => {

    expect({bar: 'baz'}).to.deep.equal({bar: 'baz'});
    done();

  })
  it('include vs have ', done => {
    expect([1, 2, 3]).to.include(2);
    // expect([1,2,3]).to.have(2); // error!
    expect([1, 2, 3]).to.have.property(2);

    var obj = {foo: 'bar'};
    expect(obj).to.include.property('foo');
    expect(obj).to.have.property('foo');
    done();

    expect('foobar').to.include.string('bar');
    expect('foobar').to.have.string('bar');

    it('array member', function (done) {
      setTimeout(function () {
        expect(arr).to.have.members([4, 3, 2, 1]);
        done();
      }, 3000);

    });
  });
});
