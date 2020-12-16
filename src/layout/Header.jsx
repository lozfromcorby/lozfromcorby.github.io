import React from "react";

const Header = ({children}) => {

    return (
      <div style={{
        position: 'sticky',
        transition: 'all 1.33s cubic-bezier(0.685, 0.0473, 0.346, 1)',
      }}>
        <div style={{
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          minHeight: 75,
          transition: 'all 1.33s cubic-bezier(0.685, 0.0473, 0.346, 1)',
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: '#1C2029'
        }}>
       {children}
        </div>
      </div>
    );
}

export default Header;