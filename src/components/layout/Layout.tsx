import React from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="bg-blue-200">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
