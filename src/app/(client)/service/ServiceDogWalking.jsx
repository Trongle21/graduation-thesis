import React, { useEffect, useState } from "react";
import data from "@/app/data.json";
import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { getAllServicePack } from "@/redux/features/apiRequest";

const ServiceDogWalking = () => {
  const [isShowPetWalking, setIsShowPetWalking] = useState();

  const user = useSelector((state) => state.auth.login.currentUser);
  const servicePackList = useSelector(
    (state) => state.servicePack?.servicePacks?.allServicePacks?.servicePack
  );

  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      router.push("/service");
    }
    if (user?.accessToken) {
      getAllServicePack(user?.accessToken, dispatch);
    }
  }, []);

  const handleSubmit = () => {
    if (user) {
      const servicePackId = servicePackList[0]._id;

      router.push(`service/${servicePackId}`);
    } else {
      window.alert("Bạn cần đăng nhập để tiếp tục!");
    }
  };

  return (
    <div className="service--blog service-1 service--padding">
      <div className="service--wrapper row">
        <div className="service--image l-2 m-2">
          <img src="https://i.ibb.co/GsY6JWd/service-1.webp" alt="" />
        </div>
        <div className="service--des l-10 m-10">
          <div className="service--title">
            <div
              className="service--title--wrapper"
              onClick={() => setIsShowPetWalking(!isShowPetWalking)}
            >
              <div className="service--title__mb">
                <div className="service--image__mb">
                  <img src="https://i.ibb.co/GsY6JWd/service-1.webp" alt="" />
                </div>
                <h6>Đi dạo</h6>
              </div>
              <div
                className={`service--mb__icon ${
                  isShowPetWalking ? "rotate" : ""
                }`}
              >
                <AiOutlinePlus />
              </div>
            </div>
            <button className="btn btn--secondary" onClick={handleSubmit}>
              <Link
                href="#"
                className={`service--mb ${
                  isShowPetWalking ? "show--service" : "hidden--service"
                }`}
              >
                Đặt ngay
              </Link>
            </button>
          </div>
          <div
            className={`service--mb ${
              isShowPetWalking ? "show--service" : "hidden--service"
            }`}
          >
            <h5>Thứ Hai - Thứ Sáu / 9:00 sáng - 7:00 tối</h5>
            <p>
              Sức khỏe của thú cưng của bạn phụ thuộc vào lịch trình và sự đồng
              đều, đó là lý do tại sao chúng tôi chỉ định một Chuyên gia Chăm
              sóc Thú cưng và thời gian đón thường xuyên cho chúng.
            </p>

            <div className="service--content row">
              <div className="service--content__info cheap l-6 m-6 c-12">
                <div className="service--content__price">
                  <h6>30 phút</h6>
                  <h6>$30</h6>
                </div>
                <ul>
                  {data["dog_walking"]["30 minus"].map((service, index) => (
                    <li key={index}>
                      <p>{service.name}</p>
                      <p>${service.price}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="service--content__info expensive l-6 m-6 c-12">
                <div className="service--content__price">
                  <h6>60 phút</h6>
                  <h6>$50</h6>
                </div>
                <ul>
                  {data["dog_walking"]["60 minus"].map((service, index) => (
                    <li key={index}>
                      <p>{service.name}</p>
                      <p>${service.price}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDogWalking;
