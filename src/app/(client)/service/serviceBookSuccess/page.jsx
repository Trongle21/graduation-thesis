import React from "react";
import Link from "next/link";

const ServiceBookSuccess = () => {
  return (
    <section className="section--book__success">
      <div className="container">
        <div className="section--book__success--wrapper row">
          <div className="book--success__image l-3 m-3 c-12">
            <div
              className="img"
              style={{
                backgroundImage: `url(${"https://i.ibb.co/bLSsP74/service-book-success.png"})`,
              }}
            ></div>
          </div>
          <div className="book--success l-8 m-8 c-12">
            <div className="book--success__icon">
              <i className="fa-regular fa-thumbs-up"></i>
            </div>
            <div className="book--success__info">
              <h2>Bạn đã đặt lịch thành công</h2>
              <h6>
                Cảm ơn bạn đã yêu cầu một buổi Gặp gỡ. Chúng tôi rất háo hức
                được gặp bạn và pet của bạn! Hãy chờ xác nhận từ phía chúng tôi!
              </h6>
            </div>

            <Link href="/home">
              <button className="btn btn--primary">Trang chủ</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceBookSuccess;
