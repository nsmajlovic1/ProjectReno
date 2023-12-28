import styled from "styled-components";
import { useState } from "react";
import { SecondaryButton, ThirdButton, FourthButton } from "./CommonStyled";
import { useNavigate, useParams } from "react-router-dom"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateMilestone = () => {
    const [milestonename, setMilestoneName] = useState("")
    const [milestoneNameError, setMilestoneNameError] = useState("")
    const [milestoneError, setMilestoneError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [startDateError, setStartDateError] = useState("");
    const [endDateError, setEndDateError] = useState("");
    const navigate = useNavigate()
    
    

    const { proposalId } = useParams();

    const onButtonClick1 = async (event) => {
        // Prevent the default form submission behavior
        event.preventDefault(); 
        
        // Set initial error values to empty
        setMilestoneNameError("")
        setStartDateError("")
        setEndDateError("")
 
        // Check if the user has entered both fields correctly
        if ("" === milestonename) {
            setMilestoneNameError("Please enter a Milestone name")
            return
        }
        if (!/^[\w-]{1,15}$/.test(milestonename)) {
            setMilestoneNameError("Name has more than 15 characters")
            return
        }
        else if (!startDate) {
            setStartDateError("Please select start date");
            return;
        } 
        if (!endDate) {
            setEndDateError("Please select end date");
            return;
        } 
        if (startDate && endDate && startDate > endDate) {
            setStartDateError("Start date cannot be after end date");
            return;
        }
        
        else{
            try {
                const response = await fetch('http://localhost:3080/create-milestone', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: milestonename,
                        startDate: startDate,
                        endDate: endDate,
                        ProposalId: proposalId,
                        
                    }),
                });
                

                if (!response.ok) {
                    setSuccessMessage("");
                    const errorData = await response.json();
                    setMilestoneError(errorData.error); 
                    return;
                }else{
                
                const data = await response.json();
                console.log('Milestone created:', data);
                
                setSuccessMessage("Milestone successfully added!");
                }
            } catch (error) {
                console.error('Error creating proposal:', error);
            }

            
        }
    }

    
    const onButtonClick2 = (event) => {
        event.preventDefault();
        navigate(`/admin/create-proposal/${proposalId}`)
        
    }

    const onButtonClick3 = (event) => {
        event.preventDefault();
        navigate(`/admin/add-budget/${proposalId}`);
    }


    return ( 
        <StyledForm>
            <h3>Milestone</h3>
            <input 
                type = "text" 
                placeholder = "Milestone Name"
                onChange={ev => setMilestoneName(ev.target.value)}>    
            </input>
            <label className="errorLabel">{milestoneNameError}</label>
            <DatePickerWrapper>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="Start Date"
                />
                <label className="errorLabel">{startDateError}</label>
                <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="End Date"
                />
                <label className="errorLabel">{endDateError}</label>
            </DatePickerWrapper>
            <FourthButton onClick={onButtonClick1}>+ Add Milestone</FourthButton>
            <label className="errorLabel">{milestoneError}</label>
            <label className="successLabel">{successMessage}</label>
            <ThirdButton onClick={onButtonClick2}>Previous step</ThirdButton>
            <SecondaryButton onClick={onButtonClick3}>Continue</SecondaryButton>
        </StyledForm>
    
    );
}
 
export default CreateMilestone;

const StyledForm = styled.form`
  
  flex-direction: column;
  max-width: 230px;
  margin-top: 1.5rem;
  margin-left: 370px;
  padding: 10px;
  min-height: 30px;

  input {
    padding: 10px;
    min-height: 30px;
    outline: none;
    border-radius: 5px;
    border: 1px solid rgb(182, 182, 182);
    margin: 0.35rem 0;
    width: 300px;

    &:focus {
      border: 2px solid rgb(0, 208, 255);
    }
  }
  h3{
    margin-bottom: 0.5rem;
  }

  .errorLabel {
        color: red;
        font-size: 12px;
    }
    .successLabel {
        color: #04b604;
        font-size: 12px;
    }
`;

const DatePickerWrapper = styled.div`
  
  justify-content: space-between;
  margin: 10px 0;
  width: 70%;
`;