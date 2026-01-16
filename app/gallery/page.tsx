import { EcoHeader } from "@/components/eco/eco-header";
import { EcoNav } from "@/components/eco/eco-nav";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const GalleryPage = () => {
    const hero_url = "http://localhost:1337/uploads/ANH_BIA_WEBSIZE_KHU_DU_LICH_SINH_THAI_DAO_XANH_ECOFARM_DAKLAK_100_1b227cafe3.jpg"

    return (
        <div className="flex flex-col bg-white">
            <EcoHeader/>
            <EcoNav locale="vi"/>
            <div className="flex w-full justify-center ">
                <Image 
                    src={hero_url} 
                    width="1200" 
                    height="800" 
                    alt="Hero Banner"
                    unoptimized
                />
            </div>
            <main className="h-128 w-full"/>
        </div>
    )
}

export default GalleryPage;