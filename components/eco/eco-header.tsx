import { MailCheck, PhoneCall } from "lucide-react"
import Image from "next/image"
import "./customize.css"

export const EcoHeader =() => {
    // Temp for localhost
    const logo_url = "http://localhost:1337/uploads/LOGO_DAO_XANH_PNG_cc15ffd3fa.png"

    return (
        <header>
                <div className="h-6 w-full bg-amber-200 flex flex-row text-black justify-around">
                    <div className="flex gap-2 text-amber-900">
                        <MailCheck className="shake-slow"/>
                        <p>daoxanhecofarmdaklak@gmail.com</p>
                    </div>
                    <p className="text-orange-500">
                        Hãy cùng Đảo Xanh với chúng tôi nhé!
                    </p>
                    <div className="flex gap-2 text-amber-900">
                        <PhoneCall className="shake-slow"/>
                        <p>096 189 89 72 - 098 714 14 14 </p>
                    </div>
                </div>
                <div className="flex justify-center p-4">
                    <Image src={logo_url} width="200" height="200" alt="Ecofarm Logo" unoptimized/>
                </div>
            </header>
    )
}