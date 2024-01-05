import React, { useEffect, useState } from "react";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { createPet, createAppointment } from "@/redux/features/apiRequest";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormControl from "@/app/_components/FormControl";

const contactForm = z.object({
  info: z.object({
    schedule_date: z.string().min(1, { message: "Vui lòng chọn ngày" }),
    pet_name: z.string().min(1, { message: "Vui lòng nhập tên pet" }),
    pet_birthday: z
      .string()
      .min(1, { message: "Vui lòng chọn ngày sinh của pet" }),
  }),
});

const SectionServiceBook = () => {
  const [petName, setPetName] = useState("");
  const [age, setAge] = useState("");
  const [choosePetType, setChoosePetType] = useState("cat");
  const [chooseGender, setChooseGender] = useState("male");
  const [choosePack, setChoosePack] = useState("");
  const [date, setDate] = useState("");
  const [servicePack, setServicePack] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

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

  const methods = useForm({
    resolver: zodResolver(contactForm),
    defaultValues: {
      info: {
        schedule_date: "",
        pet_name: "",
        pet_birthday: "",
      },
    },
  });

  useEffect(() => {
    const price = servicePack[0]?.packages.find(
      (pack) => pack._id === choosePack
    );

    setTotalPrice(price?.price);
  }, [choosePack]);

  const handleSubmitForm = async (formData) => {
    if (user) {
      const newPet = {
        name: petName,
        type: choosePetType,
        age: age,
        gender: chooseGender,
        user: user._id,
      };

      const petId = await createPet(
        newPet,
        dispatch,
        user?.accessToken,
        petName,
        user?._id
      );
      const newAppointment = {
        pet: petId,
        user: user._id,
        service: servicePack[0]._id,
        package: choosePack,
        totalPrice: totalPrice,
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
        <FormProvider {...methods}>
          <form
            className="service--form"
            onSubmit={methods.handleSubmit((data) => {
              handleSubmitForm(data);
            })}
          >
            <div className={"contact--form__info second service--book"}>
              <div className="contact--form row">
                <div className="contact--form__list l-6 m-6 c-12">
                  <div className="contact--form__list--wrapper">
                    <FormControl
                      label="Tên Pet"
                      name="info.pet_name"
                      placeholder="Nhập tên của pet ..."
                      value={petName}
                      onChange={(e) => setPetName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="contact--form__list l-6 m-6 c-12">
                  <div className="contact--form__list--wrapper">
                    <FormControl
                      label="Tháng tuổi"
                      name="info.pet_birthday"
                      placeholder="Nhập tháng tuổi của pet ..."
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
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
                      <option>Vui lòng chọn gói</option>
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
                    <FormControl
                      label="Đặt lịch"
                      type="date"
                      name="info.schedule_date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="contact--form__list l-6 m-6 c-12">
                  <div className="contact--form__list--wrapper"></div>
                </div>
              </div>
              <div className="service--book_btn">
                <button type="submit" className="btn btn--primary link">
                  Đặt lịch
                </button>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </section>
  );
};

export default SectionServiceBook;
