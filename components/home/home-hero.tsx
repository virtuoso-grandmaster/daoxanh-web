import Image from "next/image"

const Home_Hero = () => {
const hero_url =
    `https://radiant-actor-d06328652d.media.strapiapp.com/ANH_BIA_WEBSIZE_KHU_DU_LICH_SINH_THAI_DAO_XANH_ECOFARM_DAKLAK_100_22b0c8d9ce.jpg`;

    return (
        <div className="flex w-full justify-center">
        <Image
          src={hero_url}
          width="1200"
          height="800"
          alt="Hero Banner"
          className="hover-scale"
          unoptimized
        />
      </div>
    )
}

export default Home_Hero;