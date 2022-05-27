import { expect, test, describe, vi, beforeEach, afterEach } from 'vitest'
import { render, within,fireEvent, waitFor } from '@testing-library/react'
import Login from '../pages/login'
import { LoginContextProvider } from '../context/LoginContext'


describe('render login page y functions', ()=>{
  const mockSubmit = vi.fn(()=>1)
  const component = render(<LoginContextProvider><Login submitFormProps={mockSubmit} /></LoginContextProvider>)
  const form = within(component.getByTestId('form'))
  const submitButton = form.getByTestId('buttonSubmit')
  test('render page and form ', () => {
    expect(
      form
    ).toBeDefined()
  })
  test('render inputs', () => {
    const userinput = form.getByPlaceholderText('usuario')
    const passwordinput = form.getByPlaceholderText('contraseña')
    expect(
      userinput
    ).toBeDefined()
    expect(
      passwordinput
    ).toBeDefined()
    expect(
      userinput.getAttribute('type')
    ).toEqual('text')
    expect(
      passwordinput.getAttribute('type')
    ).toEqual('password')
  })
  test('render button', () => {
    expect(
      submitButton
    ).toBeDefined()
    expect(
      submitButton.getAttribute('type')
    ).toEqual('submit')
  })

  test('submit form',async()=>{
    const userinput = form.getByPlaceholderText('usuario')
    const passwordinput = form.getByPlaceholderText('contraseña')
    fireEvent.change(userinput, { target: { value: 'usuario' } })
    fireEvent.change(passwordinput, { target: { value: '12345678910' } })
    fireEvent.click(submitButton)
    await waitFor(()=>{
      expect(mockSubmit.mock.calls).toHaveLength(1)
    })
  })
})


