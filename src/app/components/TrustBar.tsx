import { Award, Calendar, Factory, Warehouse, Globe } from 'lucide-react';

const items = [
  { icon: Award, label: 'Certifications', value: 'NSF 42 · NSF 61 · Prop 65' },
  { icon: Calendar, label: 'Established', value: 'Since 2010' },
  { icon: Factory, label: 'Production', value: '2 Production Centers' },
  { icon: Warehouse, label: 'Logistics', value: '4 Warehouse Locations' },
  { icon: Globe, label: 'Capacity', value: '50 Million lbs/year' },
];

export function TrustBar() {
  return (
    <section className="py-8 md:py-10">
      <div className="premium-shell">
        <div className="premium-compact-grid border-y border-[#c9a24d]/10 py-6">
          {items.map((item, index) => (
            <div key={item.label} className={`flex items-start gap-4 ${index > 0 ? 'xl:border-l xl:border-[#c9a24d]/10 xl:pl-6' : ''}`}>
              <div className="premium-icon-wrap w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                <item.icon size={18} className="text-[#e6cb87]" />
              </div>
              <div>
                <span
                  className="text-[#8f835f] text-[10px] tracking-[0.18em] uppercase block mb-1"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                >
                  {item.label}
                </span>
                <span
                  className="text-[#f7efdb] text-[14px]"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                >
                  {item.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
