import React, { ComponentType } from "react";
import styled from "styled-components";
import { IconProps, IconWeight } from "phosphor-react";
import { useSelector } from "../../app/hooks";
import { State } from "../../types/appSlice";

type NavbarIconProps = {
  itemName: string;
  setActive: (string) => void;
  weightOverride?: IconWeight;
  Icon: ComponentType<IconProps>;
};

const NavbarIcon = ({
  itemName,
  Icon,
  setActive,
  weightOverride,
}: NavbarIconProps) => {
  const activeSection = useSelector((state: State) => state.activeSection);
  const active = activeSection === itemName;
  return (
    <Container onClick={() => setActive(itemName)} active={active}>
      <Icon size={30} weight={active ? weightOverride || "fill" : "regular"} />
    </Container>
  );
};

export default NavbarIcon;

const Container = styled.div`
  padding: 10px 0;
  color: white;
  transition: transform 0.2s ease-in-out;
  color: ${(props) => (props.active ? "#00f260" : "grey")};
  transform: ${(props) => (props.active ? "scale(1.17)" : "scale(1)")};
`;
