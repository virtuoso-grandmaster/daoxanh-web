import { motion, useInView } from "framer-motion";
import { useRef, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Package, Tent, Home, Building, Sparkles, Utensils, Users, Loader2, Star, MapPin, Calendar, DollarSign } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAccommodations } from "@/hooks/useAccommodations";
import { useComboPackages, useDayTripPackages } from "@/hooks/usePackages";
import { PageSEO, getServicesSchema } from "@/components/seo/PageSEO";

import accommodationImage from "@/assets/services/nghi-duong.jpg";
import farmImage from "@/assets/services/nong-trai.jpg";
import foodImage from "@/assets/services/am-thuc.jpg";
import outdoorImage from "@/assets/services/ngoai-troi.jpg";

// Import hình ảnh từng loại lưu trú (for fallback)
import lanLaHanhNgoImage from "@/assets/accommodation/lan-la-hanh-ngo.jpg";
import homestayAnYenImage from "@/assets/accommodation/homestay-an-yen.jpg";
import bungalowAnBinhImage from "@/assets/accommodation/bungalow-an-binh.jpg";
import nhaThanhThoiImage from "@/assets/accommodation/nha-thanh-thoi.jpg";
import nhaAnHoaImage from "@/assets/accommodation/nha-an-hoa.jpg";
import leuSerepokImage from "@/assets/accommodation/leu-serepok.jpg";

// Static fallback data
const staticAccommodations = [
  { 
    name: "Lán lá Hạnh Ngộ", 
    description: "Cắm trại lều trong lán, view sông, gắn kết thiên nhiên", 
    image_url: lanLaHanhNgoImage, 
    slug: "lan-la-hanh-ngo",
    price: "454,000đ",
    capacity: "2-4 người",
    amenities: ["Lều glamping", "View sông", "Gần suối", "BBQ"]
  },
  { 
    name: "Homestay An Yên", 
    description: "Nhà sàn, vách gỗ, mái cọ, view sông dưới tán dừa", 
    image_url: homestayAnYenImage, 
    slug: "homestay-an-yen",
    price: "524,000đ",
    capacity: "4-6 người",
    amenities: ["Nhà sàn gỗ", "View sông", "Tán dừa", "Bếp riêng"]
  },
  { 
    name: "Bungalow An Bình", 
    description: "Nhà gỗ độc đáo, view sông, yên tĩnh, sang trọng", 
    image_url: bungalowAnBinhImage, 
    slug: "bungalow-an-binh",
    price: "734,000đ",
    capacity: "2-3 người",
    amenities: ["Nhà gỗ cao cấp", "View sông", "Sang trọng", "Tiện nghi"]
  },
  { 
    name: "Nhà Thảnh Thơi", 
    description: "Family hotel, view vườn thoáng mát, 18-20 khách", 
    image_url: nhaThanhThoiImage, 
    slug: "nha-thanh-thoi",
    price: "1,200,000đ",
    capacity: "18-20 người",
    amenities: ["Family hotel", "View vườn", "Phòng lớn", "Tiện nghi"]
  },
  { 
    name: "Nhà An Hòa", 
    description: "Phong cách tân cổ điển, tiện nghi, gần trung tâm", 
    image_url: nhaAnHoaImage, 
    slug: "nha-an-hoa",
    price: "650,000đ",
    capacity: "4-6 người",
    amenities: ["Tân cổ điển", "Tiện nghi", "Gần trung tâm", "Sang trọng"]
  },
  { 
    name: "Lều Sê Rê Pôk", 
    description: "Glamping cao cấp, như khách sạn 4 sao, lãng mạn", 
    image_url: leuSerepokImage, 
    slug: "leu-serepok",
    price: "890,000đ",
    capacity: "2-4 người",
    amenities: ["Glamping 4 sao", "Lãng mạn", "Đầy đủ tiện nghi", "View đẹp"]
  },
];

const staticComboPackages = [
  { 
    name: "Gói A", 
    subtitle: "Cắm trại glamping lều đơn tại lán lá Hạnh Ngộ", 
    price_adult: 454000, 
    price_child: 314000, 
    includes: ["Lưu trú 1 đêm", "Bữa sáng", "Trải nghiệm nông trại", "Tham quan vườn"],
    duration: "2 ngày 1 đêm",
    slug: "combo-2d1n-a"
  },
  { 
    name: "Gói A1", 
    subtitle: "Tùy chọn lưu trú", 
    price_adult: 524000, 
    price_child: 384000, 
    includes: ["Lưu trú tùy chọn", "Bữa sáng", "Bữa trưa", "Trải nghiệm nông trại"],
    duration: "2 ngày 1 đêm",
    slug: "combo-2d1n-a1"

  },
  { 
    name: "Gói A2", 
    subtitle: "Nhà gỗ Bungalow cao cấp An Bình", 
    price_adult: 734000, 
    price_child: 594000, 
    includes: ["Bungalow cao cấp", "Bữa sáng + trưa", "Trải nghiệm VIP", "BBQ tối"],
    duration: "2 ngày 1 đêm",
    slug: "combo-2d1n-a2"
  },
];

const staticDayTripPackages = [
  { 
    name: "Gói A - Nông trại tiêu chuẩn", 
    price_adult: 84000, 
    price_child: 59000, 
    includes: ["Tham quan nông trại", "Hái rau", "Cho cá ăn", "Check-in cảnh đẹp"],
    duration: "Trong ngày"
  },
  { 
    name: "Gói A1 - Nông trại 5 sao", 
    price_adult: 137000, 
    price_child: 112000, 
    includes: ["Tất cả gói A", "Đi xe trâu", "Bắt cá suối", "Nướng BBQ (tùy chọn)"],
    duration: "Trong ngày"
  },
  { 
    name: "Gói A2 - Nông trại 5 sao+", 
    price_adult: 189000, 
    price_child: 165000, 
    includes: ["Tất cả gói A1", "Kayak đạp vịt", "Tắm suối", "BBQ đặc biệt (tùy chọn)"],
    duration: "Trong ngày"
  },
];

const staticFoodPackages = [
  {
    name: "Ẩm thực truyền thống",
    description: "Thưởng thức các món ăn đặc sản Tây Nguyên, nguyên liệu hữu cơ từ nông trại",
    menu: ["Cơm lam", "Thịt nướng", "Rau rừng", "Canh chua", "Trái cây tươi"],
    price: "150,000đ/người",
    includes: ["Bữa ăn hoàn chỉnh", "Nguyên liệu hữu cơ", "Không gian ẩm thực"]
  },
  {
    name: "BBQ ngoài trời",
    description: "Tiệc nướng bên bờ sông, không gian lãng mạn, phù hợp cho nhóm đông",
    menu: ["Thịt nướng các loại", "Rau củ nướng", "Lẩu", "Đồ uống", "Tráng miệng"],
    price: "200,000đ/người",
    includes: ["Không gian BBQ", "Dụng cụ nướng", "Nhân viên phục vụ"]
  },
  {
    name: "Set menu cao cấp",
    description: "Set menu 5 sao với các món ăn được chế biến tinh tế, nguyên liệu đặc biệt",
    menu: ["Khai vị", "Món chính", "Tráng miệng", "Rượu vang", "Trà thảo mộc"],
    price: "350,000đ/người",
    includes: ["Set menu 5 sao", "Phục vụ tận bàn", "Không gian sang trọng"]
  }
];

const staticEventPackages = [
  {
    name: "Team Building Cơ Bản",
    description: "Chương trình team building 1 ngày với các hoạt động gắn kết",
    activities: ["Team building games", "Đi xe trâu", "Bắt cá suối", "BBQ"],
    price: "250,000đ/người",
    capacity: "10-50 người",
    includes: ["MC chuyên nghiệp", "Dụng cụ team building", "Bảo hiểm", "Nước uống"]
  },
  {
    name: "Team Building Nâng Cao",
    description: "Chương trình 2 ngày 1 đêm với các hoạt động chuyên sâu",
    activities: ["Workshop", "Team building", "Tiệc tối", "Chia sẻ kinh nghiệm"],
    price: "600,000đ/người",
    capacity: "10-30 người",
    includes: ["Lưu trú", "3 bữa ăn", "MC chuyên nghiệp", "Thiết bị âm thanh"]
  },
  {
    name: "Sự kiện Công ty",
    description: "Tổ chức sự kiện công ty trọn gói, từ A đến Z",
    activities: ["Hội nghị", "Tiệc gala", "Team building", "Chụp ảnh"],
    price: "1,200,000đ/người",
    capacity: "20-100 người",
    includes: ["Toàn bộ dịch vụ", "Nhân sự chuyên nghiệp", "Thiết bị hiện đại", "Ảnh/video"]
  }
];

type ServiceTab = 'accommodation' | 'combo' | 'daytrip' | 'food' | 'events';

const Services = () => {
  const { t } = useLanguage();
  
  // Helper function to safely get translation strings
  const getTranslation = (key: string, defaultValue: string = '') => {
    try {
      const value = key.split('.').reduce((obj, prop) => obj?.[prop], t);
      return typeof value === 'string' ? value : defaultValue;
    } catch {
      return defaultValue;
    }
  };

  const [activeTab, setActiveTab] = useState<ServiceTab>('accommodation');

  const accommodationRef = useRef(null);
  const comboRef = useRef(null);
  const dayTripRef = useRef(null);
  const foodRef = useRef(null);
  const eventRef = useRef(null);

  const isAccommodationInView = useInView(accommodationRef, { once: true, margin: "-100px" });
  const isComboInView = useInView(comboRef, { once: true, margin: "-100px" });
  const isDayTripInView = useInView(dayTripRef, { once: true, margin: "-100px" });
  const isFoodInView = useInView(foodRef, { once: true, margin: "-100px" });
  const isEventInView = useInView(eventRef, { once: true, margin: "-100px" });

  // Fetch from database
  const { data: dbAccommodations, isLoading: loadingAccommodations } = useAccommodations();
  const { data: dbComboPackages, isLoading: loadingCombo } = useComboPackages();
  const { data: dbDayTripPackages, isLoading: loadingDayTrip } = useDayTripPackages();

  // Use database data if available, otherwise fallback to static
  const accommodations = useMemo(() => {
    if (dbAccommodations && dbAccommodations.length > 0) {
      return dbAccommodations.map(acc => ({
        name: acc.name || '',
        description: acc.subtitle || acc.description || '',
        image_url: acc.image_url || null,
        slug: acc.slug || '',
        price: acc.price_original ? `${acc.price_original.toLocaleString('vi-VN')}đ` : 'Liên hệ',
        capacity: acc.capacity || '2-4 người',
        amenities: acc.amenities || []
      }));
    }
    return staticAccommodations;
  }, [dbAccommodations]);

  const comboPackages = useMemo(() => {
    if (dbComboPackages && dbComboPackages.length > 0) {
      return dbComboPackages;
    }
    return staticComboPackages;
  }, [dbComboPackages]);

  const dayTripPackages = useMemo(() => {
    if (dbDayTripPackages && dbDayTripPackages.length > 0) {
      return dbDayTripPackages;
    }
    return staticDayTripPackages;
  }, [dbDayTripPackages]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  // SEO services data
  const seoServicesData = useMemo(() => [
    { name: "Lưu trú sinh thái", description: "Các loại hình lưu trú độc đáo từ homestay đến glamping cao cấp" },
    { name: "Gói combo nghỉ dưỡng", description: "Trọn gói lưu trú, ăn uống và trải nghiệm nông trại" },
    { name: "Tour trong ngày", description: "Trải nghiệm nông trại và hoạt động ngoài trời trong ngày" },
    { name: "Ẩm thực đặc sắc", description: "Các món ăn truyền thống và hiện đại từ nguyên liệu hữu cơ" },
    { name: "Team Building & Sự kiện", description: "Tổ chức team building, workshop, tiệc công ty chuyên nghiệp" },
  ], []);

  const servicesSchema = useMemo(() => getServicesSchema(seoServicesData), [seoServicesData]);

  const getImageUrl = (imageUrl: string | null | undefined, fallbackSlug?: string) => {
    if (imageUrl?.startsWith('http')) return imageUrl;
    if (imageUrl) return imageUrl;
    // Fallback
    const staticItem = staticAccommodations.find(a => a.slug === fallbackSlug);
    return staticItem?.image_url || lanLaHanhNgoImage;
  };

  const renderTabContent = (tab: ServiceTab) => {
    switch (tab) {
      case 'accommodation':
        return (
          <section ref={accommodationRef} id="luu-tru" className="py-20 md:py-28 lg:py-36 scroll-mt-24 bg-gradient-to-br from-background via-background to-muted/40">
            <img className="absolute inset-0 w-full h-full object-cover opacity-15 mix-blend-overlay pointer-events-none" src={accommodationImage} alt="Accommodation background" />
            <div className="container-wide">
              <div className="text-center mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isAccommodationInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8 }}
                >
                  <span className="label-elegant text-accent mb-5 block">Lưu trú</span>
                  <h2 className="heading-section text-foreground mb-6">
                    6 loại hình <span className="italic text-primary">lưu trú đặc sắc</span>
                  </h2>
                  <p className="body-regular text-muted-foreground max-w-2xl mx-auto">
                    Từ cắm trại glamping đến bungalow cao cấp, chọn không gian phù hợp cho kỳ nghỉ của bạn
                  </p>
                </motion.div>
              </div>

              {loadingAccommodations ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {accommodations.map((room, index) => (
                    <motion.div
                      key={room.slug}
                      initial={{ opacity: 0, y: 50 }}
                      animate={isAccommodationInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.8, delay: 0.1 + index * 0.1 }}
                      className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-500 border border-border/50 hover:border-accent/30"
                    >
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={getImageUrl(room.image_url, room.slug)}
                          alt={room.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-serif text-xl font-semibold text-foreground">{room.name}</h3>
                          <span className="text-sm text-primary font-semibold">{room.price}</span>
                        </div>
                        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{room.description}</p>
                        <div className="flex items-center gap-2 mb-4 text-xs text-muted-foreground">
                          <MapPin size={14} />
                          <span>{room.capacity}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {room.amenities.map((amenity, idx) => (
                            <span key={idx} className="text-xs bg-muted/50 px-2 py-1 rounded-full text-muted-foreground">
                              {amenity}
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-3">
                          <Link to={`/luu-tru/${room.slug}`}>
                            <Button variant="outline" size="sm" className="text-foreground border-border hover:bg-accent/20">
                              Xem chi tiết
                              <ArrowRight className="ml-2" size={16} />
                            </Button>
                          </Link>
                          <Link to="/dat-phong">
                            <Button variant="default" size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                              Đặt ngay
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </section>
        );

      case 'combo':
        return (
          <section ref={comboRef} id="combo" className="py-20 md:py-28 lg:py-36 bg-muted/40 scroll-mt-24">
            <div className="absolute inset-0 bg-[url('/src/assets/services/nong-trai.jpg')] bg-cover bg-center opacity-5 mix-blend-overlay pointer-events-none"></div>
            <div className="container-wide">
              <div className="text-center mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isComboInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8 }}
                >
                  <span className="label-elegant text-accent mb-5 block">Combo 2 ngày 1 đêm</span>
                  <h2 className="heading-section text-foreground mb-6">
                    Trọn gói <span className="italic text-primary">nghỉ dưỡng</span>
                  </h2>
                  <p className="body-regular text-muted-foreground max-w-2xl mx-auto">
                    Kết hợp hoàn hảo giữa lưu trú và trải nghiệm nông trại. Mỗi gói đều bao gồm ăn uống, hoạt động và những kỷ niệm đáng nhớ.
                  </p>
                  <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground mt-4">
                    <Sparkles size={18} className="text-accent" />
                    <span>Giảm đến 30% so với giá lẻ</span>
                  </div>
                </motion.div>
              </div>

              {loadingCombo ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                  {comboPackages.map((pkg, index) => (
                    <motion.div
                      key={pkg.name}
                      initial={{ opacity: 0, y: 50 }}
                      animate={isComboInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.8, delay: 0.1 + index * 0.1 }}
                      className="group bg-card rounded-2xl p-8 shadow-soft hover:shadow-elevated transition-all duration-500 border border-border/50 hover:border-accent/30"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <Package size={20} className="text-primary" />
                        <h3 className="font-serif text-xl font-semibold text-foreground">{pkg.name}</h3>
                      </div>
                      <p className="text-muted-foreground text-sm mb-6">{pkg.subtitle}</p>
                      <div className="flex items-center gap-4 mb-6 text-sm">
                        <span className="flex items-center gap-2 text-primary">
                          <Calendar size={16} />
                          {pkg.duration}
                        </span>
                        <span className="flex items-center gap-2 text-foreground">
                          <DollarSign size={16} />
                          {formatPrice(pkg.price_adult)}đ
                        </span>
                      </div>

                      <ul className="space-y-2 mb-8">
                        {pkg.includes.map((item) => (
                          <li key={item} className="flex items-center gap-3 text-sm text-foreground">
                            <Check size={16} className="text-secondary shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>

                      <div className="space-y-2 pt-6 border-t border-border/50">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Người lớn:</span>
                          <span className="font-semibold text-foreground">{formatPrice(pkg.price_adult)}đ</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Trẻ em:</span>
                          <span className="font-semibold text-foreground">{formatPrice(pkg.price_child || 0)}đ</span>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Link to={`/dich-vu/combo/${pkg.name.toLowerCase().replace('gói a', 'combo-a').replace('gói a1', 'combo-a1').replace('gói a2', 'combo-a2').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}>
                          <Button variant="default" size="sm" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                            Xem chi tiết
                            <ArrowRight className="ml-2" size={16} />
                          </Button>
                        </Link>
                        <Link to="/dat-phong">
                          <Button variant="outline" size="sm" className="border-border hover:bg-accent/20">
                            Đặt gói này
                          </Button>
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </section>
        );

      case 'daytrip':
        return (
          <section ref={dayTripRef} id="trai-nghiem" className="py-20 md:py-28 lg:py-36 scroll-mt-24">
            <div className="absolute inset-0 bg-[url('/src/assets/services/ngoai-troi.jpg')] bg-cover bg-center opacity-5 mix-blend-overlay pointer-events-none"></div>
            <div className="container-wide">
              <div className="text-center mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isDayTripInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8 }}
                >
                  <span className="label-elegant text-accent mb-5 block">Trải nghiệm trong ngày</span>
                  <h2 className="heading-section text-foreground mb-6">
                    Khám phá <span className="italic text-primary">nông trại</span>
                  </h2>
                  <p className="body-regular text-muted-foreground max-w-2xl mx-auto">
                    Không cần nghỉ lại, vẫn có thể trải nghiệm đầy đủ cuộc sống nông trại với các hoạt động thú vị từ sáng đến chiều.
                  </p>
                </motion.div>
              </div>

              {loadingDayTrip ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <div className="grid lg:grid-cols-3 gap-8">
                  {dayTripPackages.map((pkg, index) => (
                    <motion.div
                      key={pkg.name}
                      initial={{ opacity: 0, y: 50 }}
                      animate={isDayTripInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.8, delay: 0.1 + index * 0.1 }}
                      className="group bg-card rounded-2xl p-6 shadow-soft hover:shadow-elevated transition-all duration-500 border border-border/50 hover:border-accent/30"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-foreground text-lg">{pkg.name}</h4>
                        <div className="text-right">
                          <span className="text-primary font-semibold text-lg">{formatPrice(pkg.price_adult)}đ</span>
                          <span className="text-muted-foreground text-xs block">/ người lớn</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                        <Calendar size={16} />
                        <span>{pkg.duration}</span>
                      </div>
                      <div className="space-y-2 mb-6">
                        {pkg.includes.map((item) => (
                          <div key={item} className="flex items-center gap-2 text-sm text-foreground">
                            <Check size={14} className="text-secondary shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-3">
                        <Link to="/dat-phong">
                          <Button variant="default" size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                            Đặt trải nghiệm
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm" className="border-border hover:bg-accent/20">
                          Chi tiết
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </section>
        );

      case 'food':
        return (
          <section ref={foodRef} id="am-thuc" className="py-20 md:py-28 lg:py-36 bg-muted/40 scroll-mt-24">
            <div className="absolute inset-0 bg-[url('/src/assets/services/am-thuc.jpg')] bg-cover bg-center opacity-5 mix-blend-overlay pointer-events-none"></div>
            <div className="container-wide">
              <div className="text-center mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isFoodInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8 }}
                >
                  <span className="label-elegant text-accent mb-5 block">Ẩm thực đặc sắc</span>
                  <h2 className="heading-section text-foreground mb-6">
                    Hương vị <span className="italic text-primary">Tây Nguyên</span>
                  </h2>
                  <p className="body-regular text-muted-foreground max-w-2xl mx-auto">
                    Thưởng thức các món ăn truyền thống và hiện đại được chế biến từ nguyên liệu hữu cơ tươi ngon tại nông trại.
                  </p>
                </motion.div>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {staticFoodPackages.map((pkg, index) => (
                  <motion.div
                    key={pkg.name}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isFoodInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.1 + index * 0.1 }}
                    className="group bg-card rounded-2xl p-6 shadow-soft hover:shadow-elevated transition-all duration-500 border border-border/50 hover:border-accent/30"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <Utensils size={24} className="text-primary" />
                      <h4 className="font-semibold text-foreground text-lg">{pkg.name}</h4>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4">{pkg.description}</p>
                    
                    <div className="mb-4">
                      <h5 className="text-sm font-semibold text-foreground mb-2">Thực đơn:</h5>
                      <div className="grid grid-cols-2 gap-1">
                        {pkg.menu.map((item, idx) => (
                          <span key={idx} className="text-xs bg-muted/50 px-2 py-1 rounded text-muted-foreground">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-primary font-semibold text-lg">{pkg.price}</span>
                      <span className="text-xs text-muted-foreground">/ người</span>
                    </div>

                    <div className="mb-4">
                      <h5 className="text-sm font-semibold text-foreground mb-2">Bao gồm:</h5>
                      <ul className="space-y-1">
                        {pkg.includes.map((item, idx) => (
                          <li key={idx} className="text-xs text-muted-foreground flex items-center gap-2">
                            <Check size={12} className="text-secondary" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-3">
                      <Button variant="default" size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                        Đặt món
                        <ArrowRight className="ml-2" size={16} />
                      </Button>
                      <Button variant="outline" size="sm" className="border-border hover:bg-accent/20">
                        Thực đơn
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'events':
        return (
          <section ref={eventRef} id="team-building" className="py-20 md:py-28 lg:py-36 scroll-mt-24">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none"></div>
            <div className="container-wide">
              <div className="text-center mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isEventInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8 }}
                >
                  <span className="label-elegant text-accent mb-5 block">Team Building & Sự kiện</span>
                  <h2 className="heading-section text-foreground mb-6">
                    Tổ chức <span className="italic text-primary">chuyên nghiệp</span>
                  </h2>
                  <p className="body-regular text-muted-foreground max-w-2xl mx-auto">
                    Tổ chức team building, workshop, tiệc công ty với không gian thiên nhiên độc đáo và đội ngũ chuyên nghiệp.
                  </p>
                </motion.div>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {staticEventPackages.map((pkg, index) => (
                  <motion.div
                    key={pkg.name}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isEventInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.1 + index * 0.1 }}
                    className="group bg-card rounded-2xl p-6 shadow-soft hover:shadow-elevated transition-all duration-500 border border-border/50 hover:border-accent/30"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <Users size={24} className="text-primary" />
                      <h4 className="font-semibold text-foreground text-lg">{pkg.name}</h4>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4">{pkg.description}</p>
                    
                    <div className="mb-4">
                      <h5 className="text-sm font-semibold text-foreground mb-2">Hoạt động:</h5>
                      <div className="space-y-1">
                        {pkg.activities.map((activity, idx) => (
                          <span key={idx} className="text-xs bg-muted/50 px-2 py-1 rounded text-muted-foreground inline-block mr-2 mb-1">
                            {activity}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-primary font-semibold text-lg">{pkg.price}</span>
                        <span className="text-xs text-muted-foreground block">/ người</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-muted-foreground">Sức chứa:</span>
                        <span className="text-sm font-semibold text-foreground block">{pkg.capacity}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h5 className="text-sm font-semibold text-foreground mb-2">Bao gồm:</h5>
                      <ul className="space-y-1">
                        {pkg.includes.map((item, idx) => (
                          <li key={idx} className="text-xs text-muted-foreground flex items-center gap-2">
                            <Check size={12} className="text-secondary" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-3">
                      <Button variant="default" size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                        Tư vấn sự kiện
                        <ArrowRight className="ml-2" size={16} />
                      </Button>
                      <Button variant="outline" size="sm" className="border-border hover:bg-accent/20">
                        Báo giá
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        );
    }
  };

  return (
    <>
      <PageSEO
        title="Dịch vụ tại Đảo Xanh Ecofarm"
        description="Khám phá các dịch vụ du lịch sinh thái: lưu trú độc đáo từ homestay đến glamping, gói combo nghỉ dưỡng, tour trong ngày, ẩm thực đặc sắc và tổ chức sự kiện chuyên nghiệp."
        url="/dich-vu"
        keywords="dịch vụ đảo xanh, homestay đắk lắk, glamping tây nguyên, combo nghỉ dưỡng, tour nông trại, lưu trú sinh thái, ẩm thực tây nguyên, team building"
        structuredData={servicesSchema}
        breadcrumbs={[
          { name: "Trang chủ", url: "/" },
          { name: "Dịch vụ", url: "/dich-vu" },
        ]}
      />
      <div className="min-h-screen bg-background">
        <Navbar />

        <main>
          {/* Hero */}
          <section className="pt-32 pb-20 md:pb-24 bg-gradient-to-br from-primary/10 via-background to-background">
            <div className="container-wide text-center">
              <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                <span className="label-elegant text-accent mb-5 block">{getTranslation('services.badge', 'Dịch vụ của chúng tôi')}</span>
                <h1 className="heading-hero text-foreground mb-8">
                  {getTranslation('services.title', 'Trải nghiệm độc đáo')} <span className="italic text-primary">{getTranslation('services.subtitle', 'tại Đảo Xanh')}</span>
                </h1>
                <div className="w-16 h-0.5 bg-accent mx-auto mb-8" />
                <p className="body-large text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  {getTranslation('services.description', 'Khám phá những trải nghiệm tuyệt vời đang chờ đón bạn')}
                </p>

                {/* Service Type Navigation */}
                <div className="flex flex-wrap justify-center gap-4 mt-12">
                  <button 
                    onClick={() => {
                      setActiveTab('accommodation');
                      const element = document.getElementById('luu-tru');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all duration-300 ${
                      activeTab === 'accommodation' 
                        ? 'bg-accent text-accent-foreground border-accent/50 shadow-glow' 
                        : 'bg-card border-border/50 hover:border-accent/50 hover:bg-accent/10'
                    }`}
                  >
                    <Home size={18} />
                    <span className="text-sm font-medium">Lưu trú</span>
                  </button>
                  <button 
                    onClick={() => {
                      setActiveTab('combo');
                      const element = document.getElementById('combo');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all duration-300 ${
                      activeTab === 'combo' 
                        ? 'bg-accent text-accent-foreground border-accent/50 shadow-glow' 
                        : 'bg-card border-border/50 hover:border-accent/50 hover:bg-accent/10'
                    }`}
                  >
                    <Package size={18} />
                    <span className="text-sm font-medium">Combo 2N1Đ</span>
                  </button>
                  <button 
                    onClick={() => {
                      setActiveTab('daytrip');
                      const element = document.getElementById('trai-nghiem');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all duration-300 ${
                      activeTab === 'daytrip' 
                        ? 'bg-accent text-accent-foreground border-accent/50 shadow-glow' 
                        : 'bg-card border-border/50 hover:border-accent/50 hover:bg-accent/10'
                    }`}
                  >
                    <Tent size={18} />
                    <span className="text-sm font-medium">Trong ngày</span>
                  </button>
                  <button 
                    onClick={() => {
                      setActiveTab('food');
                      const element = document.getElementById('am-thuc');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all duration-300 ${
                      activeTab === 'food' 
                        ? 'bg-accent text-accent-foreground border-accent/50 shadow-glow' 
                        : 'bg-card border-border/50 hover:border-accent/50 hover:bg-accent/10'
                    }`}
                  >
                    <Utensils size={18} />
                    <span className="text-sm font-medium">Ẩm thực</span>
                  </button>
                  <button 
                    onClick={() => {
                      setActiveTab('events');
                      const element = document.getElementById('team-building');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all duration-300 ${
                      activeTab === 'events' 
                        ? 'bg-accent text-accent-foreground border-accent/50 shadow-glow' 
                        : 'bg-card border-border/50 hover:border-accent/50 hover:bg-accent/10'
                    }`}
                  >
                    <Building size={18} />
                    <span className="text-sm font-medium">Sự kiện</span>
                  </button>
                </div>
              </motion.div>
            </div>
          </section>

        {/* All Service Sections */}
        {renderTabContent('accommodation')}
        {renderTabContent('combo')}
        {renderTabContent('daytrip')}
        {renderTabContent('food')}
        {renderTabContent('events')}
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Services;