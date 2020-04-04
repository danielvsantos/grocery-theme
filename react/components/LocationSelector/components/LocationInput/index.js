import React, { useState, useRef } from 'react'

import { AutocompleteInput, Spinner } from 'vtex.styleguide'
import { updateOrderFormShipping } from 'vtex.store-resources/Mutations'
import { useOrderForm } from 'vtex.store-resources/OrderFormContext'

const API_KEY = "AIzaSyDXeI-lJMw2Afk-vC05mFGYVDAmayi77mM"
import { useLoadScript, StandaloneSearchBox } from '@react-google-maps/api'

const libraries = ['places']

import './index.css'

const LocationInput = props => {

  const { type, handleClose, onChange } = props
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries: libraries
  })
  const { loading, orderForm, updateOrderFormShipping, refetch } = useOrderForm()

  console.log('isLoaded', isLoaded);

  const [term, setTerm] = useState('')
  const timeoutRef = useRef(null)
  const autocomplete = useRef(null)
  const [address, setAddress] = useState({})

  const onLoad = i => {
    autocomplete.current = i
  }

  const saveAddress = async userAddress => {
    const { client } = props
    const { orderFormId } = orderForm

    const res = await updateOrderFormShipping({
      variables: {
        orderFormId,
        address: {
          neighborhood: userAddress.neighborhood,
          number: userAddress.number,
          street: userAddress.street,
          postalCode: userAddress.postal_code,
          city: userAddress.city,
          geoCoordinates: [userAddress.geoCoordinates.lng, userAddress.geoCoordinates.lat],
          state: userAddress.state,
          country: userAddress.country
        }
      }
    })
    await refetch()
    handleClose()
  }

  const handleChange = (a) => {
    const places = autocomplete.current.getPlaces()

    const [{ address_components, geometry }] = places
    const userAddress = {
      street: address_components.find(function (c) { return c.types.includes('route') }).long_name,
      neighborhood: address_components.find(function (c) { return c.types.includes("sublocality") || c.types.includes("sublocality_level_1") }).long_name,
      city: address_components.find(function (c) { return c.types.includes("administrative_area_level_2") }).long_name,
      state: address_components.find(function (c) { return c.types.includes("administrative_area_level_1") }).short_name,
      country: address_components.find(function (c) { return c.types.includes("country") }).long_name,
      postal_code: address_components.find(function (c) { return c.types.includes("postal_code") }).long_name,
      geoCoordinates: {
        lat: geometry.location.lat(),
        lng: geometry.location.lng()
      }
    }
    setAddress(userAddress)

    console.log("address", userAddress);
    saveAddress(userAddress)
  }

  if (!isLoaded || loading) return <Spinner />

  return (
    <StandaloneSearchBox
      onLoad={onLoad}
      onPlacesChanged={(() => onChange(autocomplete.current.getPlaces())) || handleChange}
    >
      <input
        type="text"
        placeholder={`Your ${type}`}
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `25vw`,
          height: `32px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`
        }}
      />
    </StandaloneSearchBox>
  )
}

// const withOrderForm = graphql(orderForm, {
//   options: () => ({
//     ssr: false
//   })
// })

export default LocationInput
