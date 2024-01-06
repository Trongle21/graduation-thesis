import React, { useEffect, useState } from "react";
import data from "@/app/data.json";
import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { getAllServicePack } from "@/redux/features/apiRequest";

const ServicePetSitting = () => {
  const [isShowPetSitting, setIsShowPetSitting] = useState();

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
      const servicePackId = servicePackList[3]._id;

      router.push(`service/${servicePackId}`);
    } else {
      window.alert("Bạn cần đăng nhập để tiếp tục!");
    }
  };

  return (
    <div className="service--blog service-4 service--padding">
      <div className="service--wrapper row">
        <div className="service--image l-2 m-2">
          <img src="https://i.ibb.co/q7XqphM/service-4.png" alt="" />
        </div>
        <div className="service--des l-10 m-10">
          <div className="service--title">
            <div
              className="service--title--wrapper"
              onClick={() => setIsShowPetSitting(!isShowPetSitting)}
            >
              <div className="service--title__mb">
                <div className="service--image__mb">
                  <img src="https://i.ibb.co/q7XqphM/service-4.png" alt="" />
                </div>
                <h6>Huấn luyện</h6>
              </div>
              <div
                className={`service--mb__icon ${
                  isShowPetSitting ? "rotate" : ""
                }`}
              >
                <AiOutlinePlus />
              </div>
            </div>
            <button className="btn btn--secondary" onClick={handleSubmit}>
              <Link
                href="#"
                className={`service--mb ${
                  isShowPetSitting ? "show--service" : "hidden--service"
                }`}
              >
                Đặt ngay
              </Link>
            </button>
          </div>
          <div
            className={`service--mb ${
              isShowPetSitting ? "show--service" : "hidden--service"
            }`}
          >
            <h5>Thứ Hai - Chủ Nhật / 8:00 sáng - 6:00 tối</h5>
            <p>
              Dành cho mèo và chó con. Mỗi lần thăm 30 phút bao gồm việc cho
              ăn/nước sạch, duy trì cát/hộp cát và thời gian chơi trong nhà. Đi
              dạo để giảm cảm giác cho chó con cũng có thể được cung cấp khi
              được yêu cầu.
            </p>

            <div className="service--content row">
              <div className="service--content__info pet--sitting l-12 m-12 c-12">
                <div className="service--content__price">
                  <h6>Huấn luyện</h6>
                </div>
                <ul>
                  {data["petSitting"].map((service, index) => (
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

export default ServicePetSitting;
