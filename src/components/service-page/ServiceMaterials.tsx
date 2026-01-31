import { Award, ShieldCheck, Package } from 'lucide-react';

interface ServiceMaterialsProps {
  materials: {
    brands: string[];
    qualityStandards: string[];
    warranty: string;
  };
}

const ServiceMaterials = ({ materials }: ServiceMaterialsProps) => {
  return (
    <section className="mb-12" aria-labelledby="materials-heading">
      <h2 id="materials-heading" className="text-2xl font-bold text-foreground mb-6">
        Materials & Quality
      </h2>
      
      <div className="space-y-6">
        {/* Brands */}
        <div className="bg-muted/30 rounded-lg p-5 border border-border">
          <div className="flex items-center gap-2 mb-3">
            <Package className="w-5 h-5 text-primary" aria-hidden="true" />
            <h3 className="font-semibold text-foreground">Brands We Work With</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {materials.brands.map((brand, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-background rounded-full text-sm text-muted-foreground border border-border"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
        
        {/* Quality Standards */}
        <div className="bg-muted/30 rounded-lg p-5 border border-border">
          <div className="flex items-center gap-2 mb-3">
            <Award className="w-5 h-5 text-primary" aria-hidden="true" />
            <h3 className="font-semibold text-foreground">Quality Standards</h3>
          </div>
          <ul className="space-y-2">
            {materials.qualityStandards.map((standard, index) => (
              <li 
                key={index}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <span className="text-primary" aria-hidden="true">✓</span>
                {standard}
              </li>
            ))}
          </ul>
        </div>
        
        {/* Warranty */}
        <div className="bg-muted/30 rounded-lg p-5 border border-border">
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck className="w-5 h-5 text-primary" aria-hidden="true" />
            <h3 className="font-semibold text-foreground">Warranty Information</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            {materials.warranty}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServiceMaterials;
