'use client';

import { Hero } from './Hero';
import { TrustBar } from './TrustBar';
import { ProductCards } from './ProductCards';
import { ApplicationsGrid } from './ApplicationsGrid';
import { WhyBlackOpal } from './WhyBlackOpal';
import { FeaturedProduct } from './FeaturedProduct';
import { CompanySection } from './CompanySection';
import { NewsroomPreview } from './NewsroomPreview';
import { CTABand } from './CTABand';

export function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ProductCards />
      <ApplicationsGrid />
      <WhyBlackOpal />
      <FeaturedProduct />
      <CompanySection />
      <NewsroomPreview />
      <CTABand />
    </>
  );
}
