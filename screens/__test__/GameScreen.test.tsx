import React from 'react';
import renderer from 'react-test-renderer';

import GameScreen from '../GameScreen';

const navigationPropsLanding = {
  navigation: {
    navigate: jest.fn(),
    addListener: jest.fn(),
  },
  route: {params: {radio: 'Cities'}},
};

describe('<GameScreen />', () => {
  it('has 7 child', () => {
    const tree: any = renderer
      .create(<GameScreen {...navigationPropsLanding} />)
      .toJSON();
    expect(tree.children.length).toBe(7);
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(<GameScreen {...navigationPropsLanding} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
