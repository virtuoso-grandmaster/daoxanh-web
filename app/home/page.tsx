import { EcoHeader } from "@/components/eco/eco-header";
import { EcoNav } from "@/components/eco/eco-nav";
import Home_AboutUs from "@/components/home/home-aboutus";
import Home_Hero from "@/components/home/home-hero";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Leaf } from "lucide-react";
import Image from "next/image";

const HomePage = () => {
  const promo_vid_url =
    "https://radiant-actor-d06328652d.media.strapiapp.com/DU_LICH_SINH_THAI_DAO_XANH_ECOFARM_DAK_LAK_DIEM_DU_LICH_SINH_THAI_DAO_XANH_ECOFARM_DAK_LAK_720p_h264_b0c32c787c.mp4";

  const explore_imgs = ["https://radiant-actor-d06328652d.media.strapiapp.com/explore_imag_1_b5db6c8ce9.webp", "https://radiant-actor-d06328652d.media.strapiapp.com/explore_img_2_2f9285cf24.webp", "https://radiant-actor-d06328652d.media.strapiapp.com/explore_img_3_025900f6f6.webp"]
  return (
    <div className="flex flex-col bg-white">
      <EcoHeader />
      <EcoNav locale="vi" />
      <Home_Hero />
      <Home_AboutUs />
      <main className="flex flex-col items-center gap-4 my-10">
        <h1 className="text-5xl font-semibold text-gray-700">
          ✨ Khám Phá Đảo Xanh EcoFarm ✨
        </h1>
        <video controls width="1200" height="800">
          <source src={promo_vid_url} type="video/mp4" />
          Your browser does not support the video tag
        </video>
      </main>
      <main className="flex flex-col items-center gap-10 py-10 bg-amber-100">
        <div className="flex flex-col items-center">
          <h3 className="text-green-700">Khám phá</h3>
          <h1 className="text-5xl w-5xl text-center font-semibold text-gray-700">
            Trải nghiệm và dịch vụ tại Đảo Xanh EcoFarm
          </h1>
          <div className="flex flex-row pt-4">
            <Leaf className="text-amber-400" />
            <Leaf className="text-amber-400" />
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <Card className="w-80 h-110 flex">
            <CardHeader className="flex-2 flex flex-col justify-around">
              <CardTitle className="text-3xl text-gray-700 mx-4 text-left">Trải Nghiệm Nông Nghiệp</CardTitle>
              <CardDescription className="text-left mx-4">
                Trải nghiệm các hoạt động du lịch sinh thái nông nghiệp
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <Image src={explore_imgs[0]} width="300" height="200" alt="explore image 1" unoptimized/>
            </CardContent>
          </Card>
          <Card className="w-80 h-110 flex">
            <CardHeader className="flex-2 flex flex-col justify-around">
              <CardTitle className="text-3xl text-gray-700 text-left mx-4">Trải Nghiệm Lưu Trú </CardTitle>
              <CardDescription className="text-left mx-4">
                4 loại phòng độc đáo hòa mình cùng thiên nhiên
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <Image src={explore_imgs[1]} width="300" height="200" alt="explore image 1" unoptimized/>
            </CardContent>
          </Card>
          <Card className="w-80 h-110 flex">
            <CardHeader className="flex-2 flex flex-col justify-around">
              <CardTitle className="text-3xl text-gray-700 text-left mx-4">Quầy Ăn Buffet </CardTitle>
              <CardDescription className="text-left mx-4">Buffet thả ga không lo về giá</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <Image src={explore_imgs[2]} width="300" height="200" alt="explore image 1" unoptimized/>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
