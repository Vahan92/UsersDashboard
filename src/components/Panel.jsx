import React from "react";
import { Switch, Route, NavLink, BrowserRouter } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as UsersPanel } from "../assets/images/Premium-Users.svg";
import { ReactComponent as Homepage } from "../assets/images/Homepage.svg";
import { ReactComponent as Bell } from "../assets/images/Bell4.svg";
import { ReactComponent as Loupe } from "../assets/images/Loupe.svg";
import { ReactComponent as UserCircle } from "../assets/images/User-Circle.svg";
import Users from "./panel_components/Users";

function panel() {
  return (
    <BrowserRouter>
      <TabLinks>
        <div />
        <NavLink
          exact
          activeClassName="active"
          activeStyle={{ backgroundColor: "#1F2430" }}
          to={`/`}
        >
          <Homepage /> Homepage
        </NavLink>
        <NavLink
          activeClassName="active"
          activeStyle={{ backgroundColor: "#1F2430" }}
          to={`/users`}
        >
          <UsersPanel /> Users
        </NavLink>
      </TabLinks>
      <Tabs>
        <Messages>
          <Loupe />
          <Bell />
          <UserCircle />
        </Messages>
        <Switch>
          <Route path={`/users`} component={Users} />
        </Switch>
      </Tabs>
    </BrowserRouter>
  );
}

const TabLinks = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #2d3347;
  min-width: 270px;
  min-height: 100vh;
  > div {
    height: 70px;
    background-color: #272d3e;
  }
  a {
    padding: 21px 0 21px 32px;
    color: white;
    text-align: left;
    svg {
      margin: 0 20px 0 0;
    }
    .tabs {
      width: 100%;
    }
  }
`;

const Messages = styled.div`
  height: 70px;
  border-bottom: 1px solid #e9e9e9;
  margin: 0 0 24px 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  svg:nth-child(1) {
    margin: 0 16px;
  }
  svg:nth-child(3) {
    margin: 0 32px;
  }
`;

const Tabs = styled.div`
  width: 100%;
`;

export default panel;
