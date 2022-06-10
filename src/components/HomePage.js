import { Col, Row, Statistic, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { useGetCoinsQuery } from '../services/cryptoApi'
import millify from 'millify'
import { Cryptocurrencies, News } from '.'

const { Title } = Typography

const HomePage = () => {
  const maxCount = 10

  const { data, isFetching } = useGetCoinsQuery(20)
  const globalStats = data?.data?.stats

  return isFetching ? (
    <Title level={2} className='header'>
      Loading...
    </Title>
  ) : (
    <>
      <Title level={2} className='header'>
        Global Crypto Stats
      </Title>
      <Row>
        <Col span={12}>
          <Statistic title='Total Cryptocurrencies' value={globalStats.total} />
        </Col>
        <Col span={12}>
          <Statistic
            title='Total Exchanges'
            value={millify(globalStats.totalExchanges)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title='Total Market Cap'
            value={millify(globalStats.totalMarketCap)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title='Total 24h Volume'
            value={millify(globalStats.total24hVolume)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title='Total Markets'
            value={millify(globalStats.totalMarkets)}
          />
        </Col>
      </Row>
      <div className='home-heading-container'>
        <Title level={3} className='home-title'>
          Top 10 Cryptocurrencies in the world
        </Title>
        <Title level={5} className='show-more'>
          <Link to='/cryptocurrencies'>Show More</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified />
      <div className='home-heading-container'>
        <Title level={3} className='home-title'>
          Latest Crypto News
        </Title>
        <Title level={5} className='show-more'>
          <Link to='/news'>Show More</Link>
        </Title>
      </div>
      <News simplified />
    </>
  )
}

export default HomePage
