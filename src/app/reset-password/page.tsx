import LogoSegment from '@/components/LogoSegment/LogoSegment';
import React from 'react';
import ResetPass from './ResetPass';
import LoginFooter from '@/components/LoginFooter/LoginFooter';

const ResetPassword = () => {
    return (
        <div className="h-screen">
      <LogoSegment />
      <ResetPass />
      <div className="relative">
        <div className="fixed bottom-0 left-0 right-0">
          <LoginFooter />
        </div>
      </div>
    </div>
    );
};

export default ResetPassword;