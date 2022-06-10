import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Typography } from 'antd'
import { useGetCryptosQuery } from '../services/cryptoApi'

const { Title } = Typography

const Cryptocurrencies = ({ simplified }) => {
  const maxCount = 10

  const { data, isFetching } = useGetCryptosQuery(simplified ? maxCount : null)
  const coins = data?.data?.coins

  return isFetching ? (
    <Title level={2} className='header'>
      Loading...
    </Title>
  ) : (
    <>
      <Row gutter={[32, 32]} className='crypto-card-container'>
        {coins.map((c) => (
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
