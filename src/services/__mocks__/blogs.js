const blogs = [
  {
    id: '1',
    title: 'Test blog',
    author: 'Test author',
    url: 'testurl.com',
    user: { name: 'Tester' },
    likes: 5
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = () => null

export default { getAll, setToken }
