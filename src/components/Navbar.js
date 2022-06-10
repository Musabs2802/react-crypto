import { Link } from 'react-router-dom'
import { Avatar, Typography, Menu } from 'antd'
import icon from '../images/cryptocurrency.png'
import {
  BulbOutlined,
  FundOutlined,
  HomeOutlined,
  MoneyCollectOutlined,
} from '@ant-design/icons'

const Navbar = () => {
  return (
    <div className='nav-container'>
      <div className='logo-container'>
        <Avatar src={icon} size='large' />
        <Typography.Title level={2} className='logo'>
          <Link to='/'>Cryptoverse</Link>
        </Typography.Title>
      </div>
      <Menu
        theme='dark'
        items={[
          {
            key: 'home',
            icon: <HomeOutlined />,
            label: <Link to='/'>Home</Link>,
          },
          {
            key: 'cryptocurrencies',
            icon: <FundOutlined />,
            label: <Link to='/cryptocurrencies'>Cryptocurrencies</Link>,
          },
          {
            key: 'exchanges',
            icon: <MoneyCollectOutlined />,
            label: <Link to='/exchanges'>Exchanges</Link>,
          },
          {
            key: 'news',
            icon: <BulbOutlined />,
            label: <Link to='/news'>News</Link>,
          },
        ]}
      />
    </div>
  )
}

export default Navbar
