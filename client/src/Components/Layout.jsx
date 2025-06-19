import Footer from "./Footer"
import Header from "./Header"


const Layout = ({children}) => {
  return (
    <div>
      <Header />
      <main className="pt-[80px] min-h-[90vh]">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout