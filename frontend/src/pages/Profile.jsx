import React from "react";
import { useEffect, useState } from "react";
import { getProfileData } from "../actions/UserAction";

export default function Dashboard() {
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    const userId = localStorage.getItem("currentUserId");
    const fetchProfileData = async () => {
      const response = await getProfileData(userId);
      setProfileData(response.data);
    };
    if (Object.keys(profileData).length === 0) {
      fetchProfileData();
    }
  });

  return (
    <>
      <p>Name : {profileData.firstName + " " + profileData.lastName} </p>
      <p>Email : {profileData.email} </p>
    </>
  );
}
