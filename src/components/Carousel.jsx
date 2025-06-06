const Carousel = () => {
  return (
    <div className="carousel w-[full] h-[100vh]">
      <div id="slide1" className="carousel-item relative w-full">
        <img
          src="https://wallpaperbat.com/img/136573488-denver-skyline-main-mural-your-way.jpg"
          className="w-full object-fill"
        />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide4" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide2" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div id="slide2" className="carousel-item relative w-full">
        <img
          src="https://wallpaperbat.com/img/8665494-denver-skyline-mural-wallpaper.jpg"
          className="w-full object-fill"
        />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide1" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide3" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div id="slide3" className="carousel-item relative w-full">
        <img
          src="https://wallpaperbat.com/img/166994504-denver-skyline-wallpaper-35-image.jpg"
          className="w-full object-fill"
        />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide2" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide4" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div id="slide4" className="carousel-item relative w-full">
        <img
          src="https://wallpaperbat.com/img/166994519-the-beautiful-city-of-denver-wallpaper.jpg"
          className="w-full object-fill"
        />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide3" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide1" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
