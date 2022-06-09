import {Link} from 'react-router-dom'
import { Avatar, Button, Typography, Menu } from "antd"
import icon from "../images/cryptocurrency.png"
import { BulbOutlined, FundOutlined, HomeOutlined, MoneyCollectOutlined } from '@ant-design/icons'

const Navbar = () => {
  return (
    <div className="nav-container">
        <div className="logo-container">
            <Avatar src={icon} size="large"/>
            <Typography.Title level={2} className="logo">
                <Link to='/'>Cryptoverse</Link>
            </Typography.Title>
        </div>
        <Menu theme="dark">
            <Menu.Item icon={<HomeOutlined />}><Link to="/">Home</Link></Menu.Item>
            <Menu.Item icon={<FundOutlined />}><Link to="/">Cryptocurrencies</Link></Menu.Item>
            <Menu.Item icon={<MoneyCollectOutlined />}><Link to="/">Exchanges</Link></Menu.Item>
            <Menu.Item icon={<BulbOutlined />}><Link to="/">News</Link></Menu.Item>
        </Menu>
    </div>    
  )
}

export default Navbar