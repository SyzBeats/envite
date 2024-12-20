import styled from 'styled-components';

import { SecretTypeSelector } from '~/components/collections/SecretTypeSelector';
import { SecondaryTitleBlue } from '~/components/ui/styled/typography';

const SignalBox = () => {
	return (
		<Wrapper>
			<SecondaryTitleBlue color='light' textAlign='center'>
				What do you want to encrypt today?
			</SecondaryTitleBlue>

			<SecretTypeSelector />
		</Wrapper>
	);
};

// --- Styled components ---
const Wrapper = styled.div`
  box-sizing: border-box;
  max-width: 100rem;
  margin: 5vh auto 5vh auto;

  p {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }
`;

export default SignalBox;
