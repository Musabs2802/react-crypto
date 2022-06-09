import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Input } from 'antd'

const Cryptocurrencies = ({ coins, simplified }) => {
  return (
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
