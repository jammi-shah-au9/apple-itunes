import React from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './redux/store' 
import { render,cleanup } from '@testing-library/react';
import App from './App';
import { MemoryRouter as Router } from 'react-router-dom'
import renderer from 'react-test-renderer'

afterEach(cleanup)

it("renders without crashing",()=>{
  const div = document.createElement("div")
  ReactDOM.render(<Router><Provider store={store}><App /></Provider></Router>,div)
})

test('renders welcome to apple itunes', () => {
  const { getByText } = render(<Router><Provider store={store}><App /></Provider></Router>);
  const linkElement = getByText(/Welcome To Apple iTunes/i);
  expect(linkElement).toBeInTheDocument();
});

it("matches app snapshot",()=>{
  const apptree = renderer.create(<Router><Provider store={store}><App /></Provider></Router>).toJSON();
  expect(apptree).toMatchSnapshot();
})

