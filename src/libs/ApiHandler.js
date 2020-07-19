import React from 'react';
import PropTypes from 'prop-types';

export const DownloadLink = ({ to, children, ...rest }) => {

  return (
    <a
      {...rest}
      href={to}
      download
    >
      {children}
    </a>
  );
};


DownloadLink.propTypes = {
  to: PropTypes.string,
  children: PropTypes.any,
};

export default DownloadLink;