import React from 'react';
import { shallow } from 'enzyme';
import RegisterUser from '../components/registerUser';
describe('RegisterUser', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<RegisterUser debug />);
  
    expect(component).toMatchSnapshot();
  });
});