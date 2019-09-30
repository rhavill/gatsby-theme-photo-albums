import breadcrumbs from './breadcrumbs'

describe("breadcrumbs", () => {
  it("has single link for root path", () => {
    const crumbs = breadcrumbs('/')
    expect(crumbs.length).toBe(1)
    expect(crumbs[0].path).toBe('/')
  })
  it("has two links for top-level directory", () => {
    const crumbs = breadcrumbs('/level-one')
    expect(crumbs.length).toBe(2)
    expect(crumbs[0].path).toBe('/')
    expect(crumbs[1].path).toBe('/level-one')
  })
  it("has three links for second-level directory", () => {
    const crumbs = breadcrumbs('/level-one/level-two')
    expect(crumbs.length).toBe(3)
    expect(crumbs[0].path).toBe('/')
    expect(crumbs[1].path).toBe('/level-one')
    expect(crumbs[2].path).toBe('/level-one/level-two')
  })
  it("can handle trailing slash \"/\" in path", () => {
    const crumbs = breadcrumbs('/level-one/level-two/')
    expect(crumbs.length).toBe(3)
    expect(crumbs[0].path).toBe('/')
    expect(crumbs[1].path).toBe('/level-one')
    expect(crumbs[2].path).toBe('/level-one/level-two')
  })
  it("creates a \"title case\" title for each directory level", () => {
    const crumbs = breadcrumbs('/level-one/level-two/')
    expect(crumbs.length).toBe(3)
    expect(crumbs[1].title).toBe('Level One')
    expect(crumbs[2].title).toBe('Level Two')
  })
  it("removes file extension from breadcrumb", () => {
    const crumbs = breadcrumbs('/level-one/level-two/my-file.jpg')
    expect(crumbs.length).toBe(4)
    expect(crumbs[1].title).toBe('Level One')
    expect(crumbs[2].title).toBe('Level Two')
    expect(crumbs[3].title).toBe('My File')
  })
})