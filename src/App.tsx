import { useEffect, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Dashboard } from "./components/Dashboard";
import { useAppStore } from "./store/useAppStore";

// Lazy load section components
const BrandIdentity = lazy(() => import("./components/sections/BrandIdentity"));
const VisualSystem = lazy(() => import("./components/sections/VisualSystem"));
const LogoUsage = lazy(() => import("./components/sections/LogoUsage"));
const Marketing = lazy(() => import("./components/sections/Marketing"));
const Corporate = lazy(() => import("./components/sections/Corporate"));
const Digital = lazy(() => import("./components/sections/Digital"));
const Physical = lazy(() => import("./components/sections/Physical"));
const Resources = lazy(() => import("./components/sections/Resources"));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-border-subtle border-t-accent-primary rounded-full animate-spin"></div>
  </div>
);

function App() {
  const designTheme = useAppStore((state) => state.designTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", designTheme);
  }, [designTheme]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          
          <Route path="brand-identity" element={
            <Suspense fallback={<PageLoader />}><BrandIdentity /></Suspense>
          } />
          <Route path="visual-system" element={
            <Suspense fallback={<PageLoader />}><VisualSystem /></Suspense>
          } />
          <Route path="logobook" element={
            <Suspense fallback={<PageLoader />}><LogoUsage /></Suspense>
          } />
          <Route path="marketing" element={
            <Suspense fallback={<PageLoader />}><Marketing /></Suspense>
          } />
          <Route path="corporate" element={
            <Suspense fallback={<PageLoader />}><Corporate /></Suspense>
          } />
          <Route path="digital" element={
            <Suspense fallback={<PageLoader />}><Digital /></Suspense>
          } />
          <Route path="physical" element={
            <Suspense fallback={<PageLoader />}><Physical /></Suspense>
          } />
          <Route path="resources" element={
            <Suspense fallback={<PageLoader />}><Resources /></Suspense>
          } />

          {/* Fallback for undefined routes */}
          <Route path=":chapterId" element={<div className="p-16 text-xl">Раздел в разработке...</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
