import React from 'react';
import renderer from 'react-test-renderer';

import WinScreen from '../WinScreen';

const navigationPropsLanding = {
  navigation: {
    navigate: jest.fn(),
    addListener: jest.fn(),
  },
  route: {params: {score: 0}},
};

describe('<WinScreen />', () => {
  it('has 5 child', () => {
    const tree: any = renderer
      .create(<WinScreen {...navigationPropsLanding} />)
      .toJSON();
    expect(tree.children.length).toBe(5);
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(<WinScreen {...navigationPropsLanding} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
