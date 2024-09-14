import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  text-align: center;
  padding: 10px;
  background-color: #282c34;
  color: white;
  position: fixed;
  width: 100%;
  bottom: 0;
`;

function Footer() {
  return (
    <FooterContainer>
      &copy; 2024 Grupo 25
    </FooterContainer>
  );
}

export default Footer;
