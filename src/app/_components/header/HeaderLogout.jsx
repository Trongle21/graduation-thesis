import React from 'react'
import Button from "../Button";

const HeaderLogout = () => {
    return (
        <div className="header--sign-in">
          <Button
            className="btn btn--secondary"
            color="#fff"
            content="Log Out"
          />
        </div>
      );
}

export default HeaderLogout
