
import styled from '@emotion/styled';
export const HeaderContainer = styled.div`
box-shadow: 0 10px 10px 0 green;
width: ${p => p.isSidebarOpen ? '80%' : '94%'};
height:60px;
background-image: linear-gradient(
315deg,
${p => p.colorPalette.bgColor1} 0%,
${p => p.colorPalette.bgColor2} 74%),
url(${p => p.backgroundImage});
color: ${p => p.colorPalette.fontColorSelected};
background-size: cover;
background-repeat: no-repeat;
background-position: center center;

`