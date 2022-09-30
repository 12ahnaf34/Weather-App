import React from "react";
import styled from "styled-components";

function UserProfile(props) {
  const { userData, signInStatus } = props;

  const Profile = styled.div`
    font-family: "Calibri";
  `;

  if (signInStatus) {
    return <Profile>{userData.additionalUserInfo.profile.name}</Profile>;
  } else {
    return <></>;
  }
}

export default UserProfile;
