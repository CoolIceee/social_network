import React from 'react';
import PostsUsers from './PostsUsers';
import '../../../../scss/home/news.scss'
function News() {
    return (
      <div className='news_container'>
        <div className='news_header'>
          Новости
        </div>
        <PostsUsers />
      </div>
    )
}

export default News;