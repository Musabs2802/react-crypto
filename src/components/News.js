import { Avatar, Card, Col, Row, Select, Typography } from 'antd'
import moment from 'moment'
import { useState } from 'react'
import { useGetCoinsQuery } from '../services/cryptoApi'
import { useGetNewsQuery } from '../services/newsApi'
import { MAX_NEWS_COUNT } from '../utils/constants'
import Loader from './Loader'

const { Title, Text } = Typography
const { Option } = Select

const placeholderImg =
  'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News'

const News = ({ simplified }) => {
  const maxCount = simplified ? 6 : MAX_NEWS_COUNT
  const [getCategory, setCategory] = useState('Cryptocurrencies')
  const { data, isFetching } = useGetNewsQuery({
    category: getCategory,
    count: maxCount,
  })
  const { data: getCoins } = useGetCoinsQuery(100)

  console.log(getCoins)

  return isFetching ? (
    <Loader />
  ) : (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className='select-news'
            placeholder='Search'
            value={getCategory}
            optionFilterProp='children'
            onChange={(v) => setCategory(v)}
            filterOption={(input, options) =>
              options.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value='Cryptocurrencies'>Cryptocurrencies</Option>
            {getCoins?.data?.coins?.map((c) => (
              <Option value={c.name}>{c.name}</Option>
            ))}
          </Select>
        </Col>
      )}
      {data?.value?.map((news, i) => (
        <Col key={i} xs={24} sm={12} lg={8}>
          <Card hoverable classname='news-card'>
            <a href={news.url} target='_blank' rel='noreferrer'>
              <div className='news-image-container'>
                <Title level={4} className='news-title'>
                  {news.name}
                </Title>
                <img
                  style={{ maxWidth: '200px', maxHeight: '100px' }}
                  src={news?.image?.thumbnail?.contentUrl || placeholderImg}
                  alt='news'
                ></img>
              </div>
              <p>
                {news.description.length > 100
                  ? `${news.description.substring(0, 100)}...`
                  : news.description}
              </p>
              <div className='provider-container'>
                <div>
                  <Avatar
                    src={
                      news.provider[0]?.image?.thumbnail?.contentUrl ||
                      placeholderImg
                    }
                    alt=''
                  />
                  <Text className='provider-name'>
                    {news.provider[0]?.name}
                  </Text>
                </div>
                <Text>
                  {moment(news.datePublished).startOf('ss').fromNow()}
                </Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default News
