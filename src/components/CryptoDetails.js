import {
  CheckOutlined,
  DollarCircleOutlined,
  ExclamationCircleOutlined,
  FundOutlined,
  MoneyCollectOutlined,
  NumberOutlined,
  StopOutlined,
  ThunderboltOutlined,
  TrophyOutlined,
} from '@ant-design/icons'
import { Col, Row, Select, Typography } from 'antd'
import HTMLReactParser from 'html-react-parser'
import millify from 'millify'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetCoinQuery } from '../services/cryptoApi'
import Loader from './Loader'

const { Title, Text } = Typography

const CryptoDetails = () => {
  const { coinId } = useParams()
  const [getTimePeriod, setTimePeriod] = useState('7d')
  const { data, isFetching } = useGetCoinQuery(coinId)
  const coinDetails = data?.data?.coin

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y']

  const stats = [
    {
      title: 'Price to USD',
      value: `$ ${coinDetails?.price && millify(coinDetails?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: 'Rank', value: coinDetails?.rank, icon: <NumberOutlined /> },
    {
      title: '24h Volume',
      value: `$ ${coinDetails?.volume && millify(coinDetails?.volume)}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: 'Market Cap',
      value: `$ ${coinDetails?.marketCap && millify(coinDetails?.marketCap)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: 'All-time-high(daily avg.)',
      value: `$ ${
        coinDetails?.allTimeHigh?.price &&
        millify(coinDetails?.allTimeHigh?.price)
      }`,
      icon: <TrophyOutlined />,
    },
  ]

  const genericStats = [
    {
      title: 'Number Of Markets',
      value: coinDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: 'Number Of Exchanges',
      value: coinDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: 'Aprroved Supply',
      value: coinDetails?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: 'Total Supply',
      value: `$ ${
        coinDetails?.supply?.total && millify(coinDetails?.supply?.total)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: 'Circulating Supply',
      value: `$ ${
        coinDetails?.supply?.circulating &&
        millify(coinDetails?.supply?.circulating)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ]

  return isFetching ? (
    <Loader />
  ) : (
    <Col className='coin-detail-container'>
      <Col className='coin-heading-container'>
        <Title level={3} className='coin-name'>
          {coinDetails.name} ({coinDetails.symbol}) Price
        </Title>
        <p>
          {coinDetails.name} live price in US dollars. View value statistics,
          market cap and supply.
        </p>
      </Col>
      <Select
        defaultValue={getTimePeriod}
        className='select-timeperiod'
        placeholder='Select Time Period'
        onChange={(v) => setTimePeriod(v)}
      >
        {time.map((t) => (
          <Select.Option key={t}>{t}</Select.Option>
        ))}
      </Select>

      <Col className='stats-container'>
        <Col className='coin-value-statistics'>
          <Col className='coin-value-statistics-heading'>
            <Title level={3} className='coin-details-heading'>
              {coinDetails.name} Value Statistics
            </Title>
            <p>An overview showing the stats of {coinDetails.name}</p>
          </Col>
          {stats.map(({ title, value, icon }) => (
            <Col key={title} className='coin-stats'>
              <Col className='coin-stats-name'>
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Col>
                <Text className='stats'>{value}</Text>
              </Col>
            </Col>
          ))}
        </Col>
        <Col className='other-stats-info'>
          <Col className='coin-value-statistics-heading'>
            <Title level={3} className='coin-details-heading'>
              Other Statistics
            </Title>
            <p>An overview showing the stats of all cryptocurrencies</p>
          </Col>
          {genericStats.map(({ title, value, icon }) => (
            <Col key={title} className='coin-stats'>
              <Col className='coin-stats-name'>
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Col>
                <Text className='stats'>{value}</Text>
              </Col>
            </Col>
          ))}
        </Col>
      </Col>

      <Col className='coin-desc-link'>
        <Row className='coin-desc'>
          <Title level={3} className='coin-details-heading'>
            What is {coinDetails.name}
            {HTMLReactParser(coinDetails.description)}
          </Title>
        </Row>
        <Col className='coin-links'>
          <Title level={3} className='coin-details-heading'>
            {coinDetails.name} Links
          </Title>
          {coinDetails.links.map((l) => (
            <Row key={l.name} className='coin-link'>
              <Title level={5} className='link-name'>
                {l.type}
              </Title>
              <a href={l.url} target='_blank' rel='noreferrer'>
                {l.name}
              </a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  )
}

export default CryptoDetails
