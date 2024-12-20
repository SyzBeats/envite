import styled from 'styled-components';

interface TitleType {
	color: string;
	textAlign?: string;
}

const MainTitle = styled.h1<TitleType>`
  color: ${(props) => (props.color === 'light' ? '#fff' : props.theme.colors.lightblue)};
  font-size: clamp(3rem, 4vw, 4rem);
  letter-spacing: 1px;
  margin: 0 0 1.85rem 0;
  text-align: ${(props) => props.textAlign || 'left'};
`;

const SecondaryTitle = styled.h2<TitleType>`
  color: ${(props) => (props.color === 'light' ? '#fff' : props.theme.colors.purple)};
  font-size: clamp(1.8rem, 3vw, 2.45rem);
  line-height: 1.25;
  letter-spacing: 1px;
  margin: 2rem 0;
  text-align: ${(props) => props.textAlign || 'left'};
`;

const SecondaryTitleBlue = styled.h2<TitleType>`
  color: ${({ theme }) => theme.colors.lightblue};
  font-size: 2.45rem;
  line-height: 1.25;
  letter-spacing: 1px;
  margin: 2rem 0;
  text-align: ${(props) => props.textAlign || 'left'};
`;

const DashboardSectionTitle = styled.h4`
  color: ${(props) => (props.color === 'light' ? '#fff' : props.theme.colors.blue_dark)};
  font-size: 2.45rem;
  letter-spacing: 1px;
  margin: 2rem 0;
`;

export { MainTitle, SecondaryTitle, DashboardSectionTitle, SecondaryTitleBlue };
