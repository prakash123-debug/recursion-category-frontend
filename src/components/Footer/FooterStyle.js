import styled from '@emotion/styled';


export const FooterContainer = styled.div`
z-index:99;
width: 100%;
 background-image: linear-gradient(
  315deg,
  ${p => p.colorPalette.bgColor1} 0%,
  ${p => p.colorPalette.bgColor2} 70%),
  url(${p => p.backgroundImage});
 color: ${p => p.colorPalette.fontColorSelected};
 background-size: cover;
 background-repeat: no-repeat;
 background-position: center center;
display:flex;
position:fixed;
bottom: 0px;
 
`

export const colors_datas = styled.div`
 height:60px;

`

