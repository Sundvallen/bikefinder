import React from "react";

import { Gear, MapTrifold, ListDashes } from "phosphor-react";
import styled from "styled-components";
import NavbarIcon from "./NavbarIcon";
import { State } from "../../types/appSlice";
import { setActiveSection } from "./appSlice";
import { useDispatch, useSelector } from "../../app/hooks";
const Navbar = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state: State) => state.loading);
  const setActive = (itemName) => {
    dispatch(setActiveSection(itemName));
  };
  return (
    <Container isLoading={loading}>
      <NavbarIcon
        itemName="StationList"
        setActive={setActive}
        Icon={ListDashes}
        weightOverride="bold"
      />
      <NavbarIcon itemName="Map" setActive={setActive} Icon={MapTrifold} />
      <NavbarIcon itemName="Settings" setActive={setActive} Icon={Gear} />
    </Container>
  );
};

export default Navbar;

const Container = styled.div`
  display: flex;
  opacity: ${(props) => (props.isLoading ? 0 : 1)};
  background: #282828;
  justify-content: space-around;
  margin: 20px;
  z-index: 10;
  border-radius: 15px;
  position: absolute;
  bottom: 0;
  width: 90%;
  height: 50px;
  box-shadow: 0px 1px 29px -6px rgba(0, 0, 0, 1);
  -webkit-box-shadow: 0px 1px 29px -6px rgba(0, 0, 0, 1);
  -moz-box-shadow: 0px 1px 29px -6px rgba(0, 0, 0, 1);
`;
