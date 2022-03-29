import './scss/App.scss';
import Slider from 'react-slick';
import React, { useEffect, useRef, useState } from 'react';
import SliderItem from './components/SliderItem';
import Post from './components/Post';
import axios from 'axios';
import ReactLoading from 'react-loading';

function App() {
  const [users, setUsers] = useState();
  const [activeUser, setActiveUser] = useState('');
  const [posts, setPosts] = useState();
  const slider = useRef();

  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1260,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 660,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  async function getData() {
    const res = await axios.get('https://jsonplaceholder.typicode.com/users');
    console.log(res.data[0].name);
    setUsers(res.data);
    setActiveUser(res.data[0].name);
    getPosts(res.data[0].id, res.data[0].name);
  }

  async function getPosts(id, name) {
    setPosts();
    setActiveUser(name);
    const res = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
    console.log('posts ', res);
    setPosts(res.data.splice(0, 3));
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="app">
      <div className="container">
        <div className="content">
          <h1 className="content__title">Наши топ-блогеры</h1>
          <h3 className="content__subtitle">
            Лучшие специалисты в своем деле, <br />
            средний опыт работы в профессии - 27 лет
          </h3>
          <div className="content__slider">
            <div className="slider__arrows">
              <button className="slider__btn" onClick={() => slider.current.slickPrev()}>
                <img src="img/left-arrow.svg" alt="" className="slider__arrow-img" />
              </button>
              <button className="slider__btn" onClick={() => slider.current.slickNext()}>
                <img src="img/right-arrow.svg" alt="" className="slider__arrow-img" />
              </button>
            </div>
            {users && (
              <Slider ref={slider} {...sliderSettings}>
                {users.map((elem) => (
                  <SliderItem
                    onClick={() => getPosts(elem.id, elem.name)}
                    {...elem}
                    key={elem.id}
                    active={activeUser}
                  />
                ))}
              </Slider>
            )}
          </div>
          <div className="content__posts">
            {activeUser && (
              <h1 className="content__posts-title">3 актуальных поста {activeUser}</h1>
            )}
            {posts ? (
              <ul className="content__posts-list">
                {posts.map((elem) => (
                  <Post {...elem} key={elem.id} />
                ))}
              </ul>
            ) : (
              <ReactLoading type={'spin'} className="loading__spinner" color="#FE8700" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
