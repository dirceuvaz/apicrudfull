import React, { useState } from 'react';
import styled from 'styled-components';
import UserManagement from '../components/UserManagement'; // Importe o componente de gerenciamento de usuários
import CategoriaManagement from '../components/CategoriaManagement'; // Importe o novo componente de gerenciamento de categorias
import NavbarDash from '../components/NavbarDash';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  background-color: #f4f4f4;
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: #2c6b2f; /* Verde escuro */
  color: #fff;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 200px;
  }

  @media (max-width: 480px) {
    width: 100%;
    position: absolute;
    height: auto;
    box-shadow: none;
    z-index: 1000;
  }
`;

const SidebarMenu = styled.ul`
  list-style: none;
  padding: 0;

  li {
    margin: 15px 0;

    a {
      color: #fff;
      text-decoration: none;
      font-size: 18px;
      display: block;
      padding: 10px;
      border-radius: 5px;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #1b5bab;
      }
    }
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  h2 {
    font-size: 24px;
    color: #333;
  }

  @media (max-width: 768px) {
    padding: 15px;

    h2 {
      font-size: 20px;
    }
  }

  @media (max-width: 480px) {
    padding: 10px;

    h2 {
      font-size: 18px;
    }
  }
`;

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('home');

  const renderContent = () => {
    switch (activeSection) {
      case 'users':
        return <UserManagement />;
      case 'categories':
        return <CategoriaManagement />;
      case 'home':
      default:
        return <h2>Bem-vindo ao Projeto Patas do Amanhã!</h2>;
    }
  };

  return (
    <>
      <NavbarDash />
      <DashboardContainer>
        <Sidebar>
          <SidebarMenu>
            <li><a href="#users" onClick={() => setActiveSection('users')}>Usuários</a></li>
            <li><a href="#animals" onClick={() => setActiveSection('animals')}>Animais</a></li>
            <li><a href="#categories" onClick={() => setActiveSection('categories')}>Categorias de Animais</a></li>
            <li><a href="#orders" onClick={() => setActiveSection('orders')}>Pedidos</a></li>
            <li><a href="#volunteers" onClick={() => setActiveSection('volunteers')}>Voluntários</a></li>
          </SidebarMenu>
        </Sidebar>
        <MainContent>
          {renderContent()}
        </MainContent>
      </DashboardContainer>
    </>
  );
};

export default Dashboard;
