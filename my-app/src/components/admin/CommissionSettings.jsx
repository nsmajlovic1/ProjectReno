import { useState } from 'react';
import styled from 'styled-components';

const CommissionSettings = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [commissionValues, setCommissionValues] = useState({
    downPaymentPercentage: 0,
    delayWithheldPercentage: 0,
    warrantyWithheldPercentage: 0,
    renoHomeownerCommissionPercentage: 0,
    renoContractorCommissionPercentage: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCommissionValues({ ...commissionValues, [name]: parseFloat(value) });
  };

  const handleSubmit = async () => {
    setSuccessMessage("");
    const isValid = Object.values(commissionValues).every(value => !isNaN(value) && value >= 0 && value <= 100);
    console.log('Submitting Commission Values:', commissionValues);
    if (isValid) {
        try {
            const response = await fetch('http://localhost:3080/set-commission-values', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(commissionValues),
            });

            
            const data = await response.json();
            console.log('Response from Server:', data);
            setSuccessMessage("Commission values successfully added!");
            } catch (error) {
            console.error('Error updating commission values:', error);
        }
    } else {
        alert('Invalid input. Please enter valid percentages between 0 and 100.');
    }
  };

  return (
    <CommissionSettingsContainer>
      <h2>Commission Settings</h2>
      <CommissionInput>
        <label>Down Payment (%)</label>
        <input type="number" name="downPaymentPercentage" value={commissionValues.downPaymentPercentage} onChange={handleInputChange} />
      </CommissionInput>
      <CommissionInput>
        <label>Delay Withheld (%)</label>
        <input type="number" name="delayWithheldPercentage" value={commissionValues.delayWithheldPercentage} onChange={handleInputChange} />
      </CommissionInput>
      <CommissionInput>
        <label>Warranty Withheld (%)</label>
        <input type="number" name="warrantyWithheldPercentage" value={commissionValues.warrantyWithheldPercentage} onChange={handleInputChange} />
      </CommissionInput>
      <CommissionInput>
        <label>Reno Homeowner Commission (%)</label>
        <input type="number" name="renoHomeownerCommissionPercentage" value={commissionValues.renoHomeownerCommissionPercentage} onChange={handleInputChange} />
      </CommissionInput>
      <CommissionInput>
        <label>Reno Contractor Commission (%)</label>
        <input type="number" name="renoContractorCommissionPercentage" value={commissionValues.renoContractorCommissionPercentage} onChange={handleInputChange} />
      </CommissionInput>
      <Button onClick={handleSubmit}>Submit</Button>
      <label className="successLabel">{successMessage}</label>
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
  .successLabel {
        color: #04b604;
        font-size: 12px;
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


