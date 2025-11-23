import React from 'react';

const GlassCard = ({ children, className = "", ...props }) => (
    <div className={`glass-panel rounded-3xl p-6 ${className}`} {...props}>
        {children}
    </div>
);

export default GlassCard;
