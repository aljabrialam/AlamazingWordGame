import React from 'react';
import renderer from 'react-test-renderer';

import HomeScreen from '../HomeScreen';

const navigationPropsLanding = {
  navigation: {
    navigate: jest.fn(),
    addListener: jest.fn(),
  },
  route: {params: {radio: 'Cities'}},
};

describe('<HomeScreen />', () => {
  it('has 3 child', () => {
    const tree: any = renderer
      .create(<HomeScreen {...navigationPropsLanding} />)
      .toJSON();
    expect(tree.children.length).toBe(3);
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(<HomeScreen {...navigationPropsLanding} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
