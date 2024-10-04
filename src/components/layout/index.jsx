import { Outlet } from "react-router-dom"
import Footer from "../footer"
import Header from "../header"

function Layout() {
  return (
    <div>
      <Header />
      <div
        style={{
          minHeight:"100vh",
        }}
      >
         <Outlet  />
      </div>
      <Footer />
    </div>
  )
}

export default Layout