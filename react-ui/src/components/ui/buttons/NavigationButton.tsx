import React from 'react';
import styled from 'styled-components';

import { PropsChildren } from '~/types/types-components';

interface Props extends PropsChildren {
	action?: Function;
}

const NavigationButton = ({ children, action }: Props) => {
	return <Button onClick={() => action?.()}>{children}</Button>;
};

// --- Styled components ---

const Button = styled.div`
  margin: 1.75rem 0;
  filter: grayscale(0.2);
  transition: 0.25s;

  &:hover {
    cursor: pointer;
    transform: scale3d(1.1, 1.1, 1.1);
    filter: ${({ theme }) => `grayscale(0) drop-shadow(1px 2px 9px ${theme.colors.iceblue_800})`};
  }
`;

export default NavigationButton;
