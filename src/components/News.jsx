import React, { useState } from 'react'
import { Select, Typography,  Row, Col, Avatar, Card } from 'antd'
import moment from 'moment'
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi'
import { useGetCryptosQuery } from '../services/cryptoApi'
import Loader from './Loader'

const {Text, Title} = Typography
const {Option} = Select
const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';
const News = ({simplified}) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
  const {data: cryptoNews} = useGetCryptoNewsQuery({newsCategory, count: simplified ? 6 :12})
  const {data} = useGetCryptosQuery(100)
  // console.log(cryptoNews)
  if(!cryptoNews?.value) return <Loader />
  return (
    <Row gutter={[24,24]}>
      {!simplified && (
        <Col span={24}>
          <Select 
          showSearch
          className='select-news'
          placeholder='Select a crypto'
          optionFilterProp='childen'
          onChange={(value) => setNewsCategory(value)}    
          filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase())}>
            <Option value='Cryptocurrency'>Cryptocurrency</Option>
            {data?.data?.coins.map((coin) => <Option value ={coin.name}>{coin.name}</Option>)}
          </Select>
        </Col>
      )}
      {cryptoNews.value.map((news, i) => (
        < Col sx={24} sm={12} lg={8} key={i}>
          < Card hoverable className='news-card'>
            < a href={news.url} target='_blank' rel='noreferrer'>
              < div className='news-image-container'>
                <Title className='news-title' level={4}>{news.name}</Title>
                <img style={{maxWidth:'200px',  maxHeight:'100px'}} src={news?.image?.thumbnail?.contentUrl || demoImage} />
              </div>
              <p>
                {news.description >  100 ? `${news.description.susbstring(0,100)}...` : news.description}
              </p>
              <div className='provider-container'>
                <div>
                  <Avatar src={news.provider[0]?.iamge?.thumbnail?.contentUrl || demoImage} alt='image' />
                  <Text className='provider-name'>{news.provider[0]?.name}</Text>
                </div>
                <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default News
