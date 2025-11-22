import React from 'react';

const GlassCard = ({ children, className = "" }) => (
    <div className={`glass-panel rounded-3xl p-6 ${className}`}>
        {children}
    </div>
);

export default GlassCard;
