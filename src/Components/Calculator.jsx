import React from 'react'


import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
const url = "https://gold-rate-calculator-backend.onrender.com"

//gold_rate_home
const UNIT = [
  {
    value: 'gram',
    label: 'gram',
  },
  {
    value: 'pavan',
    label: 'pavan',
  }
];
const CARRAT = [
  {
    value: '24k',
    label: '24k',
  },
  {
    value: '22k',
    label: '22k',
  },
  {
    value: '18k',
    label: '18k',
  }
];
const currencies = [
  {
    value: 'Rs',
    label: '₹',
    conversionRate: 1, // Conversion rate to INR (Indian Rupee)
  },
  {
    value: 'USD',
    label: '$',
    conversionRate: 83.16, // Conversion rate to INR (Indian Rupee)
  }
];
const Calculator = () => {
     //gold_rate_home
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState('gram');
  const [carrat, setCarrat] = useState('24k');
  const [currency, setCurrency] = useState('Rs');
  const [totalAmount, setTotalAmount] = useState(0);

  const handleCalculate = async () => {
    const res = await fetch(`${url}/gold_rate/ind_gold_rate`, {
      method: 'GET'
    });
    const data = await res.json();
    const price = data.price;

    let calculatedAmount = 0;
    if (unit === 'gram') {
      if (carrat === '24k') {
        calculatedAmount = quantity * price;
      } else if (carrat === '22k') {
        calculatedAmount = quantity * (price - 443.15);
      }else if (carrat === '18k') {
        calculatedAmount = quantity * (price - 886.3);
      }
    } else if (unit === 'pavan') {
      if (carrat === '24k') {
        calculatedAmount = quantity * 8 * price;
      } else if (carrat === '22k') {
        calculatedAmount = quantity * 8 * (price - 443.15);
      } else if (carrat === '18k') {
        calculatedAmount = quantity * 8 * (price - 886.3);
      }
    }


    const conversionRate = currencies.find(curr => curr.value === currency)?.conversionRate || 1;
    const convertedAmount = calculatedAmount / conversionRate;

    setTotalAmount(convertedAmount);
  };


  return (
    <div>
    <div style={{ display: 'flex', justifyContent: 'center', marginTop:'10%' }}>
        <h1>Gold Rate Calculator</h1>
    </div>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
    <div style={{ display: 'flex', flexDirection: 'column', marginTop:'10%' }}>
      <TextField id="outlined-basic" type='number' label="Quantity" variant="outlined" onChange={(e) => setQuantity(e.target.value)} />
      <TextField
        id="filled-select-currency-native"
        select
        label="Unit"
        defaultValue="gram"
        SelectProps={{
          native: true,
        }}
        helperText="Please select your unit"
        variant="filled"
        onChange={(e) => setUnit(e.target.value)}
      >
        {UNIT.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </TextField>
      <TextField
          id="filled-select-carrat-native"
          select
          label="Carrat"
          defaultValue="24k"
          SelectProps={{
            native: true,
          }}
          helperText="Please select your carrat"
          variant="filled"
          onChange={(e) => setCarrat(e.target.value)}
        >
          {CARRAT.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
      <TextField
        id="filled-select-currency-native"
        select
        label="Currency"
        defaultValue="₹"
        SelectProps={{
          native: true,
        }}
        helperText="Please select your currency"
        variant="filled"
        onChange={(e) => setCurrency(e.target.value)}
      >
        {currencies.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </TextField>
      <Button variant="contained" onClick={handleCalculate}>Calculate</Button>
      <p>Total Amount: {totalAmount.toFixed(2)}</p>
    </div>
  </div>
  </div>
  )
}

export default Calculator