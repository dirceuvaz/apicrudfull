import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  height: 2.5rem;
  align-items: center;
  padding: 10px 20px 10px 10px;
  background-color: #282c34;
`;

const Logo = styled.h1`
  color: white;
  cursor: pointer;
`;

const Menu = styled.div`
  display: flex;
  gap: 15px;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 18px;
  display: flex;
  transition: 0.5s ease;
  width: 100%;
  height: 100%;
  padding: 10px;

  &:hover {
    transform: scale(1.2);
  }
`;

const LoginBtn = styled.button`
  background-color: #03a64a;
  cursor: pointer;
  border: none;
  border-radius: 25px;
  width: 100px;
  height: 100%;
  color: #fff;
  text-weight: bold;
  transition: 0.5s;

  &:hover {
    background-color: rgb(41, 128, 185, 0.5);
  }
`;

function Navbar() {
  return (
    <Nav>
      <Logo>Patas do Amanhã</Logo>
      <Menu>
        <NavLink to="/">Home</NavLink>
        <Link to="/login">
          <LoginBtn>Logar</LoginBtn>
        </Link>
      </Menu>
    </Nav>
  );
}

export default Navbar;
