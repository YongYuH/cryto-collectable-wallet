import styled from "styled-components";
import { flexbox, grid, FlexboxProps, GridProps as StyledSystemGridProps } from "styled-system";

type GridProps = StyledSystemGridProps & FlexboxProps

const Grid = styled.div<GridProps>`
  display: grid;
  ${flexbox}
  ${grid}
`

export default Grid
