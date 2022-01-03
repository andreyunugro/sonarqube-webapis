import { expect } from 'chai';
import utils from '../src/utils';

describe('Utils', () => {
  describe('objectToPostParam', () => {
    it('should handle normal object string', () => {
      const input = { test: 'test', test2: '0' };
      const result = utils.objectToPostParam(input);
      expect(result).to.equal(`test=${input.test}&test2=${input.test2}`);
    });

    it('should handle undefined property', () => {
      const input = {
        test: '1',
        test2: undefined,
        test3: false,
      };
      const result = utils.objectToPostParam(input);
      expect(result).to.equal(`test=${input.test}&test3=${input.test3}`);
    });
  });

  describe('arrayToPostParam', () => {
    it('should handle single array', () => {
      const input = ['test'];
      const result = utils.arrayToPostParam('test', input);
      expect(result).to.equal(`test=${input[0]}`);
    });

    it('should handle multiple item array', () => {
      const input = ['test', 'test2'];
      const result = utils.arrayToPostParam('test', input);
      expect(result).to.equal(`test=${input[0]}&test=${input[1]}`);
    });
  });
});
