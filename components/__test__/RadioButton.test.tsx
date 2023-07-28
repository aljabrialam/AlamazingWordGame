import React from 'react';
import renderer from 'react-test-renderer';

import RadioButton from '../RadioButton';

const navigationPropsLanding = {
  navigation: {
    navigate: jest.fn(),
    addListener: jest.fn()
  },
  route: {params: {radio: 'Cities'}}
}

const data = [
    {
      label: 'Cities',
      value: 'Cities'
    },
    {
      label: 'Foods',
      value: 'Foods'
    },
    {
      label: 'Animals',
      value: 'Animals'
    }
  ]

describe('<RadioButton />', () => {
  it('has 1 child', () => {

    const tree: any = renderer.create(<RadioButton data={data} styling={{ color: 'blue', size: 30 }} {...navigationPropsLanding} />).toJSON();
    expect(tree.children.length).toBe(3);
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(<RadioButton data={data} styling={{ color: 'blue', size: 30 }} {...navigationPropsLanding} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});