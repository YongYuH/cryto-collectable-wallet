import { Link } from "gatsby";
import React, { FC } from "react";
import styled from "styled-components";

import Grid from "../../components/Grid";

const cardWidth = 300;

const Wrapper = styled.div`
  border: 1px solid black;
  padding: 16px 0;
`;
const Image = styled.img`
  width: 250px;
  height: 250px;
  object-fit: cover;
`;
const Name = styled.div`
  word-break: break-all;
`;

interface CardProps {
  collectionName: string
  imageUrl: string
  url: string
}

const Card: FC<CardProps> = (props) => {
  const { collectionName, imageUrl, url } = props

  return (
    <Link to={url}>
      <Wrapper>
        <Grid justifyItems='center' gridRowGap='16px'>
          <Image src={imageUrl} />
          <Name>{collectionName}</Name>
        </Grid>
      </Wrapper>
    </Link>
  )
}

export { cardWidth }

export default Card
