import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import './HomeBanner2.css';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

const HomeBanner2 = () => {
  const [data, setData] = React.useState<any[] | null>(null);

  const getData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/workoutplans/workouts`, {
        method: 'GET',
        credentials: 'include',
      });
      const result = await response.json();
      console.log(result);
      if (result.ok) {
        setData(result.data);
      } else {
        setData([]);
      }
    } catch (err) {
      console.error('Failed to fetch workouts:', err);
      setData([]);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {data && (
        <div>
          <h1 className='mainhead1'>Fit Realm</h1>
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 50,
              },
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {data.map((item, index) => (
              <SwiperSlide key={index}>
                <div
                  className='swiper-slide'
                  style={{
                    backgroundImage: `url(${item.imageURL})`,
                  }}
                  onClick={() => {
                    window.location.href = `/workout?id=${item._id}`;
                  }}
                >
                  <div className='swiper-slide-content'>
                    <h2>{item.name}</h2>
                    <p>{item.durationInMin} min</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </>
  );
};

export default HomeBanner2;
