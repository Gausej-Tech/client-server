import { useState } from "react";
import Footer from "./Footer"
import Header from "./Header"
import Signin from "../Pages/SigninPage/Signin";


const Layout = ({children}) => {
    const [showSigninModal, setShowSigninModal] = useState(false);
  return (
    <div>
      <Header onSigninClick={() => setShowSigninModal(true)} />
      <Signin isOpen={showSigninModal} onClose={() => setShowSigninModal(false)} />
      <main className="pt-[80px] min-h-[90vh]">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout