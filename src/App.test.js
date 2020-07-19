// import React from 'react';
// import { render } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme'
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('MyComponent', () => {
  describe('interactions', () => {
    let wrapper
    beforeEach(() => {
      wrapper = shallow(<App />)
    })

    it('foo to equal bar', () => {
      expect(wrapper.state().name).toEqual('xitpro')
    })
  })
})
