/* eslint consistent-return: 0 */

const chai = require('chai');
const fs = require('fs');
const rimraf = require('rimraf');
const fakeAppDataDir = `${process.cwd()}/fake-appData`;
const storage = require('../../dist/index');

describe('Electron Storage', () => {
  beforeEach('create the fake-appData folder', () => {
    fs.mkdirSync(fakeAppDataDir);
  });

  afterEach('delete the fake-appData folder', () => {
    rimraf.sync(fakeAppDataDir);
  });

  describe('storage.get()', () => {
    it('receives the data from a json file', (done) => {
      const json = JSON.stringify({ awesome: 'data' });
      fs.writeFile(`${fakeAppDataDir}/my-awesome-data.json`, json, (err) => {
        if (err) {
          throw err;
        }

        storage.get(`${fakeAppDataDir}/my-awesome-data.json`, (error, data) => {
          chai.expect(error).to.equal(null);
          chai.expect(data).to.deep.equal({ awesome: 'data' });
          done();
        });
      });
    });
  });

  describe('storage.get()', () => {
    it('receives the data from a json file', (done) => {
      const json = JSON.stringify({ awesome: 'data' });
      fs.writeFile(`${fakeAppDataDir}/my-awesome-data.json`, json, (err) => {
        if (err) {
          throw err;
        }

        storage.get(`${fakeAppDataDir}/my-awesome-data.json`).then(data => {
          chai.expect(data).to.deep.equal({ awesome: 'data' });
          done();
        });
      });
    });
  });

  describe('storage.set()', () => {
    it('sets a json file that you can later get', (done) => {
      storage.set(`${fakeAppDataDir}/data.json`, { js: 'on' }, (err) => {
        chai.expect(err).to.equal(null);
        storage.get(`${fakeAppDataDir}/data.json`, (error, data) => {
          chai.expect(data).to.deep.equal({ js: 'on' });
          done();
        });
      });
    });

    it('creates folders if needed', (done) => {
      storage.set(`${fakeAppDataDir}/in/some/folders/data.json`, { js: 'on' }, (err) => {
        chai.expect(err).to.equal(null);
        storage.get(`${fakeAppDataDir}/in/some/folders/data.json`, (error, data) => {
          chai.expect(data).to.deep.equal({ js: 'on' });
          done();
        });
      });
    });
  });

  describe('storage.isPathExists()', () => {
    it('return true if the path exists', (done) => {
      storage.set(`${fakeAppDataDir}/in/some/folders/data.json`, { js: 'on' }, (err) => {
        chai.expect(err).to.equal(null);
        storage.isPathExists(`${fakeAppDataDir}/in/some/folders/data.json`, (data) => {
          chai.expect(data).to.equal(true);
          done();
        });
      });
    });

    it('return false if the path doesn\'t exists', (done) => {
      storage.set(`${fakeAppDataDir}/in/some/folders/data.json`, { js: 'on' }, (err) => {
        chai.expect(err).to.equal(null);
        storage.isPathExists(`${fakeAppDataDir}/in/some/other/folders/data.json`, (data) => {
          chai.expect(data).to.equal(false);
          done();
        });
      });
    });
  });

  describe('storage.remove() - file', () => {
    it('removes the file in path', (done) => {
      storage.set(`${fakeAppDataDir}/in/some/folders/data.json`, { js: 'on' }, (err) => {
        chai.expect(err).to.equal(null);
        storage.remove(`${fakeAppDataDir}/in/some/folders/data.json`, error => {
          storage.isPathExists(`${fakeAppDataDir}/in/some/other/folders/data.json`, (data) => {
            chai.expect(data).to.equal(false);
            chai.expect(error).to.equal(null);
            done();
          });
        });
      });
    });
  });

  describe('storage.remove() - folder', () => {
    it('removes the folder in path', (done) => {
      storage.set(`${fakeAppDataDir}/in/some/folders/data.json`, { js: 'on' }, (err) => {
        chai.expect(err).to.equal(null);
        storage.remove(`${fakeAppDataDir}/in/some/folders`, error => {
          storage.isPathExists('in/some/folders', (data) => {
            chai.expect(data).to.equal(false);
            chai.expect(error).to.equal(null);
            done();
          });
        });
      });
    });
  });
});
