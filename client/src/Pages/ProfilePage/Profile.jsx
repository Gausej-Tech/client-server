import React from 'react'
import Layout from '../../Components/Layout'
import Section1 from './Section1'
import Section2 from './Section2'
import { Helmet } from "react-helmet-async";

const Profile = () => {
  return (
    <Layout>
      <Helmet>
        <title>Gausej - Profile</title>
      </Helmet>

        <Section1/>
        <Section2/>
    </Layout>
  )
}

export default Profile
