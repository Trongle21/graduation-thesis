import React from "react";
import data from "@/app/data.json";

const TeamMember = () => {
  const homeMember = data["homeMember"];

  return (
    <section className="team-member--section container-padding">
      <div className="team-member--section__img"></div>
      <div className="container">
        <h4 className="heading-lg text-center fw-800">Team Member</h4>
        <h2 className="heading-sm text-center margin-bottom">
          Our store is hard-working employees
        </h2>
        <div className="team-member--list padding-bottom row">
          {homeMember.map((member, index) => (
            <div className="team-member--list__staff l-3 m-6 c-12" key={index}>
              <div
                className="staff--img"
                style={{ backgroundImage: `url(${member.image})` }}
              ></div>
              <div className="team--member__info-wrapper">
                {member.info.map((info, index) => (
                  <div className="staff--info" key={index}>
                    <div className="staff--info__title">
                      <h5>{info.name}</h5>
                      <p>{info.job}</p>
                    </div>
                    <div className="staff--info__social">
                      {info.social.map((social, index) => (
                        <a href="#" key={index}>
                          <i className={social}></i>
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamMember;
