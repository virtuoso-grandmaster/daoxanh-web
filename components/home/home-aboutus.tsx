import { Leaf } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";

const Home_AboutUs = () => {
  const about_us_img_url =
    "https://radiant-actor-d06328652d.media.strapiapp.com/ve_chung_toi_6d4ff2c588.webp";

  return (
    <main className="flex w-full flex-col items-center p-20 ">
      <div className="flex flex-row xl:gap-14">
        <Image
          src={about_us_img_url}
          width="500"
          height="800"
          alt="Ve Chung Toi"
          unoptimized
        />
        <div className="flex flex-col gap-10 pt-3">
          <div>
            <h3 className="text-green-700">Về chúng tôi </h3>
            <h1 className="text-4xl font-semibold text-gray-600">
              Đảo xanh EcoFarm
            </h1>
            <div className="flex flex-row">
              <Leaf className="text-amber-400" />
              <Leaf className="text-amber-400" />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <p className="w-110 text-gray-600">
              <b className="text-amber-400">Đảo Xanh EcoFarm</b> là điểm đến lý
              tưởng cho những ai yêu thích{" "}
              <b className="text-amber-400">du lịch sinh thái Đắk Lắk</b>, nơi
              du khách có thể vừa nghỉ dưỡng vừa hòa mình vào thiên nhiên thuần
              khiết. Với mô hình{" "}
              <b className="text-amber-400">
                du lịch sinh thái nông nghiệp Đắk Lắk
              </b>
              , EcoFarm mang đến nhiều hoạt động hấp dẫn như đạp xe dưới hàng
              dừa xanh, chèo sup, bắn cung, đua thuyền và đặc biệt là những trải
              nghiệm gần gũi như{" "}
              <b className="text-amber-400">trải nghiệm làm nông</b>: thu hoạch
              rau, chăm sóc vật nuôi, gieo trồng cây xanh.
            </p>
            <p className="w-110 text-gray-600">
              Không chỉ là nơi thư giãn, EcoFarm còn là điểm đến lý tưởng để tổ
              chức <b className="text-amber-400">tour sinh thái Đắk Lắk</b> dành
              cho gia đình, bạn bè hoặc doanh nghiệp. Các chương trình team
              building, dã ngoại, khám phá nông nghiệp xanh đều được thiết kế đa
              dạng, an toàn và ý nghĩa. Với không gian trong lành, dịch vụ chu
              đáo cùng phương châm “Sống xanh – Trải nghiệm thật”,{" "}
              <b className="text-amber-400">Đảo Xanh EcoFarm</b> hứa hẹn sẽ mang
              đến cho bạn những phút giây bình yên, bổ ích và khó quên giữa lòng
              Tây Nguyên
            </p>
            <Button className="w-32 h-12 my-4 bg-amber-600 hover:bg-amber-800">Tìm hiểu thêm </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home_AboutUs;
