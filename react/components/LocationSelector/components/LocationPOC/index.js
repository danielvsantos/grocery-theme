import React, { useState } from "react";
import axios from "axios";
import { Dropdown, Spinner } from "vtex.styleguide";
import { orderFormConsumer } from "vtex.store-resources/OrderFormContext";
import { useOrderForm } from 'vtex.order-manager/OrderForm'

const LocationPOC = props => {
  const [sector, setSector, setLabel, label] = useState(null);
  const { orderForm, loading } = useOrderForm()

  const handleChange = async (e, value) => {
    const humanizedSector = value.split("=")[1];

    setSector(value);
    window.localStorage.setItem("sector", humanizedSector);
    const data = {
      public: {
        sc: {
          value: humanizedSector
        }
      }
    };
    const response = (
      await axios({
        url: "/api/sessions",
        method: "POST",
        data
      })
    ).data;
    await clearOrderFormItems();

    return window.location.reload();
  };

  const clearOrderFormItems = async () => {
    let { orderFormContext: { updateOrderForm } } = props;
    const orderFormId = !loading && orderForm ? orderForm.id : undefined
    let items = !loading && orderForm ? orderForm.items : undefined

    if (!items.length) return;

    items = items.map((item, index) => {
      return {
        id: parseInt(item.id),
        quantity: 0,
        seller: "1",
        index: parseInt(index)
      };
    });
    const response = await updateOrderForm({
      variables: {
        orderFormId,
        items
      }
    });
    window.localStorage.removeItem("orderform");
  };

  if(sector) { 
    return (
      <div className="flex items-center justify-center">
        <Spinner />
      </div>
    ) 
  }

  return (
    <div className="w-100">
      <Dropdown
        label="Trieu la vostra regió"
        size="small"
        options={[
          { value: "sc=14", label: "Barcelona centro" },
          { value: "sc=10", label: "Masnou" },
          { value: "sc=13", label: "Vilanova" },
          { value: "sc=15", label: "Olerdola" },
          { value: "sc=14", label: "St Cugat" },
          { value: "sc=14", label: "Badalona" }
        ]}
        value={sector}
        onChange={handleChange}
      />
    </div>
  );
};

export default orderFormConsumer(LocationPOC);
