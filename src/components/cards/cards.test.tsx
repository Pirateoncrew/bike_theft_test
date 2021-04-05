import { fireEvent, render } from '@testing-library/react'
import { BikeInfoModel } from '../../model/dataModel'
import Cards from './cards'
describe('<Cards/>', () => {
  let bikeInfo: BikeInfoModel
  test('Cards component Init when empty model is passed', async () => {
    const component = render(<Cards data={bikeInfo} />)
  })
})
