import { lazy } from 'react';
import Hero from '../components/home/Hero';
import TrustBar from '../components/home/TrustBar';
import DeferredSection from '../components/DeferredSection';
import { useSEO } from '../hooks/useSEO';
import { seoHome } from '../data/seoConfig';

const ProblemSection = lazy(() => import('../components/home/ProblemSection'));
const StorySection = lazy(() => import('../components/home/StorySection'));
const FrameworkSection = lazy(() => import('../components/home/FrameworkSection'));
const NovaSection = lazy(() => import('../components/home/NovaSection'));
const ResultsNarrative = lazy(() => import('../components/home/ResultsNarrative'));
const WhoWeServe = lazy(() => import('../components/home/WhoWeServe'));
const CaseStudyHighlights = lazy(() => import('../components/home/CaseStudyHighlights'));
const InsightsSection = lazy(() => import('../components/home/InsightsSection'));
const PackagesPreview = lazy(() => import('../components/home/PackagesPreview'));
const HomeCTA = lazy(() => import('../components/home/HomeCTA'));

export default function HomePage() {
  useSEO(seoHome);
  return (
    <>
      <Hero />
      <TrustBar />
      <DeferredSection component={ProblemSection} />
      <DeferredSection component={StorySection} />
      <DeferredSection component={FrameworkSection} />
      <DeferredSection component={NovaSection} minHeight="80vh" />
      <DeferredSection component={ResultsNarrative} />
      <DeferredSection component={WhoWeServe} />
      <DeferredSection component={CaseStudyHighlights} />
      <DeferredSection component={InsightsSection} />
      <DeferredSection component={PackagesPreview} />
      <DeferredSection component={HomeCTA} />
    </>
  );
}
