import styled from "@emotion/styled";

export const Spacing = styled.div<{ width?: number; height?: number; }>`
  width: ${props => props.width ?? 1}px;
  height: ${props => props.height ?? 1}px;
`;