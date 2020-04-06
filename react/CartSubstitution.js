import { RadioGroup } from 'vtex.styleguide'


const Preferencias = () => {
  return (
    <div>
      <h1>Les meves preferències</h1>
      <div>Què vols que fem si no hi ha un producte? Selecciona el teu criteri de substitució:</div>
      <RadioGroup
        name="criteriSubstituicio"
        options={[
          { value: 'value1', label: 'Criteri Ametller Origen' },
          { value: 'value2', label: 'Contacteu-me per telèfon' },
          {value: 'value3', label: 'Contacteu-me per WhatsApp' },
        ]}
        value="value1"
        onChange={() => {}}/>
    </div>
  )
}

export default Preferencias
