import React from 'react';
import renderer from 'react-test-renderer';

import LeaderBoardScreen from '../LeaderBoardScreen';

jest.mock('@react-native-async-storage/async-storage', () => {
  let cache: any = {};
  return {
    setItem: jest.fn((key, value) => {
      return new Promise((resolve, reject) => {
        return typeof key !== 'string' || typeof value !== 'string'
          ? reject(new Error('key and value must be string'))
          : resolve((cache[key] = value));
      });
    }),
    getItem: jest.fn((key, _value) => {
      return new Promise(resolve => {
        return cache.hasOwnProperty(key) ? resolve(cache[key]) : resolve(null);
      });
    }),
    removeItem: jest.fn(key => {
      return new Promise((resolve, reject) => {
        return cache.hasOwnProperty(key)
          ? resolve(delete cache[key])
          : reject('No such key!');
      });
    }),
    clear: jest.fn(_key => {
      return new Promise((resolve, _reject) => resolve((cache = {})));
    }),
    getAllKeys: jest.fn(_key => {
      return new Promise((resolve, _reject) => resolve(Object.keys(cache)));
    }),
  };
});

const navigationPropsLanding = {
  navigation: {
    navigate: jest.fn(),
    addListener: jest.fn(),
  },
  route: {params: {radio: 'Cities'}},
};
describe('<LeaderBoardScreen />', () => {
  it('has 5 child', () => {
    const tree: any = renderer
      .create(<LeaderBoardScreen {...navigationPropsLanding} />)
      .toJSON();
    expect(tree.children.length).toBe(5);
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(<LeaderBoardScreen {...navigationPropsLanding} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
