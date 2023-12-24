import React, { useEffect, useState } from "react";
import data from "@/app/data.json";
import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { getAllServicePack } from "@/redux/features/apiRequest";

const ServiceGrooming = () => {
  const [isShowGrooming, setIsShowGrooming] = useState();
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
      const servicePackId = servicePackList[1]._id;

      router.push(`service/${servicePackId}`);
    } else {
      window.alert("Bạn cần đăng nhập để tiếp tục!");
    }
  };
  return (
    <div className="service--blog service-2 service--padding">
      <div className="service--wrapper row">
        <div className="service--image l-2 m-2">
          <img src="https://i.ibb.co/bgymvJT/service-2.webp" alt="" />
        </div>
        <div className="service--des l-10 m-10">
          <div className="service--title">
            <div
              className="service--title--wrapper"
              onClick={() => setIsShowGrooming(!isShowGrooming)}
            >
              <div className="service--title__mb">
                <div className="service--image__mb">
                  <img src="https://i.ibb.co/bgymvJT/service-2.webp" alt="" />
                </div>
                <h6>Grooming</h6>
              </div>
              <div
                className={`service--mb__icon ${
                  isShowGrooming ? "rotate" : ""
                }`}
              >
                <AiOutlinePlus />
              </div>
            </div>
            <button className="btn btn--secondary" onClick={handleSubmit}>
              <Link
                href="#"
                className={`service--mb ${
                  isShowGrooming ? "show--service" : "hidden--service"
                }`}
              >
                Book Now
              </Link>
            </button>
          </div>
          <div
            className={`service--mb ${
              isShowGrooming ? "show--service" : "hidden--service"
            }`}
          >
            <h5>Monday - Sunday / 8:00am - 6:00pm</h5>
            <p>
              We offer a full range of spa and grooming services. All grooming
              options include a complete organic and hypoallergenic bath as well
              as detailed nose-to-tail attention. Pricing may vary due to size,
              the condition of the coat, matting, knots and the length of hair.
            </p>
            <div className="service--content row">
              <div className="service--content__info luxury--bath l-6 m-6 c-12">
                <div className="service--content__price">
                  <h6>The Luxury Bath</h6>
                  <h6>$50</h6>
                </div>
                <ul>
                  {data["grooming"]["luxuryBath"].map((service, index) => (
                    <li key={index}>
                      <p>{service.name}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="service--content__info full--groom l-6 m-6 c-12">
                <div className="service--content__price">
                  <h6>The Full Groom</h6>
                  <h6>$120</h6>
                </div>
                <ul>
                  {data["grooming"]["fullGroom"].map((service, index) => (
                    <li key={index}>
                      <p>{service.name}</p>
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

export default ServiceGrooming;
