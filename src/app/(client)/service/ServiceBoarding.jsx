import React, { useEffect, useState } from "react";
import data from "@/app/data.json";
import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { getAllServicePack } from "@/redux/features/apiRequest";

const ServiceBoarding = () => {
  const [isShowBoarding, setIsShowBoarding] = useState();
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
      const servicePackId = servicePackList[2]._id;

      router.push(`service/${servicePackId}`);
    } else {
      window.alert("Bạn cần đăng nhập để tiếp tục!");
    }
  };

  return (
    <div className="service--blog service-3 service--padding">
      <div className="service--wrapper row">
        <div className="service--image l-2 m-2">
          <img src="https://i.ibb.co/n81PbX5/service-3.webp" alt="" />
        </div>
        <div className="service--des l-10 m-10">
          <div className="service--title">
            <div
              className="service--title--wrapper"
              onClick={() => setIsShowBoarding(!isShowBoarding)}
            >
              <div className="service--title__mb">
                <div className="service--image__mb">
                  <img src="https://i.ibb.co/n81PbX5/service-3.webp" alt="" />
                </div>
                <h6>Trọ qua đêm</h6>
              </div>
              <div
                className={`service--mb__icon ${
                  isShowBoarding ? "rotate" : ""
                }`}
              >
                <AiOutlinePlus />
              </div>
            </div>
            <button className="btn btn--secondary" onClick={handleSubmit}>
              <Link
                href="#"
                className={`service--mb ${
                  isShowBoarding ? "show--service" : "hidden--service"
                }`}
              >
                Đặt ngay
              </Link>
            </button>
            <Link
              href="https://pawpartner.com/throw-me-a-bone---525-w-52nd-st"
              className={`service--mb ${
                isShowBoarding ? "show--service" : "hidden--service"
              }`}
            >
              <button className="btn btn--primary">Trang blog</button>
            </Link>
          </div>
          <div
            className={`service--mb ${
              isShowBoarding ? "show--service" : "hidden--service"
            }`}
          >
            <h5>Thứ Hai - Chủ Nhật / 24 giờ mỗi ngày</h5>
            <p>
              Dịch vụ nhận nuôi qua đêm của chúng tôi mang lại giải pháp thuận
              tiện cho những chú chó năng động hơn. Mỗi lần lưu trú 24 giờ bao
              gồm chăm sóc ban ngày, đi dạo, tất cả các bữa ăn và hình ảnh hàng
              ngày. Camera trực tuyến cũng có sẵn trong giờ chăm sóc để bạn kiểm
              tra bất cứ lúc nào và xem thú cưng của bạn đang làm gì.
            </p>

            <div className="service--content row">
              <div className="service--content__info boarding l-12 m-12 c-12">
                <div className="service--content__price">
                  <h6>Trọ qua đêm *</h6>
                </div>
                <ul>
                  {data["boarding"].map((service, index) => (
                    <li key={index}>
                      <p>{service.name}</p>
                      <p>
                        ${service.price} / {service.time}
                      </p>
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

export default ServiceBoarding;
