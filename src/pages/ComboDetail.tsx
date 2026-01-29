import { useParams } from "react-router-dom";
import { useComboPackages } from "@/hooks/usePackages";
import { useLanguage } from "@/i18n/LanguageContext";

const ComboDetail = () => {
  const { slug } = useParams();
  const { data: packages = [] } = useComboPackages();
  const { t } = useLanguage();

  // Find the package by slug
  const packageData = packages.find(pkg => pkg.slug === slug);

  if (!packageData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Combo không tồn tại</h1>
          <a href="/dich-vu" className="text-primary hover:underline">
            Quay lại trang dịch vụ
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-red-500 text-white p-4 text-center">
        Combo loaded: {packageData.name} | Slug: {slug}
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">{packageData.name}</h1>
        <p className="text-lg text-gray-600 mb-4">{packageData.subtitle || 'No description available'}</p>
        <p className="text-2xl font-bold text-primary mb-4">Adult: {packageData.price_adult.toLocaleString()} VND</p>
        {packageData.price_child && (
          <p className="text-xl text-gray-600 mb-4">Child: {packageData.price_child.toLocaleString()} VND</p>
        )}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">What's included:</h2>
          <ul className="list-disc list-inside space-y-2">
            {packageData.includes?.map((item, index) => (
              <li key={index} className="text-gray-700">{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ComboDetail;