import React, { useLayoutEffect } from 'react'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { Spinner, Progress, Tag } from 'vtex.styleguide'

const StatusBar = props => {
  const { loading, orderForm } = useOrderForm()

  if (loading) return <Spinner />

  const min = 60
  const percent = Math.ceil((parseFloat(orderForm.value) / 100) / min * 100)
 
  useLayoutEffect(() => {
    const minicartButtonContainer = document.querySelector('.vtex-minicart-2-x-minicartCheckoutButton');
    const minicartButton = document.querySelector('#proceed-to-checkout');
    
    const progressBarContainer = document.querySelector('.vtex-checkout-summary-0-x-summarySmallContent');
    const progressBar = progressBarContainer.querySelector('.br-pill');
    
    if (minicartButtonContainer && minicartButton) {
      const buttonLabel = minicartButton.querySelector('.vtex-button__label')
      buttonLabel.innerHTML = `VEURE CISTELLA`
      if (!loading) {
        const hasMinimum = parseFloat(orderForm.value) / 100 >= min
        const isMissing = (min - (parseFloat(orderForm.value) / 100)).toLocaleString('ca-ES' ,{ style:'currency', currency:'EUR'} )
        if (hasMinimum) {
          progressBar.innerHTML =  `ENVIAMENT GRATUIT`
        } else { 
          progressBar.innerHTML = `Ports GRATIS: falten ${isMissing}`
           }
      }
    }
  }, [orderForm])

  return (
    <>
      <Tag bgColor="#63BBA8" color="#ffffff"></Tag>
      <span className='mt1 flex'>&nbsp;</span>
      <Progress type="line" color="#63BBA8" percent={percent} />
    </>
  )
}

export default StatusBar
