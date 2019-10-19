const {onCreatePage} = require('./gatsby-node')

const createPage = jest.fn()
const deletePage = jest.fn()

describe("gatsby-node", () => {

  it("onCreatePage calls createPage and deletePage if page path is \"/\"", () => {
    const actions = {
      createPage,
      deletePage
    }
    const page = {
      path: '/'
    }
    onCreatePage({page, actions})
    expect(createPage.mock.calls.length).toBe(1)
    expect(deletePage.mock.calls.length).toBe(1)
  })
 
})