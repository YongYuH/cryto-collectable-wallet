import { RouteComponentProps } from "@reach/router";
import { Link } from "gatsby";
import React, { FC } from "react";
import styled from "styled-components";
import useSWR from "swr";
import { Fetcher } from "swr/dist/types";

import Grid from "../../../components/Grid";

const Wrapper = styled.main`
  padding-bottom: 64px;
`
const Header = styled(Grid)`
  grid-template-columns: max-content;
  width: 100%;
`
const LinkWrapper = styled.div`
  grid-row: 1;
  justify-self: flex-start;
`
const CollectionName = styled.div`
  grid-row: 1;
  justify-self: center;
`
const Image = styled.img`
  width: 100%;
`
const FixedSection = styled.div`
  position: fixed;
  bottom: 16px;
  width: 100%;
`
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`

interface Collection {
  name: string
}

interface Data {
  collection: Collection
  description: string
  image_url: string
  name: string
  permalink: string
}

const fetcher: Fetcher<Data> = async (...args) => {
  const response = await fetch(args);
  const responseJson = response.json();
  return responseJson;
}

type AssetDetailProps = RouteComponentProps<{ assetContractAddress: string, tokenId: string }>

const AssetDetail: FC<AssetDetailProps> = (props) => {
  const { assetContractAddress, tokenId } = props
  const apiUrl = `https://api.opensea.io/api/v1/asset/${assetContractAddress}/${tokenId}`
  const { data, error } = useSWR(apiUrl, fetcher)

  if (!data) {
    return (
      <div>Loading...</div>
    )
  }

  if (error) {
    return (
      <div>Error</div>
    )
  }

  return (
    <Wrapper>
      <Grid gridRowGap="16px" justifyItems="center">
        <Header>
          <LinkWrapper>
            <Link to='/assets'>
              <button>{"<"}</button>
            </Link>
          </LinkWrapper>
          <CollectionName>{data.collection.name}</CollectionName>
        </Header>
        <Image src={data.image_url} />
        <div>{data.name}</div>
        <div>{data.description}</div>
      </Grid>
      <FixedSection>
        <ButtonWrapper>
          <Link to={data.permalink}>
            <button>permalink</button>
          </Link>
        </ButtonWrapper>
      </FixedSection>
    </Wrapper>
  )
}

export default AssetDetail
