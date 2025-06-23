import React from "react";
import Layout from "../../Components/Layout";
import Section1 from "./Section1";
import Section2 from "./Section2";
import { Helmet } from "react-helmet-async";
import AdminSectionForPendingVideos from "./AdminSectionForPendingVideos";

const Profile = () => {
  
  const user = JSON.parse(localStorage.getItem("user")); 
  const role = user?.role; 

  return (
    <Layout>
      <Helmet>
        <title>Gausej - Profile</title>
      </Helmet>

      <Section1 />

      {role === "admin" ? <AdminSectionForPendingVideos /> : <Section2 />}
    </Layout>
  );
};

export default Profile;
