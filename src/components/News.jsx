import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  const toUpper = (str) => {
    return str
      .toLowerCase()
      .split(' ')
      .map(function (word) {
        return word[0].toUpperCase() + word.substr(1)
      })
      .join(' ')
  }

  const updateNews = async () => {
    props.setProgress(30)
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&page=1&pageSize=${props.pageSize}&page=${page}&apiKey=${props.apikey}`
    setLoading(true)
    let data = await fetch(url)
    let parseddata = await data.json()
    props.setProgress(50)
    setArticles(parseddata.articles)
    setTotalResults(parseddata.totalResults)
    setLoading(false)
    props.setProgress(100)
  }

  useEffect(() => {
    updateNews()
    document.title = `NewsBuzz || ${toUpper(props.category.toUpperCase())}`
  }, [])

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apikey}&page=${page+1}&pageSize=${props.pageSize}`
    setPage(page + 1)
    let data = await fetch(url)
    let parsedData = await data.json()
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    setLoading(false)
  }

  return (
    <>
      <h2 className="text-center" style={{ margin: '35px 0px', marginTop:'90px' }}>
        NewsBuzz - Top HeadLines From {toUpper(props.category)}
      </h2>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((elm,ind) => (
              <div className="col-md-4 " key={ind}>
                <NewsItem
                  title={elm.title ? elm.title.slice(0, 40) : ''}
                  description={
                    elm.description ? elm.description.slice(0, 88) : ''
                  }
                  imgurl={elm.urlToImage}
                  url={elm.url}
                  time={elm.publishedAt}
                  author={elm.author}
                  source={elm.source.name}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  )
}
News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general',
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

export default News
