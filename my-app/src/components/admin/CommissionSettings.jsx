// CommissionSettings.js

import { useState } from 'react';
import styled from 'styled-components';

const CommissionSettings = ({ onSubmit }) => {
  const [commissionValues, setCommissionValues] = useState({
    downPayment: 0,
    delayWithheld: 0,
    warrantyWithheld: 0,
    renoHomeownerCommission: 0,
    renoContractorCommission: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCommissionValues({ ...commissionValues, [name]: parseFloat(value) });
  };

  const handleSubmit = () => {
    // Dodaj validaciju vrednosti pre slanja na server
    onSubmit(commissionValues);
  };

  return (
    <CommissionSettingsContainer>
      <h2>Commission Settings</h2>
      <CommissionInput>
        <label>Down Payment (%)</label>
        <input type="number" name="downPayment" value={commissionValues.downPayment} onChange={handleInputChange} />
      </CommissionInput>
      <CommissionInput>
        <label>Delay Withheld (%)</label>
        <input type="number" name="delayWithheld" value={commissionValues.delayWithheld} onChange={handleInputChange} />
      </CommissionInput>
      <CommissionInput>
        <label>Warranty Withheld (%)</label>
        <input type="number" name="warrantyWithheld" value={commissionValues.warrantyWithheld} onChange={handleInputChange} />
      </CommissionInput>
      <CommissionInput>
        <label>Reno Homeowner Commission (%)</label>
        <input type="number" name="renoHomeownerCommission" value={commissionValues.renoHomeownerCommission} onChange={handleInputChange} />
      </CommissionInput>
      <CommissionInput>
        <label>Reno Contractor Commission (%)</label>
        <input type="number" name="renoContractorCommission" value={commissionValues.renoContractorCommission} onChange={handleInputChange} />
      </CommissionInput>
      <Button onClick={handleSubmit}>Save</Button>
    </CommissionSettingsContainer>
  );
};

export default CommissionSettings;

const CommissionSettingsContainer = styled.div`
  max-width: 400px;
  margin: 2rem auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;

const CommissionInput = styled.div`
  margin-bottom: 1rem;

  label {
    display: block;
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  input {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
  }
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #4b70e2;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;


