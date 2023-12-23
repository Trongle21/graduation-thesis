import React from "react";
import Link from "next/link";
import { BsFacebook, BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs";

const FooterContact = () => {
  return (
    <div className="page--footer__contact l-4 m-6 c-12">
      <div className="page--footer__contact--wrapper">
        <h6 className="fw-800">Contact</h6>
        <p>
          Có một câu hỏi cho chúng tôi? Chúng tôi sẽ giải đáp vấn đề của bạn tại
          đây
        </p>
        <div className="link--contact">
          <Link href="https://www.facebook.com/">
            <BsFacebook />
          </Link>
          <Link href="https://www.instagram.com/">
            <BsInstagram />
          </Link>
          <Link href="https://twitter.com/">
            <BsTwitter />
          </Link>
          <Link href="https://www.youtube.com/">
            <BsYoutube />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FooterContact;
