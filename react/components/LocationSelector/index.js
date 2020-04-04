import React, { useState } from 'react'
import { Tabs, Tab, Modal } from 'vtex.styleguide'

import LocationInput from './components/LocationInput'
import LocationPOC from './components/LocationPOC'

const LocationSelector = props => {

  const { showSelector, handleClose } = props
  const [currentTab, setCurrentTab] = useState('postalcode')

  return (
    <Modal
      centered
      isOpen={showSelector}
      onClose={handleClose}
    >
      <LocationPOC />
      {/*<Tabs>
        <Tab
          label="Postal Code"
          active={currentTab === 'postalcode'}
          onClick={() => setCurrentTab('postalcode')}
        >
          <LocationInput
            handleClose={handleClose}
            type="postalcode"
          />
        </Tab>
        <Tab
          label="Neighborhood"
          active={currentTab === 'neighborhood'}
          onClick={() => setCurrentTab('neighborhood')}
        >
          <LocationInput
            handleClose={handleClose}
            type="neighborhood"
          />
        </Tab>
      </Tabs>*/}
    </Modal>
  )
}

export default LocationSelector
