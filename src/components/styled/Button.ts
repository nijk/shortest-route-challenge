import styled from 'styled-components';

export const Button = styled.button`
  background: ${({ theme }) => theme.palette.primary};
  border: 0;
  border-radius: 0.2rem;
  color: ${({ theme }) => theme.palette.text};
  cursor: pointer;
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
`;
