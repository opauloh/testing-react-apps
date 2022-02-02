// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import {renderHook, act as actHook} from '@testing-library/react-hooks'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

// 🐨 create a simple function component that uses the useCounter hook
// and then exposes some UI that our test can interact with to test the
// capabilities of this hook
// 💰 here's how to use the hook:
// const {count, increment, decrement} = useCounter()

const TestUseCounterHook = () => {
  const {count, increment, decrement} = useCounter()
  return (
    <>
      <div data-testid="counter">{count}</div>
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
    </>
  )
}

test('exposes the count and increment/decrement functions', () => {
  // 🐨 render the component
  render(<TestUseCounterHook />)
  // 🐨 get the elements you need using screen
  const counter = screen.getByTestId('counter')
  // console.log(screen.debug())
  // 🐨 assert on the initial state of the hook
  expect(counter).toHaveTextContent('0')
  // 🐨 interact with the UI using userEvent and assert on the changes in the UI
  const increment = screen.getByRole('button', {name: /increment/i})

  userEvent.click(increment)
  expect(counter).toHaveTextContent('1')

  const decrement = screen.getByRole('button', {name: /decrement/i})
  userEvent.click(decrement)
  expect(counter).toHaveTextContent('0')
})
test('exposes the count and increment/decrement functions w/ Fake Component', () => {
  let result
  function TestComponent() {
    result = useCounter()
    return null
  }
  // 🐨 render the component
  render(<TestComponent />)
  // 🐨 get the elements you need using screen
  // console.log(screen.debug())
  // 🐨 assert on the initial state of the hook
  expect(result.count).toBe(0)
  // 🐨 interact with the UI using userEvent and assert on the changes in the UI
  act(() => result.increment())
  expect(result.count).toBe(1)

  act(() => result.decrement())
  expect(result.count).toBe(0)
})

test('testing initialCount w/ Fake Component', () => {
  const result = {}
  function TestComponent(props) {
    Object.assign(result, useCounter(props))
    return null
  }

  // 🐨 render the component
  render(<TestComponent initialCount={2} />)
  // 🐨 get the elements you need using screen
  // console.log(screen.debug())
  // 🐨 assert on the initial state of the hook
  expect(result.count).toBe(2)
  // 🐨 interact with the UI using userEvent and assert on the changes in the UI
  act(() => result.increment())
  expect(result.count).toBe(3)

  act(() => result.decrement())
  expect(result.count).toBe(2)
})

function setup({initialProps} = {}) {
  const result = {}
  function TestComponent() {
    result.current = useCounter(initialProps)
    return null
  }
  render(<TestComponent />)
  return result
}

test('testing customization of the step w/ setup function', () => {
  const result = setup({initialProps: {step: 2}})

  // 🐨 get the elements you need using screen
  // console.log(screen.debug())
  // 🐨 assert on the initial state of the hook
  expect(result.current.count).toBe(0)
  // 🐨 interact with the UI using userEvent and assert on the changes in the UI
  act(() => result.current.increment())
  expect(result.current.count).toBe(2)

  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

test('testing customization of the step w/ react-hooks', () => {
  const {result} = renderHook(useCounter, {initialProps: {step: 2}})

  // 🐨 get the elements you need using screen
  // console.log(screen.debug())
  // 🐨 assert on the initial state of the hook
  expect(result.current.count).toBe(0)
  // 🐨 interact with the UI using userEvent and assert on the changes in the UI
  actHook(() => result.current.increment())
  expect(result.current.count).toBe(2)

  actHook(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

/* eslint no-unused-vars:0 */
