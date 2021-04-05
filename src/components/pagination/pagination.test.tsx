import { fireEvent, render } from '@testing-library/react'
import Enzyme, { mount, shallow } from 'enzyme'
import { BikeInfoModel, DataModel } from '../../model/dataModel'
import Pagination from './pagination'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })
describe('<Pagination/>', () => {
  const clearEvent = false
  const size = 10
  const data: DataModel[] = []
  const setup = () => {
    const utils = render(<Pagination data={data} size={size} />)
    const instance = shallow(<Pagination data={data} size={size} />)
    const prev: any = utils.getByLabelText('prev')
    const next: any = utils.getByLabelText('next')
    const pageNum: any = utils.getByLabelText('page')
    return {
      pageNum,
      prev,
      next,
      ...utils
    }
  }
  test('Pagination prev and next button', async () => {
    const { pageNum, prev, next } = setup()
    let currentPage = 1
    const mockNext = jest
      .fn()
      .mockImplementation(() => Promise.resolve(currentPage++))
    fireEvent.click(next)
    fireEvent.click(prev)
  })
})
