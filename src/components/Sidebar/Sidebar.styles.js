import styled from "@emotion/styled"

export const HeaderContainers = styled.div`
text-align: center;
overflow: hidden;
position: fixed;
top: 0;
transition: .2s ease-in all
width: ${(p) => (p.isSidebarOpen ? "80%" : "90%")};
height:auto;
color:red;
`

export const HeaderContainer = styled.div`
z-index: 1020;
width: 100%;
 height:auto;
background-image: linear-gradient(
  315deg,
  ${(p) => (p.colorPalette ? p.colorPalette.bgColor1 : "blue")} 0%,
  ${(p) => (p.colorPalette ? p.colorPalette.bgColor2 : "red")} 74%),
  url(${(p) => p.backgroundImage});
 top:0; right:0; 
 border-bottom: none;
 position: fixed;
 box-shadow: 0 0 15px 0 #ccc;
 transition: .3s ease-in all
 padding: .7rem 1.5rem;
`

export const SidebarContainer = styled.div`
width: ${(p) => (p.isSidebarOpen ? "20%" : "10%")};
z-index: 9999;
max-width: 235px;
min-width: 80px;
background-image: linear-gradient(
  315deg,
  ${(p) => (p.colorPalette ? p.colorPalette.bgColor1 : "blue")} 0%,
  ${(p) => (p.colorPalette ? p.colorPalette.bgColor2 : "red")} 74%),
  url(${(p) => p.backgroundImage});
color: #fff;
position: relative;
background-size: cover;
background-repeat: no-repeat;
background-position: center center;
height:calc(100vh, -40vh);
transition: .2s ease-in all
box-shadow:10px 0 20px rgb(0 0 0 / 5%);
`

export const SidebarHeader = styled.h3`
  padding: 20px 0;
  text-align: center;
  margin-bottom: 10px;
  letter-spacing: 6px;
  font-family: ${(p) => p.font};
`

export const MenuItemContainer = styled.div``
export const ItemContainer = styled.div``

export const MenuItem = styled.div`
  ${(p) =>
    !p.isSidebarOpen &&
    `
    text-align: center;
    ${
      p.selected &&
      `background-color: ${
        p.colorPalette.selectedBackgroundCollapsedMode === "dark"
          ? "rgba(0, 0, 0, 0.6)"
          : "rgba(255, 255, 255, 0.6)"
      }`
    };
  `};
  padding: 6px 20px;
  font-weight: 600;
  color: ${(p) =>
    p.selected ? p.colorPalette.fontColorSelected : p.colorPalette.fontColor};
  font-family: ${(p) => p.font};
  white-space: nowrap;
  position: relative; // Dropdown Icon
  transition: 0.2s ease-in all;
  &:hover {
    border-left: 5px solid red;
    color: ${(p) => p.colorPalette.fontColorSelected};
    transition: 0.1s ease-in all;
  }
  &:after {
    content: "";
    border: 1px solid
      ${(p) =>
        p.selected
          ? p.colorPalette.fontColorSelected
          : p.colorPalette.dividerColor};
    display: ${(p) =>
      p.isSidebarOpen && p.selected && p.isOpen ? "none" : "block"};
    margin: 8px 0 4px;
    transition: 0.1s ease-in all;
  }
  ${(p) =>
    !p.selected &&
    `
    &:hover {
      &:after {
        border: 1px solid rgba(255, 255, 255, 0.2);
        transition: .1s ease-in all;
      }
    }
  `}
`

export const Text = styled.p`
  display: ${(p) => (p.isSidebarOpen ? "inline" : "none")};
  margin-left: 10px;
`

export const Icon = styled.img`
  ${(p) => p.isSidebarOpen && `transition: .2s ease-in padding-right`};
  height: 16px;
  width: 16px;
`

export const SubMenuItemContainer = styled.div`
  font-size: 14px;
  ${(p) => p.isSidebarOpen && "padding-left: 15%"};
  ${(p) => !p.isSidebarOpen && "text-align: center"};
`
export const SubMenuItem = styled.p`
  color: ${(p) =>
    p.selected ? p.colorPalette.fontColorSelected : p.colorPalette.fontColor};
  ${(p) => p.selected && "font-weight: bold; letter-spacing: 2px;"};
  transition: 0.2s;
  &:hover {
    border-left: 5px solid red;
    color: ${(p) => p.colorPalette.fontColorSelected};
  }
`

export const DropdownIcon = styled.span`
  position: absolute;
  top: ${(p) => (p.isOpen ? "16px" : "12px")};
  right: 24px;
  border: solid
    ${(p) =>
      p.selected ? p.colorPalette.fontColorSelected : p.colorPalette.fontColor};
  border-width: 0 1px 1px 0;
  padding: 3px;
  transform: ${(p) => (p.isOpen ? "rotate(-135deg)" : "rotate(45deg)")};
  transition: 0.4s;
`

export const TogglerContainer = styled.div`
  position: absolute;
  width: 30%;
  bottom: 10%;
  left: 0;
  right: 0;
  margin: 0 auto;
`

export const Toggler = styled.div`
  height: 40px;
  cursor: pointer;
  position: relative; // horizontal lines
  &:after {
    content: "";
    position: absolute;
    left: 0;
    top: 0.25em;
    height: 0.1em;
    width: 100%;
    background: #fff;
    box-shadow: 0 0.75em 0 0 #fff, 0 1.5em 0 0 #fff;
  }
`
