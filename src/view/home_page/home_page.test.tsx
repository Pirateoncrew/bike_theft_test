import { render } from '@testing-library/react'
import HomePage from './home_page'
import Input from '../../components/input/input'
describe('<HomePage/>', () => {
  test('Display the homepage view', async () => {
    const component = render(<HomePage />)
  })
})
