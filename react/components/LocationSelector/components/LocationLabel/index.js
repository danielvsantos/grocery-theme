import React, { useState } from 'react'

import { Tag, Spinner, IconEdit } from 'vtex.styleguide'
import { useOrderForm } from 'vtex.store-resources/OrderFormContext'

import { graphql } from 'react-apollo'

import LocationSelector from '../../index'

const LocationLabel = props => {

  const { loading, orderForm } = useOrderForm()
  const [showSelector, setShowSelector] = useState(false)

  const getBuyerLocation = () => {
    const { shippingData } = orderForm

    return shippingData && shippingData.address ? shippingData.address.neighborhood : "Unlocalized"
  }

  const getPOCLabel = () => {
    const sector = window.localStorage.getItem('sector');

    return `Lliurament a: ${sector || "Trieu la vostra regió"}`
  }

  return (
    <div className="mr5">
      <Tag type="success">
        {!loading && <span className='pointer' onClick={() => setShowSelector(true)}>
          {getPOCLabel()} <IconEdit size="10" />
        </span>}
        {loading && <Spinner size="10" />}
      </Tag>
      <LocationSelector
        showSelector={showSelector}
        handleClose={() => setShowSelector(false)}
      />
    </div>
  )
}

// const withOrderForm = graphql(orderForm, {
//   options: () => ({
//     ssr: false
//   })
// })

export default LocationLabel
