import React, { ReactNode } from 'react';
import Marquee, { MarqueeProps } from 'react-fast-marquee';

interface CustomMarqueeProps extends Omit<MarqueeProps, 'children'> {
  children: ReactNode;
}

export const CustomMarquee: React.FC<CustomMarqueeProps> = ({ children, ...props }) => {
  return (
    <Marquee {...props}>
      {children}
    </Marquee>
  );
};

// Default props
CustomMarquee.defaultProps = {
  speed: 50,
  direction: 'left',
  play: true,
  pauseOnHover: false,
  pauseOnClick: false,
  autoFill: false,
  gradient: false,
  gradientColor: 'white',
  gradientWidth: 200,
};

export default CustomMarquee;