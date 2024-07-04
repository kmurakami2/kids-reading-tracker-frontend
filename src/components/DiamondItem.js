import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

const DiamondContainer = styled(animated.div)`
  width: 40px;
  height: 40px;
`;

const Diamond = styled.div`
  width: 100%;
  height: 100%;
  background-color: #00FFFF;
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
`;

const DiamondItem = ({ style }) => {
  const animation = useSpring({
    from: { transform: 'rotate(0deg)' },
    to: async (next) => {
      while (1) {
        await next({ transform: 'rotate(5deg)' });
        await next({ transform: 'rotate(-5deg)' });
        await next({ transform: 'rotate(0deg)' });
      }
    },
    config: { duration: 1000 },
  });

  return (
    <DiamondContainer style={{ ...style, ...animation }}>
      <Diamond />
    </DiamondContainer>
  );
};

export default DiamondItem;