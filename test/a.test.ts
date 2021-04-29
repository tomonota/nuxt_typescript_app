import { mount, Wrapper } from '@vue/test-utils'
import Index from '~/pages/index.vue'
import * as injector from '~/composition/store/injector'

const productStoreMock = {
  get products() {
    return [
      {
        productId: 101,
        productName: 'productA'
      }
    ]
  },
  async fetchProducts() {}
}

const authUserStoreMock = {
  get authUser() {
    return {
      userName: 'userA',
      email: 'a@a.com'
    }
  },
  setAuthUser() {}
}

let wrapper: Wrapper<Vue>

beforeEach(() => {
  jest
    .spyOn(injector, 'injectProductStore')
    .mockImplementation(() => productStoreMock)

  jest
    .spyOn(injector, 'injectAuthUserStore')
    .mockImplementation(() => authUserStoreMock)
  wrapper = mount(Index)
})

describe('index', () => {
  test('get users', async () => {
    await wrapper.get('button').trigger('click')
    const result = wrapper.find('.products').text()
    expect(result).toBe('101')
  })
})
