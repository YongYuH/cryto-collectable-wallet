import React from "react";
import useSWR from "swr";
import { Fetcher } from "swr/dist/types";

/** ref: https://docs.opensea.io/reference/asset-object */
interface Data {
  // The token ID of the ERC721 asset
  token_id: string
  // An image for the item
  image_url: string
  // The background color to be displayed with the item
  background_color: string
  // Name of the item
  name: string
  // External link to the original website for the item
  external_link: string
  // Dictionary of data on the contract itself (see asset contract section)
  asset_contract: string
  // Dictionary of data on the owner (see account section)
  owner: string
  // A list of traits associated with the item (see traits section)
  traits: string
  // When this item was last sold (null if there was no last sale)
  last_sale: string
}

const fetcher: Fetcher<Data> = async (...args) => {
  const response = await fetch(args);
  const responseJson = response.json();
  return responseJson;
}

const ownerAddress = "0x960DE9907A2e2f5363646d48D7FB675Cd2892e91"
const apiUrl = `https://api.opensea.io/api/v1/assets?owner=${ownerAddress}`

const Detail = () => {
  const { data, error, isValidating, mutate } = useSWR(apiUrl, fetcher)

  if (isValidating) {
    return (
      <div>loading</div>
    )
  }

  if (error) {
    return (
      <div>Error</div>
    )
  }

  console.log(data)

  return (
    <main>
      <div>detail</div>
    </main>
  )
}

export default Detail
