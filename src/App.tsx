import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';

const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const WorkPage = lazy(() => import('./pages/WorkPage'));
const CaseStudyPage = lazy(() => import('./pages/CaseStudyPage'));
const PackagesPage = lazy(() => import('./pages/PackagesPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const NovaPage = lazy(() => import('./pages/NovaPage'));
const AmplifyPage = lazy(() => import('./pages/pillars/AmplifyPage'));
const IntelligencePage = lazy(() => import('./pages/pillars/IntelligencePage'));
const ReachPage = lazy(() => import('./pages/pillars/ReachPage'));
const EngagePage = lazy(() => import('./pages/pillars/EngagePage'));
const AnalyzePage = lazy(() => import('./pages/pillars/AnalyzePage'));
const BuildPage = lazy(() => import('./pages/pillars/BuildPage'));
const MetaAdsPage = lazy(() => import('./pages/services/MetaAdsPage'));
const GoogleAdsPage = lazy(() => import('./pages/services/GoogleAdsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function RouteFallback() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <div
        className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
        style={{ borderColor: 'var(--color-gold)', borderTopColor: 'transparent' }}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/work" element={<WorkPage />} />
              <Route path="/work/:slug" element={<CaseStudyPage />} />
              <Route path="/packages" element={<PackagesPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/nova" element={<NovaPage />} />
              <Route path="/amplify" element={<AmplifyPage />} />
              <Route path="/intelligence" element={<IntelligencePage />} />
              <Route path="/reach" element={<ReachPage />} />
              <Route path="/engage" element={<EngagePage />} />
              <Route path="/analyze" element={<AnalyzePage />} />
              <Route path="/build" element={<BuildPage />} />
              <Route path="/services/meta-ads" element={<MetaAdsPage />} />
              <Route path="/services/google-ads" element={<GoogleAdsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}
