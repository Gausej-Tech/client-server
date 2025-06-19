import React from 'react'
import Layout from '../../Components/Layout'
import Section1 from './Section1'
import Section2 from './Section2'
import Section3 from './Section3'

const Home = () => {
  return (
    <Layout className='text-center'>
     <Section1/>
     <Section2/>
     <Section3/>
    </Layout>
  )
}

export default Home
