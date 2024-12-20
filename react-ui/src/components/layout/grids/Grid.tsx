import React from 'react';
import styled from 'styled-components';

interface GridType {
	rows: number;
	rowHeight?: string;
	gap?: string;
	children?: React.ReactNode;
}

const Grid = ({ rows, gap = '3rem', rowHeight = '25rem', children }: GridType) => {
	return (
		<Wrapper rows={rows} gap={gap} rowHeight={rowHeight}>
			{children}
		</Wrapper>
	);
};

// --- Styled components ---

const Wrapper = styled.div<GridType>`
  display: grid;
  max-width: 120rem;
  margin: ${({ gap }) => gap} auto;
  gap: ${({ gap }) => gap};
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
`;

export { Grid };
