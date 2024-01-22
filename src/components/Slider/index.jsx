import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { useNavigate } from "react-router-dom";

const Slider = ({ listings }) => {
  const navigate = useNavigate();
  const formatValue = (value) => {
    return new Intl.NumberFormat("en-HOSSDDG", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value);
  };

  return (
    listings && (
      <Swiper
        slidesPerView={1}
        modules={[Navigation, Pagination, EffectFade, Autoplay]}
        navigation
        pagination={{ type: "bullets" }}
        effect="fade"
        autoplay={{ delay: 3000 }}
      >
        {listings.map(({ data, id }) => (
          <SwiperSlide
            key={id}
            onClick={() => navigate(`/category/${data.type}/${id}`)}
          >
            <div
              className="relative w-full overflow-hidden h-[300px]"
              style={{
                background: `url(${data.imgUrls[0]}) center no-repeat`,
                backgroundSize: "cover",
              }}
            ></div>
            <p className="absolute text-white left-1 top-3 font-medium max-w-[90%] bg-[#457b9d] shadow-lg opacity-90 p-2 rounded-br-3xl">
              {data.name}
            </p>
            <p className="absolute text-white left-3 bottom-0 font-medium max-w-[90%] bg-[#e63946] shadow-lg opacity-90 p-2 rounded-tr-3xl">
              {formatValue(data.regularPrice)}
              <span>{data.type === "rent" && " / month"}</span>
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
    )
  );
};

export default Slider;
