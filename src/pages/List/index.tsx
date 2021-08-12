import React, { MouseEventHandler } from "react";
import styled from "styled-components";
import { useSWRInfinite } from "swr";
import { Fetcher } from "swr/dist/types";

import Flex from "../../components/Flex";
import Grid from "../../components/Grid";
import Card, { cardWidth } from "./Card";

const gray = 'rgba(0, 0, 0, 0.6)'

const Title = styled.h1`
  display: flex;
  justify-content: center;
  font-size: 32px;
`
const FixedSection = styled.div`
  position: fixed;
  bottom: 16px;
  width: 100%;
`
const ButtonWrapper = styled.div`
  width: 200px;
  margin: auto;
  padding: 8px;
  background-color: ${gray};
  display: flex;
  justify-content: center;
`
const Button = styled.button`
  background-color: ${gray};
  color: white;
`

interface Collection {
  name: string
}

interface Asset {
  collection: Collection
  description: string
  image_url: string
  name: string
  permalink: string
  token_id: string
}

interface Data {
  assets: Asset[]
}

const fetcher: Fetcher<Data> = async (...args) => {
  const response = await fetch(args);
  const responseJson = response.json();
  return responseJson;
}

const getKey = (pageIndex, previousPageData) => {
  const ownerAddress = "0x960DE9907A2e2f5363646d48D7FB675Cd2892e91"
  const apiUrl = `https://api.opensea.io/api/v1/assets?owner=${ownerAddress}&offset=${pageIndex}&limit=20`
  return apiUrl
}

const List = () => {
  const { data, error, isValidating, size, setSize } = useSWRInfinite(getKey, fetcher)

  const handleFetchMore: MouseEventHandler<HTMLButtonElement> = () => {
    setSize(size => size + 1)
  }

  if (error) {
    return (
      <div>Error!!!</div>
    )
  }

  if (!data) {
    return (
      <div>Loading!!!</div>
    )
  }

  const assets = data?.reduce((acc, cur) => {
    return [
      ...acc,
      ...cur.assets
    ]
  }, [] as Asset[])

  return (
    <main>
      <Grid gridRowGap='32px'>
        <Title>List</Title>
        <Grid gridTemplateColumns={`repeat(auto-fill, ${cardWidth}px)`} gridColumnGap='16px' gridRowGap='16px' justifyContent='center'>
          {assets.map(asset => (
            <Card
              key={asset.token_id}
              imageUrl={asset.image_url}
              collectionName={asset.collection.name}
              url={`assets/${asset.token_id}`}
            />
          ))}
        </Grid>
        {isValidating && (<Flex justifyContent='center'>loading...</Flex>)}
      </Grid>
      <FixedSection>
        <ButtonWrapper>
          <Button onClick={handleFetchMore}>fetchMore</Button>
        </ButtonWrapper>
      </FixedSection>
    </main>
  )
}

export default List
