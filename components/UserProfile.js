import React from "react";
import styled from "styled-components";

const Profile = styled.div`
  font-family: "Calibri";
`;

function UserProfile(props) {
  const { userData, signInStatus } = props;

  if (signInStatus) {
    return <Profile>{userData.additionalUserInfo.profile.name}</Profile>;
  } else {
    return <></>;
  }
}

export default UserProfile;
