import { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider, Navigate, useOutlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ScrollToTop } from '@/lib/scroll-to-top';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HomePage from '@/components/pages/HomePage';
import RestrictedMaterialsPage from '@/components/pages/RestrictedMaterialsPage';
import OurTeamPage from '@/components/pages/OurTeamPage';
import ScrapLawsPage from '@/components/pages/ScrapLawsPage';
import PaymentPolicyPage from '@/components/pages/PaymentPolicyPage';
import ContactPage from '@/components/pages/ContactPage';
import { seoMetadata } from '@/lib/seo-metadata';

function PageMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const slug = pathname.replace(/^\//, '') || '';
    const meta = seoMetadata[slug] || seoMetadata[''];
    document.title = meta.title;
    const descEl = document.querySelector('meta[name="description"]');
    if (descEl) descEl.setAttribute('content', meta.description);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', meta.title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', meta.description);
  }, [pathname]);

  return null;
}

function FrozenOutlet() {
  const outlet = useOutlet();
  const [frozen] = useState(outlet);
  return frozen;
}

function AnimatedOutlet() {
  const location = useLocation();

  return (
    <div className="bg-surface-950">
      <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 40 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
          }}
          exit={{
            opacity: 0,
            transition: { duration: 0.2, ease: 'easeIn' },
          }}
        >
          <FrozenOutlet />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Layout() {
  return (
    <>
      <ScrollToTop />
      <PageMeta />
      <Header />
      <main>
        <AnimatedOutlet />
      </main>
      <Footer />
      <Toaster />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "restricted-materials",
        element: <RestrictedMaterialsPage />,
      },
      {
        path: "our-team",
        element: <OurTeamPage />,
      },
      {
        path: "scrap-laws",
        element: <ScrapLawsPage />,
      },
      {
        path: "payment-policy",
        element: <PaymentPolicyPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
