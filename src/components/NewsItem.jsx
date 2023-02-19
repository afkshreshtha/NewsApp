import React from 'react'

const NewsItem = (props) =>{

    let { title, description, imgurl, url, time, author, source } = props
    return (
      <div className="my-3">
        <div className="card">
          <span
            className="position-absolute top-0  translate-middle badge rounded-pill bg-info text-dark"
            style={{ left: '50%', zIndex: 1 }}
          >
            {source}
          </span>
          <img
            src={
              !imgurl
                ? 'https://cdn.pixabay.com/photo/2015/02/15/09/33/news-636978_1280.jpg'
                : imgurl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title} </h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-muted">
                By {!author ? 'Unknown' : author} on{' '}
                {new Date(time).toUTCString()}
              </small>
            </p>
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="btn btn-info btn-sm"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    )
  }
  
export default NewsItem
