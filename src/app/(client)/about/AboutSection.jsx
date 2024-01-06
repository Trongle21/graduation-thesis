import React from "react";
import data from "@/app/data.json";
import PathLink from "@/app/_components/PathLink";

const AboutSection = () => {
  return (
    <section className="about--section">
      <div className="container">
        <PathLink content="Chúng tôi" />
        <div className="line"></div>
        <div className="about--section__wrapper">
          <div className="about--section__history row">
            <div className="about--section__history--info l-4 m-12 c-12">
              <h3 className="about--title">Câu chuyện của chúng tôi </h3>
              <h6>
                Năm 2008, những người sáng lập Mike và Adam - mới rời khỏi Wall
                Street - đã khởi động Throw Me A Bone với ý tưởng tạo ra một
                dịch vụ chăm sóc thú cưng cá nhân hóa, thuận tiện và dễ tiếp cận
                hơn tại New York City. Những gì bắt đầu từ một doanh nghiệp đi
                dạo chó nhỏ nhưng phồn thịnh trên Upper East Side nhanh chóng
                trở thành một hoạt động với 10 người trong vòng hai năm. Đến năm
                2011, Throw Me A Bone mở rộng hoạt động từ việc đi dạo chó sang
                việc cung cấp dịch vụ ngồi nhà (cho cả mèo!), làm đẹp và huấn
                luyện chó, cung cấp dịch vụ tại nhà trên phạm vi lớn của
                Manhattan. Năm 2017, chúng tôi mở cửa cơ sở chăm sóc thú cưng
                đầy đủ đầu tiên của m
              </h6>
            </div>
            <div className="about--section__picture l-7 m-12 c-12">
              <div
                className="about--image"
                style={{
                  backgroundImage: `url("https://i.ibb.co/FWMczSZ/about-ceo.jpg")`,
                }}
              ></div>
            </div>
          </div>
          <div className="about--section__mission">
            <div className="about--section__mission--info text-center">
              <h3 className="about--title">Sứ mệnh chúng tôi</h3>
              <h6>
                Để làm phong phú cuộc sống của mỗi thú cưng mà chúng tôi chăm
                sóc, đồng thời mang lại giá trị, thuận tiện và sự yên tâm cho
                chủ nhân của chúng.
              </h6>
            </div>
          </div>
          <div className="about--section__principles row">
            <div className="about--section__picture l-7 m-12 c-12">
              <div
                className="about--image"
                style={{
                  backgroundImage: `url("https://i.ibb.co/fCY9sy4/about-2.jpg")`,
                }}
              ></div>
            </div>
            <div className="about--section__principles--info l-4 m-12 c-12">
              <h3 className="about--title">Những nguyên tắc</h3>
              <div className="principles-list">
                {data["principles"].map((principle, index) => (
                  <div className="principles-list__name" key={index}>
                    <h4>{principle.name}</h4>
                    <h6>{principle.description}</h6>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
