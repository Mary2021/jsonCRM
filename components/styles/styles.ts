import styled from '@emotion/styled';
import { Card, Container } from '@mui/material';

export const Header = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  button{
    margin-inline-end:1rem;
  }
`
export const ClientName= styled.span`
    color:hotpink;
`
export const Block = styled(Card)`
  padding:1rem;
  display:flex;
  flex-direction:column;
  margin:1rem ;
  justify-content:space-between;
  >div{
      margin-block-end:1rem;
  }
  button{
    margin:2rem 0 1rem 0;
  }
`

export const Wrap = styled(Container)`
  background:white;
  padding:0;
  >div {
    max-width: 60ch;
    width: 100%;
    margin:0 auto;
  }
`