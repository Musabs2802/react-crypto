import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Typography, Input } from 'antd'
import { useGetCryptosQuery } from '../services/cryptoApi'
import { useEffect, useState } from 'react'
import { MAX_COINS_COUNT } from '../utils/constants'

const { Title } = Typography

const Cryptocurrencies = ({ simplified }) => {
  const maxCount = simplified ? 10 : MAX_COINS_COUNT
  const { data, isFetching } = useGetCryptosQuery(maxCount)
  const [getCoins, setCoins] = useState()

  const searchCoin = (search) => {
    setCoins(
      data?.data?.coins.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
      )
    )
  }

  useEffect(() => {
    setCoins(data?.data?.coins)
  }, [data])

  return isFetching ? (
    <Title level={2} className='header'>
      Loading...
    </Title>
  ) : (
    <>
      {!simplified && (
        <div className='search-crypto'>
          <Input
            placeholder='Search...'
            onChange={(e) => searchCoin(e.target.value)}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className='crypto-card-container'>
        {getCoins?.map((c) => (
          <Col key={c.uuid} xs={24} sm={12} lg={6} className='crypto-card'>
            <Link to={`/crypto/${c.uuid}`}>
              <Card
                title={`${c.rank}. ${c.name}`}
                extra={<img className='crypto-image' src={c.iconUrl} />}
                hoverable
              >
                <p>Price: {millify(c.price)}</p>
                <p>Market Cap: {millify(c.marketCap)}</p>
                <p>Daily Change: {millify(c.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Cryptocurrencies
