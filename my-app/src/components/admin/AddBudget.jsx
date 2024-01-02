import styled from "styled-components";
import { useState, useEffect } from "react";
import { ThirdButton, FourthButton  } from "./CommonStyled";
import { useNavigate, useParams } from "react-router-dom"
import EditProposal from "./EditProposal";

const AddBudget = () => {
    const [budgetname, setBudgetName] = useState("")
    const [budgetvalue, setBudgetValue] = useState("")
    const [budgetNameError, setBudgetNameError] = useState("")
    const [budgetValueError, setBudgetValueError] = useState("")
    const [milestoneError, setMilestoneError] = useState("")
    const [milestoneId, setMilestoneId] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate()

    const { proposalId } = useParams();

    const resetForm = () => {
        setBudgetName("");
        setBudgetValue("");
        setBudgetNameError("");
        setBudgetValueError("");
        setMilestoneId(null);
    };

    const onButtonClick1 = async (event) => {
        // Prevent the default form submission behavior
         
        
        // Set initial error values to empty
        setBudgetNameError("")
        setBudgetValueError("")
        setMilestoneError("");
        setSuccessMessage("");
 
        // Check if the user has entered both fields correctly
        if ("" === budgetname) {
            setBudgetNameError("Please enter a Budget name")
            event.preventDefault();
            return
        }
        if (!/^[\w-]{1,15}$/.test(budgetname)) {
            setBudgetNameError("Name has more than 15 characters")
            event.preventDefault();
            return
        }
        else if ("" === budgetvalue) {
            setBudgetValueError("Please enter a Budget value")
            event.preventDefault();
            return
        }
        else if (budgetvalue>1000000) {
            setBudgetValueError("Budget must be less than 1,000,000.00")
            event.preventDefault();
            return
        }
        else if (!milestoneId) {
            setMilestoneError("Please choose a milestone");
            event.preventDefault();
            return
        } 
        else {
            try {
                const response = await fetch('http://localhost:3080/create-budget', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: budgetname,
                        value: budgetvalue,
                        milestoneId
                    }),
                });
        
                const data = await response.json();
                console.log('Budget created:', data);
                setSuccessMessage("Budget successfully added!");
                resetForm()
                // Navigate to the proposals page
            } catch (error) {
                console.error('Error creating budget:', error);
                setSuccessMessage("");
            }
        }
    }
    const onButtonClick2 = (event) => {
        event.preventDefault();
        navigate(`/admin/create-milestone/${proposalId}`)
        
    }
    
    const onMilestoneChange = (milestoneId) => {
        setMilestoneId(milestoneId);
    }

    const MilestoneDropdown = ({ onMilestoneChange }) => {
        const [milestones, setMilestones] = useState([]);
    
        useEffect(() => {
            // Fetch available milestones for that proposal
            const fetchMilestones = async () => {
                try {
                    const response = await fetch(`http://localhost:3080/get-milestones/${proposalId}`);
                    const data = await response.json();
                    setMilestones(data.milestones);
                } catch (error) {
                    console.error('Error fetching milestones:', error);
                }
            };
    
            fetchMilestones();
        }, []);
    
        return (
            <StyledDropdown onChange={(e) => onMilestoneChange(e.target.value)}>
                <option value="">Choose Milestone</option>
                {Array.isArray(milestones) && milestones.map((milestone) => (
                    <option key={milestone.id} value={milestone.id}>
                        {milestone.name}
                    </option>
                ))}
            </StyledDropdown>
        );
    };

    return ( 
    <StyledAddBudget>
        <StyledForm>
            <h3>Budget</h3>
            <input 
                type = "text" 
                placeholder = "Budget Name"
                onChange={ev => setBudgetName(ev.target.value)}>    
            </input>
            <label className="errorLabel">{budgetNameError}</label>
            <input 
                type = "text" 
                placeholder = "Budget Value"
                onChange={ev => setBudgetValue(ev.target.value)}>    
            </input>
            <label className="errorLabel">{budgetValueError}</label>

            <MilestoneDropdown onMilestoneChange={onMilestoneChange} />
            <label className="errorLabel">{milestoneError}</label>
            <FourthButton onClick={onButtonClick1}>+ Add Budget</FourthButton>
            <label className="successLabel">{successMessage}</label>
            <ThirdButton onClick={onButtonClick2}>Previous step</ThirdButton>
            <EditProposal propId = {proposalId}></EditProposal>
        </StyledForm>
    </StyledAddBudget> 
    );
}
 
export default AddBudget;

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
    width: 400px;

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

const StyledAddBudget = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledDropdown = styled.select`
    padding: 10px;
    min-height: 30px;
    outline: none;
    border-radius: 5px;
    border: 1px solid rgb(182, 182, 182);
    margin: 0.35rem 0;
    width: 200px;

    &:focus {
        border: 2px solid rgb(0, 208, 255);
    }
`;
