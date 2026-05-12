import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

function ProductSlider({ products }) {

 const filteredProducts = products.filter(
  (p) => p.rating >= 4
);

  return (

    <div className="container-fluid">

      <h3 className="mb-4">Trending Products</h3>

      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={4}
        navigation
        loop
        autoplay={{
          delay: 1500,
          disableOnInteraction: false
        }}
      >

        {filteredProducts.map((p) => (

          <SwiperSlide key={p.id}>

            <div className="card text-center p-3">

              <img
                src={`/images/${p.image}`}
                style={{ height: "150px", objectFit: "contain" }}
                alt={p.name}
              />

              <h6 className="mt-2">{p.name}</h6>

             
            <p>{"⭐".repeat(p.rating)}</p>
         

            </div>

          </SwiperSlide>

        ))}

      </Swiper>

    </div>

  );
}

export default ProductSlider;