import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
`;

const ScreenSize = styled.p`
  font-size: 18px;
`;

function Home() {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Navbar />
    <Container>
      <h2>Bem-vindo à Minha Aplicação</h2>
      <ScreenSize>
        Tamanho da Tela: {screenSize.width}px x {screenSize.height}px
      </ScreenSize>
    </Container>
    </>
  );
}

export default Home;
