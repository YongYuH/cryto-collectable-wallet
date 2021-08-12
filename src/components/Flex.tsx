import styled from "styled-components";
import { flexbox, FlexboxProps } from "styled-system";

type FlexProps = FlexboxProps

const Flex = styled.div<FlexProps>`
  display: flex;
  ${flexbox}
`

export default Flex
