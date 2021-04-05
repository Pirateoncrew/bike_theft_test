import { fireEvent, render } from '@testing-library/react'
import { BikeInfoModel } from '../../model/dataModel'
import Modal from './modal'
describe('<Modal/>', () => {
  let bikeInfo: BikeInfoModel
  let show = true
  const showEvent = () => (show = !show)
  test('Modal Component on empty model', async () => {
    const component = render(
      <Modal selectedData={bikeInfo} show={show} showEvent={showEvent} />
    )
  })
  test('Modal on close Event', async () => {
    const component = render(
      <Modal selectedData={bikeInfo} show={show} showEvent={showEvent} />
    )
    fireEvent.click(component.getByLabelText('Close'))
    expect(show).toBe(false)
  })
})
