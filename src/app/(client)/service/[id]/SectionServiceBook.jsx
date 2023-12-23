import React, { useEffect, useState } from "react";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { createPet, createAppointment } from "@/redux/features/apiRequest";

const SectionServiceBook = () => {
  const [petName, setPetName] = useState("");
  const [age, setAge] = useState("");
  const [choosePetType, setChoosePetType] = useState("cat");
  const [chooseGender, setChooseGender] = useState("male");
  const [choosePack, setChoosePack] = useState("");
  const [date, setDate] = useState("");
  const [servicePack, setServicePack] = useState([]);

  const user = useSelector((state) => state.auth.login.currentUser);
  const servicePackList = useSelector(
    (state) => state.servicePack?.servicePacks?.allServicePacks?.servicePack
  );

  const { id } = useParams();

  useEffect(() => {
    if (id && servicePackList && servicePackList.length > 0) {
      const pack = servicePackList.find((service) => service._id === id);
      setServicePack([pack]);
    }
  }, [id, servicePackList]);

  const dispatch = useDispatch();
  const navigate = useRouter();

  const handleSubmitForm = async (e) => {
    e.preventDefault()
    if (user) {
      const newPet = {
        name: petName,
        type: choosePetType,
        age: age,
        gender: chooseGender,
        user: user._id,
      };
      const petId = await createPet(newPet, dispatch);
      const newAppointment = {
        pet: petId,
        user: user._id,
        service: servicePack[0]._id,
        package: choosePack,
        date: date,
      };
      await createAppointment(newAppointment, dispatch, navigate);
    } else {
      window.alert("Bạn cần đăng nhập để hoàn tất dịch vụ!");
    }
  };

  return (
    <section className="section--service__book">
      <div className="container">
        <h2>REQUEST A MEET & GREET</h2>
        <h6>Cảm ơn bạn đã chọn dịch vụ {servicePack[0]?.serviceName}</h6>

        <form className="service--form" onSubmit={handleSubmitForm}>
          <div className={"contact--form__info second service--book"}>
            <div className="contact--form row">
              <div className="contact--form__list l-6 m-6 c-12">
                <div className="contact--form__list--wrapper">
                  <label className="form-label">Tên</label>
                  <input
                    value={petName}
                    placeholder="Nhập tên của pet ..."
                    onChange={(e) => setPetName(e.target.value)}
                  />
                  <span className="form-message"></span>
                </div>
              </div>
              <div className="contact--form__list l-6 m-6 c-12">
                <div className="contact--form__list--wrapper">
                  <label className="form-label">Tháng tuổi</label>
                  <input
                    value={age}
                    placeholder="Nhập tháng tuổi của pet ..."
                    onChange={(e) => setAge(e.target.value)}
                  />
                  <span className="form-message"></span>
                </div>
              </div>
              <div className="contact--form__list l-6 m-6 c-12">
                <div className="contact--form__list--wrapper">
                  <label htmlFor="type_of_pet" className="form-label">
                    Chó hay mèo
                  </label>
                  <select
                    id="type_of_pet"
                    value={choosePetType}
                    onChange={(e) => setChoosePetType(e.target.value)}
                  >
                    <option value="cat">Cat</option>
                    <option value="dog">Dog</option>
                  </select>
                  <span className="form-message"></span>
                </div>
              </div>
              <div className="contact--form__list l-6 m-6 c-12">
                <div className="contact--form__list--wrapper">
                  <label htmlFor="gender" className="form-label">
                    Giới tính
                  </label>
                  <select
                    id="gender"
                    value={chooseGender}
                    onChange={(e) => setChooseGender(e.target.value)}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  <span className="form-message"></span>
                </div>
              </div>
              <div className="contact--form__list l-6 m-6 c-12">
                <div className="contact--form__list--wrapper">
                  <label htmlFor="gender" className="form-label">
                    Chọn gói
                  </label>
                  <select
                    id="gender"
                    value={choosePack}
                    onChange={(e) => setChoosePack(e.target.value)}
                  >
                    <option value="" disabled hidden>
                      Vui lòng chọn
                    </option>
                    {servicePack[0]?.packages?.map((pack) => (
                      <option key={pack._id} value={pack._id}>
                        {pack.name}
                      </option>
                    ))}
                  </select>
                  <span className="form-message"></span>
                </div>
              </div>
              <div className="contact--form__list l-6 m-6 c-12">
                <div className="contact--form__list--wrapper">
                  <label htmlFor="date" className="form-label">
                    Đặt hẹn
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  ></input>
                  <span className="form-message"></span>
                </div>
              </div>
              <div className="contact--form__list l-6 m-6 c-12">
                <div className="contact--form__list--wrapper"></div>
              </div>
            </div>
            <div className="service--book_btn">
              <button type="submit" className="btn btn--primary link">
                <span href="#">Đặt lịch</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SectionServiceBook;
