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
                <h6>Boarding</h6>
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
                {" "}
                Book Now
              </Link>
            </button>
            <Link
              href="https://pawpartner.com/throw-me-a-bone---525-w-52nd-st"
              className={`service--mb ${
                isShowBoarding ? "show--service" : "hidden--service"
              }`}
            >
              <button className="btn btn--primary">Book LIC</button>
            </Link>
          </div>
          <div
            className={`service--mb ${
              isShowBoarding ? "show--service" : "hidden--service"
            }`}
          >
            <h5>Monday - Sunday / 24 hours</h5>
            <p>
              Our overnight boarding service offers a convenient solution for
              our more active dogs. Each 24 hour stay includes daycare, relief
              walks, all feedings and daily photos. Live play cam is also
              available during daycare hours to check in when you would like and
              see how your Pet is doing.
            </p>
            <div className="service--content row">
              <div className="service--content__info boarding l-12 m-12 c-12">
                <div className="service--content__price">
                  <h6>Boarding *</h6>
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
