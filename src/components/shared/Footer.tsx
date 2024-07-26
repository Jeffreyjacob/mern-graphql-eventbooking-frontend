import { Facebook, Instagram, Linkedin } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Separator } from "../ui/separator"

const Footer = () => {
    return (
        <div className="w-full h-[230px] bg-navyBlue container">
            <div className="w-full h-full flex flex-col justify-center items-center gap-2">
                <h5 className=" text-[18px] md:text-[24px] font-bold text-white font-inter">
                    Event <span className="text-primaryBlue ml-1">Hive</span>
                </h5>
                <div className="flex gap-1">
                    <Input placeholder="Enter your email"
                    className=" placeholder:text-[687C94] focus:outline-none focus-visible:outline-none" />
                    <Button className="bg-primaryBlue">
                        Subscribe
                    </Button>
                </div>
                    <ul className="flex gap-5 text-white mt-4 text-[12px]">
                        <li>Home</li>
                        <li>About</li>
                        <li>Service</li>
                        <li>Get in touch</li>
                        <li>FAQs</li>
                    </ul>
                    <Separator className="mt-6 mb-3"/>
                    <div className="flex gap-3">
                       <Linkedin className="w=5 h-5 text-white" />
                      <Instagram className="w-5 h-5 text-white"/>
                      <Facebook className="w-5 h-5 text-white"/>
                    </div>
            </div>
        </div>
    )
}

export default Footer