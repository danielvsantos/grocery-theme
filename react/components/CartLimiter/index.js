import React, { useEffect } from 'react'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { Spinner } from 'vtex.styleguide'

const CartLimiter = props => {
  const { loading, orderForm } = useOrderForm();

  useEffect(() => {
    const minicartButtonContainer = document.querySelector('.vtex-minicart-2-x-minicartCheckoutButton');
    const minicartButton = document.querySelector('#proceed-to-checkout');

    console.log(minicartButtonContainer);
    console.log(minicartButton);

    if (minicartButtonContainer && minicartButton) {
      console.log("elements exist");
      if (!loading) {
        console.log("loaded");
        const hasMinimum = orderForm.value >= 150
        console.log("hasMinimum", hasMinimum);
        if (hasMinimum) {
          minicartButtonContainer.style.pointerEvents = 'all';
          minicartButton.setAttribute('disabled', false);
        } else {
          minicartButtonContainer.style.pointerEvents = 'none';
          minicartButton.setAttribute('disabled', true);
        }
      }
    }
  }, [])

  return (
    <div>asd</div>
  )
}

export default CartLimiter
