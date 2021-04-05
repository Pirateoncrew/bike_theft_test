import { fireEvent, render } from '@testing-library/react'
import Input from './input'
describe('<Input/>', () => {
  let onKeyPress = false
  const passMethod = (event: any) => (onKeyPress = true)
  let value = ''
  const onChange = (event: any) => (value = 'changed')
  const setup = () => {
    const utils = render(<Input onClick={passMethod} onChange={onChange} />)
    const input: any = utils.getByLabelText('cost-input')
    return {
      input,
      ...utils
    }
  }
  test('Input field value init and on enter press', async () => {
    const { input } = setup()
    fireEvent.change(input, { target: { value: 'illegal' } })
    expect(input.value).toBe('illegal')
    fireEvent.keyDown(input)
    expect(onKeyPress).toBe(true)
  })
  test('Input field value changes ', async () => {
    const { input } = setup()
    fireEvent.change(input)
    expect(value).toBe('changed')
  })
})
