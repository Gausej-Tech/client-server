import React from 'react'
import Layout from '../../Components/Layout'
import Section1 from './Section1'
import Section3 from './Section3'
import Section2 from './Section2'
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <Layout className='text-center'>
       <Helmet>
        <title>Gausej - Professional Video Sharing Platform</title>
      </Helmet>
     <Section1/>
     <Section2/>
     <Section3/>
    </Layout>
  )
}

export default Home
