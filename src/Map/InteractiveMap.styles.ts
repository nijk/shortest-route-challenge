import styled, { css } from 'styled-components';

const paddingMixin = css`
  padding: 2rem;
`;

export const Main = styled.main`
  ${paddingMixin};
  align-items: flex-start;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  justify-content: flex-start;
`;

export const Header = styled.header`
  ${paddingMixin};
  align-items: flex-start;
  display: flex;
  flex: 0 1 auto;
  min-height: 6rem;
`;

export const HeaderActions = styled.div`
  flex: 0 0 auto;
`;

export const HeaderInfo = styled.div`
  flex: 1 1 auto;
  padding: 0 2rem;
`;

export const HeaderInfoText = styled.p`
  color: ${({ theme }) => theme.palette.text};
  font-size: 1.4rem;
  margin: 0;
  padding: 0;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  flex: 1 1 auto;
`;

export const Wrapper = styled.section`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;
