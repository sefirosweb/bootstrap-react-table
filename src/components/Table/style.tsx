import styled, { keyframes } from 'styled-components';

export const LoaderTD = styled.td`
  background-color: var(--bs-border-color) !important;
  box-shadow: inset 0 0 0 0 rgba(0, 0, 0, 0) !important;
  height: 0 !important;
  padding: 0 !important;
`

export const LoaderDiv = styled.div`
  margin: 0 auto;
  position: relative;
  padding: 3px;
`

const borealisBar = keyframes`
  0% {
    left: 0%;
    right: 100%;
    width: 0%;
  }
  20% {
    left: 0%;
    right: 75%;
    width: 25%;
  }
  80% {
    right: 0%;
    left: 75%;
    width: 25%;
  }
  100% {
    left: 100%;
    right: 0%;
    width: 0%;
  }
`
export const LoaderBar = styled.div`
  position: absolute;
  top: 0;
  right: 100%;
  bottom: 0;
  left: 0;
  background: var(--bs-primary);
  width: 0;
  animation: ${borealisBar} 1s linear infinite;
`