import React, { useEffect, useState } from 'react'
import millify from 'millify'
import {Link} from 'react-router-dom'
import {Card, Row, Col, Input} from 'antd'
import { useGetCryptosQuery } from '../services/cryptoApi'
import Loader from './Loader'


const Cryptocurrencies = ({simplified}) => {
  const count = simplified ? 10 :100;
  const {data:cryptosList, isFetching} = useGetCryptosQuery(count)
  const [searchTerm, setSearchTerm] = useState('')
  const [cryptos, setCryptos] = useState([])

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm))
    setCryptos(filteredData)
  }, [cryptosList, searchTerm])
  if(isFetching) return <Loader />
  return (
    <>
    {!simplified && (<div className='search-crypto'>
      <Input placeholder='Search Cryptocurrency' onChange={(e) => setSearchTerm(e.target.value)} />
    </div> )}
    <Row gutter={[32, 32]} className='crypto-card-container'>
      {cryptos?.map((currency) => (
        <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.id}>
          <Link to={`/crypto/${currency.uuid}`}>
            <Card title={`${currency.rank}. ${currency.name}`}
            extra={<img className='crypto-image' src={currency.iconUrl} />}
            hoverable >
              <p>Price: {millify(currency.price)}</p>
              <p>Market Cap: {millify(currency.marketCap)}</p>
              <p>daily Change: {millify(currency.change)}</p>
            </Card>
          </Link>
        </Col> 
      ))}
    </Row>
    </>
  )
}

export default Cryptocurrencies
