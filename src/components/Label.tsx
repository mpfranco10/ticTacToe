import React from 'react';

const labelStyle = {
  marginTop: '5px',
  marginBottom: '5px'
};

export default function Label({
  label,
  children
}: {
  label: string;
  children: React.ReactElement;
}) {
  return (
    <>
      <h2 id="statusArea" style={labelStyle}>
        {label}
        {children}
      </h2>
    </>
  );
}
