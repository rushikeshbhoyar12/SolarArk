import React from 'react';
import { BrowserRouter as Router, Route, Routes, createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Index from './pages/solar_components/Index/Index';
import About from './pages/solar_components/About/About'; // Import About component
import SolarCalculator from './pages/solar_components/Solar_Calculator/SolarCalculator';
import DashboardLogin from './pages/dashoboard/DashboardLogin';
import Landing from './pages/solar_components/Landing';
import SignUp from './pages/dashoboard/SignUp';
import DashboardLayout from './pages/dashoboard/DashboardLayout';
import DashboardIndex from './pages/dashoboard/DashboardIndex';
import ContactUs from './pages/solar_components/Contact/ContactUs';
import Services from './pages/solar_components/Services/Services';
import ReCalculate from './pages/solar_components/Solar_Calculator/ReCalculate';
import Careers from './pages/solar_components/Careers/Careers';
import EarnWithUs from './pages/solar_components/EarnWithUS/EarnWithUs';
import Homes from './pages/solar_components/OurServices/Homes';
import Commercial from './pages/solar_components/OurServices/Commercial';
import Industries from './pages/solar_components/OurServices/Industries';
import Housing from './pages/solar_components/OurServices/Housing';
import LocateUs from './pages/solar_components/LocateUs/LocateUs';
import ScrollButton from './pages/solar_components/layouts/ScrollButton';
import OurProjects from './pages/solar_components/Our Projects/OurProjects';
import { Gallery } from './pages/solar_components/Gallery/Gallery';
import { GalleryPage } from './pages/solar_components/GalleryPage/GalleryPage';
import PrivacyPolicy from './pages/solar_components/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndCondition';
import AdminDashboard from './pages/dashoboard/AdminDashboard';
import NotFound from './pages/NotFound';


const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Landing />,
      children: [
        {
          index: true,
          element: <Index />
        },
        {
          path: '/about',
          element: <About />
        }
        ,
        {
          path: '/contact',
          element: <ContactUs />
        }
        ,
        {
          path: '/gallery/:id',
          element: <GalleryPage />

        },

        {
          path: '/services',
          element: <Services />
        }
        ,
        {
          path: '/earnwithus',
          element: <EarnWithUs />
        }
        ,
        {
          path: '/ourprojects',
          element: <OurProjects />
        }
        ,
        {
          path: '/recalculate',
          element: <ReCalculate />
        }
        ,
        {
          path: '/careers',
          element: <Careers />
        }
        ,
        {
          path: '/gallery',
          element: <Gallery />
        }
        ,
        {
          path: '/homes',
          element: <Homes />
        }
        ,
        {
          path: '/commercial',
          element: <Commercial />
        }
        ,
        {
          path: '/housing',
          element: <Housing />
        }
        ,
        {
          path: '/industries',
          element: <Industries />
        }
        ,
        {
          path: '/locateus',
          element: <LocateUs />
        }
        ,

        {
          path: '/solar_calculator',
          element: <SolarCalculator />
        },
        {
          path: '/privacy-policy',
          element: <PrivacyPolicy />
        },
        {
          path: '/terms',
          element: <TermsAndConditions />
        }
      ]
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        {
          index: true,
          element: <DashboardIndex />,
        },

      ]
    },
    {
      path: '/dashboardlogin', // Route for the SignIn page
      element: <DashboardLogin />,
    },
    {
      path: '/signup', // Route for the SignIn page
      element: <SignUp />,
    },
    {
      path: '/admin',
      element: <AdminDashboard />,
    },
    {
      path: '*',
      element: <NotFound />,
    },

  ])
  return (
    <>
      <RouterProvider router={router} />
      <ScrollButton />
    </>
  );
}

export default App;
