
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react';
import styles from '../styles/Home.module.css'
import { ApolloClient, InMemoryCache, gql, useQuery, ApolloProvider } from "@apollo/client";
import { HeaderComponent } from '../comps/HeaderComponent';
import { StyledDiv } from '../comps/StyledDiv'
import { ValuesOfCorrectTypeRule } from 'graphql';
import useSWR, { SWRConfig } from 'swr'
import { request } from 'graphql-request'
import { valueToObjectRepresentation } from '@apollo/client/utilities';


const fetcher = query => request('https://graphql-sfv4.zyda.com/graphql/', QUERY_STRING)
const QUERY_STRING = gql`
query{
  store(subdomain: "demo-sfv4") {
    branches{
      areaEn
      contactNumber
      createdAt
      delivery
      deliveryOrdersEnabled
      id
    	dineIn
      maxOrderFulfillmentPeriod
      pickupEnabled
      pickupOrdersType
      restaurantId
    
    }   
    branchesCount
    descriptionAr
    descriptionEn  
    enabledOrderModes{
      carPickup
      delivery
      pickup
    }
  }
}
`;



export default function Home() {
  const { data: values, error: errors } = useSWR(QUERY_STRING, fetcher)
  const { loading, error, data } = useQuery(QUERY_STRING);
  if (loading) return <p>Loading....</p>;
  if (error) return <p>Error :(</p>;
  const { carPickup, delivery, pickup } = values.store.enabledOrderModes


  console.log(values.store.descriptionEn)

  return (
    <div>
      <HeaderComponent >{values.store.descriptionEn}</HeaderComponent>
      <h3 className="h3style">Enabled Order Modes</h3>
      <p className="pstyle">Car Pickup : {carPickup.toString()}</p>
      <p className="pstyle">Delivery : {delivery.toString()}</p>
      <p className="pstyle">Pickup : {pickup.toString()}</p>
      {/* <p>{data.store.enabledOrderModes.carPickup}</p> */}
      <HeaderComponent >Branches</HeaderComponent>
      {data.store.branches.map(branch => {
        return <StyledDiv color='green'>
          <h2>Branch id {branch.id}</h2>
          <p>Branch Area : {branch.areaEn}</p>
          <p>Contact Number : {branch.contactNumber}</p>
          <p>Max Order Fullfillment : {branch.maxOrderFulfillmentPeriod}</p>
          <p>Pickup Enabled : {branch.pickupEnabled}</p>
          <p>Pickup Order Type : {branch.pickupOrdersType}</p>
          <p>Restaurant ID : {branch.restaurantId}</p>
        </StyledDiv>


      }

      )}




    </div>


  )
}
const client = new ApolloClient({
  uri: 'https://graphql-sfv4.zyda.com/graphql',
  cache: new InMemoryCache()
});




client.query({
  query: gql`query{
    store(subdomain: "demo-sfv4") {
      branches{
        areaEn
        contactNumber
        createdAt
        delivery
        deliveryOrdersEnabled
        id
        dineIn
        maxOrderFulfillmentPeriod
        pickupEnabled
        pickupOrdersType
        restaurantId
        phoneNumber
        
      }
      
      branchesCount
      descriptionEn
  
      enabledOrderModes{
        carPickup
        delivery
        pickup
      }
      
      
      
    }
  }
  
    
    `
}).then(result => console.log(result + "ss"))

