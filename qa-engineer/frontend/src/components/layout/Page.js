import styled from "styled-components";

const Header = () => {
  return (<HeaderContainer><h1>Header</h1></HeaderContainer>);
};

const Page = ({ children }) => {
  return (<PageContainer><Header /><ContentContainer>{children}</ContentContainer></PageContainer>);
};

const PageContainer = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background: lightblue;
`;

const ContentContainer = styled.div`
  flex-grow: 1;
  padding-top: 80px;
  padding-left: 20px;
`;

const HeaderContainer = styled.div`
  min-width: 100vw;
  display: flex;
  flex-direction: row;
  min-height: 80px;
  max-height: 80px;
  background: white;
  position: fixed;
  padding-left: 20px;
`;

export default Page;
