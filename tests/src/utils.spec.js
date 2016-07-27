const chai = require('chai');
const { processPath } = require('../../dist/utils');

describe('ya storage utils', () => {
  describe('utils.processPath', () => {
    it('adds .json to the end of a file if needed', (done) => {
      const path = 'a/path/without/json';
      const fullPath = processPath(path);
      chai.expect(fullPath).to.equal(`${path}.json`);
      done();
    });

    it('does not add .json to the end of a file if not needed', (done) => {
      const path = 'a/path/with/json.json';
      const fullPath = processPath(path);
      chai.expect(fullPath).to.equal(`${path}`);
      done();
    });
  });
});
