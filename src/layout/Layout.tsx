import Footer from "@/components/shared/Footer"
import Header from "@/components/shared/Header"
import { ReactNode } from "react"

const Layout = ({children}:{children:ReactNode}) => {
  return (
    <div className="w-full min-h-screen relative bg-backgroundGrey font-inter">
        <div className=" sticky top-0 z-50">
        <Header/>
        </div>
        <div className="container w-full flex-1 mb-16">
            {children}
        </div>
        <Footer/>
    </div>
  )
}

export default Layout