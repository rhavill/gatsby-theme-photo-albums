import breadcrumbs from './breadcrumbs'

describe("breadcrumbs", () => {
  it("has single link for root path", () => {
    const crumbs = breadcrumbs('/')
    expect(crumbs.length).toEqual(1)
    expect(crumbs[0].path).toEqual('/')
  })
  it("has two links for top-level directory", () => {
    const crumbs = breadcrumbs('/level-one')
    expect(crumbs.length).toEqual(2)
    expect(crumbs[0].path).toEqual('/')
    expect(crumbs[1].path).toEqual('/level-one')
  })
  it("has three links for second-level directory", () => {
    const crumbs = breadcrumbs('/level-one/level-two')
    expect(crumbs.length).toEqual(3)
    expect(crumbs[0].path).toEqual('/')
    expect(crumbs[1].path).toEqual('/level-one')
    expect(crumbs[2].path).toEqual('/level-one/level-two')
  })
  it("can handle trailing slash \"/\" in path", () => {
    const crumbs = breadcrumbs('/level-one/level-two/')
    expect(crumbs.length).toEqual(3)
    expect(crumbs[0].path).toEqual('/')
    expect(crumbs[1].path).toEqual('/level-one')
    expect(crumbs[2].path).toEqual('/level-one/level-two')
  })
  it("creates a \"title case\" title for each directory level", () => {
    const crumbs = breadcrumbs('/level-one/level-two/')
    expect(crumbs.length).toEqual(3)
    expect(crumbs[1].title).toEqual('Level One')
    expect(crumbs[2].title).toEqual('Level Two')
  })
})