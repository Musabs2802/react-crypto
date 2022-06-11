import { useGetNewsQuery } from '../services/newsApi'

const News = ({ simplified }) => {
  const maxCount = simplified ? 10 : 100
  const { data, isFetching } = useGetNewsQuery({
    category: 'cryptocurrency',
    count: maxCount,
  })

  console.log(data)

  return <div>News</div>
}

export default News
