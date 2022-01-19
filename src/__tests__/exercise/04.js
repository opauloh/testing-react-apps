// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'
// import faker from 'faker'
const {build, fake} = require('@jackfranklin/test-data-bot')

// const buildLoginForm = override => {
//   const username = faker.internet.userName()
//   const password = faker.internet.password()

//   return {username, password, ...override}
// }

const userBuilder = build({
  fields: {
    username: fake(faker => faker.internet.userName()),
    password: fake(faker => faker.internet.password()),
  },
})

test('submitting the form calls onSubmit with username and password', () => {
  // 🐨 create a variable called "submittedData" and a handleSubmit function that
  // accepts the data and assigns submittedData to the data that was submitted
  // let submittedData
  // 💰 if you need a hand, here's what the handleSubmit function should do:
  // const handleSubmit = data => (submittedData = data)
  const handleSubmit = jest.fn()
  // 🐨 render the login with your handleSubmit function as the onSubmit prop
  render(<Login onSubmit={handleSubmit} />)
  // screen.debug()
  // 🐨 get the username and password fields via `getByLabelText`
  // const username = 'chucknorris'
  // const password = 'i need no password'
  // const {username, password} = buildLoginForm({password: 'lol'})
  const {username, password} = userBuilder({
    overrides: {
      password: 'lol',
    },
  })
  // 🐨 use userEvent.type to change the username and password fields to whatever you want
  userEvent.type(screen.getByLabelText(/username/i), username)
  userEvent.type(screen.getByLabelText(/password/i), password)
  // 🐨 click on the button with the text "Submit"
  userEvent.click(screen.getByRole('button', {name: /submit/i}))
  // assert that submittedData is correct
  // 💰 use `toEqual` from Jest: 📜 https://jestjs.io/docs/en/expect#toequalvalue
  // expect(submittedData).toEqual({
  expect(handleSubmit).toHaveBeenCalledWith({
    username,
    password: 'lol',
  })
  expect(handleSubmit).toHaveBeenCalledTimes(1)
})

/*
eslint
  no-unused-vars: "off",
*/
