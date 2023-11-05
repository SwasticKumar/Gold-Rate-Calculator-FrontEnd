import React, { useState, useEffect, useRef } from "react";
import { jsPDF } from "jspdf";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

const url = "https://gold-rate-calculator-backend.onrender.com";

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

export default function Home() {
  const pdfRef = useRef(null);

  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState('gram');
  const [carrat, setCarrat] = useState('24k');
  const [currency, setCurrency] = useState('₹');
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
      } else if (carrat === '18k') {
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

  //Data Html to PDF converter part
  const handleDownload = () => {
    const content = pdfRef.current;

    const doc = new jsPDF();
    doc.html(content, {
        callback: function (doc) {
            doc.save('Gold_data.pdf');
        },
        width: 180, // <- here
        windowWidth: 500, // <- here
        hight: 1000,
    });
};
  return (
    <div style={{backgroundColor:"#F8F7DA"}}>
      <div  style={{ display: 'flex', justifyContent: 'center'}}>
        <h1 className="mt-5 " style={{color:"#832729"}}>Gold Rate Calculator</h1>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="mt-4" style={{ display: 'flex', flexDirection: 'column'}}>
          <TextField
            id="outlined-basic"
            type='number'
            label="Quantity"
            variant="outlined"
            onChange={(e) => setQuantity(e.target.value)}
          />
          <TextField
            id="filled-select-unit-native"
            select
            
            label="Unit"
            defaultValue="gram"
            SelectProps={{
              native: true,
            }}
            helperText="Please select your unit"
            variant="filled"
            className="text-dark"
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
            label="Carat"
            defaultValue="24k"
            SelectProps={{
              native: true,
            }}
            helperText="Please select your carat"
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
          <Button style={{backgroundColor:"#832729",color:"#F8F7DA"}}  onClick={handleCalculate}>Calculate</Button>
          <p>Total Amount: {totalAmount.toFixed(0)}</p>
        </div>
      </div>
      <div className="card mt-5 mb-2 price border-0" style={{background:"linear-gradient(120deg,#b78628,#F8F7DA,#b78628)"}}>
        {totalAmount ? (
          <div className="card-body" ref={pdfRef} id="tata">
            <h4 className='text-center mb-4 mt-1 odd'>{carrat} Gold Price Today</h4>
            {unit === 'gram' ? (
              <table className="table table-hover text-center odd">
                <thead>
                  <tr>
                    <th>Gram</th>
                    <th>Gold Rate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1 Gram</td>
                    <td>{totalAmount.toFixed(0)}</td>
                  </tr>
                  <tr>
                    <td>8 Gram</td>
                    <td>{totalAmount.toFixed(0) * 8}</td>
                  </tr>
                  <tr>
                    <td>10 Gram</td>
                    <td>{totalAmount.toFixed(0) * 10}</td>
                  </tr>
                  <tr>
                    <td>100 Gram</td>
                    <td>{totalAmount.toFixed(0) * 100}</td>
                  </tr>
                  <tr>
                    <td><mark>{quantity} Gram</mark></td>
                    <td><mark>{totalAmount.toFixed(0) * quantity}</mark></td>
                  </tr>
                </tbody>
              </table>
            ) : unit === 'pavan' ? (
              <table className="table table-hover text-center odd">
                <thead>
                  <tr>
                    <th>Pavan</th>
                    <th>Gold Rate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1 Pavan</td>
                    <td>{totalAmount.toFixed(0)}</td>
                  </tr>
                  <tr>
                    <td>8 Pavan</td>
                    <td>{totalAmount.toFixed(0) * 8}</td>
                  </tr>
                  <tr>
                    <td>10 Pavan</td>
                    <td>{totalAmount.toFixed(0) * 10}</td>
                  </tr>
                  <tr>
                    <td>100 Pavan</td>
                    <td>{totalAmount.toFixed(0) * 100}</td>
                  </tr>
                  <tr>
                    <td><mark>{quantity} Pavan</mark></td>
                    <td><mark>{totalAmount.toFixed(0) * quantity}</mark></td>
                  </tr>
                </tbody>
              </table>
            ) : null}
          </div>
        ) : null}
        {totalAmount ? (
          <div className="card-footer text-end text-muted price">
            <button
              type="button"
              className="btn btn-warning btn-floating"
              onClick={handleDownload}
            >
              <i className="fas fa-download"></i> 
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
