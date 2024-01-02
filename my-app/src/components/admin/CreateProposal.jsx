import styled from "styled-components";
import { useState } from "react";
import { FourthButton } from "./CommonStyled";
import { useNavigate } from "react-router-dom"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateProposal = () => {
    const [projectname, setProjectName] = useState("")
    const [description, setDescription] = useState("")
    const [uploadimg, setUploadImg] = useState("")
    const [projectnameError, setProjectnameError] = useState("")
    const [descriptionError, setDescriptionError] = useState("")
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [startDateError, setStartDateError] = useState("");
    const [endDateError, setEndDateError] = useState("");
    const navigate = useNavigate()

    const onButtonClick = async (event) => {
        // Prevent the default form submission behavior
        event.preventDefault(); 

        // Set initial error values to empty
        setProjectnameError("")
        setDescriptionError("")
        setStartDateError("")
        setEndDateError("")
 
        // Check if the user has entered both fields correctly
        if ("" === projectname) {
            setProjectnameError("Please enter a Project name")
            return
        }
        else if ("" === description) {
            setDescriptionError("Please enter a Descrption")
            return
        }
        else if (!startDate) {
            setStartDateError("Please select start date");
            return;
        } 
        else if (!endDate) {
            setEndDateError("Please select end date");
            return;
        } 
        if (startDate && endDate && startDate > endDate) {
            setStartDateError("Start date cannot be after end date");
            return;
        }
        else{
            try {
                const response = await fetch('http://localhost:3080/create-proposal', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: projectname,
                        description: description,
                        startDate: startDate,
                        endDate: endDate,
                        imageUrl: uploadimg,
                    }),
                });
        
                const data = await response.json();
                console.log('Proposal created:', data);
        
                // Navigate to the milestones page
                navigate(`/admin/create-milestone/${data.proposal.id}`);
            } catch (error) {
                console.error('Error creating proposal:', error);
            }
        
        }
    }

    const handleImageUpload = (e) =>{
        const file = e.target.files[0];
        TransformFile(file);
    }

    const TransformFile = (file) =>{
        const reader = new FileReader()

        if(file){
            reader.readAsDataURL(file)
            reader.onloadend = () =>{
                setUploadImg(reader.result);
                console.log('Image URL:', reader.result);
            }
        }
        else{
            setUploadImg("");
        }
    }



    return ( 
    <StyledCreateProposal>
        <StyledForm>
            <h3>Create a Proposal</h3>
            <input 
                type = "text" 
                placeholder = "Project Name"
                onChange={ev => setProjectName(ev.target.value)}>    
            </input>
            <label className="errorLabel">{projectnameError}</label>
            <input 
                type = "text" 
                placeholder = "Description"
                onChange={ev => setDescription(ev.target.value)}>    
            </input>
            <label className="errorLabel">{descriptionError}</label>
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
            
            <input 
                type = "file" 
                accept="image/" 
                onChange={handleImageUpload}>
            </input>
            <FourthButton onClick={onButtonClick}>Continue</FourthButton>
        </StyledForm>
        <ImagePreview>
            {uploadimg ? (
            <>
            <img src={uploadimg} alt="upload"></img>
            </> 
           ) : (
           <p>Image preview</p>
        )}
        </ImagePreview>
    </StyledCreateProposal> 
    );
}
 
export default CreateProposal;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin-top: 1.5rem;
  margin-left: 26rem;

  input {
    padding: 7px;
    min-height: 30px;
    outline: none;
    border-radius: 5px;
    border: 1px solid rgb(182, 182, 182);
    margin: 0.35rem 0;

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

  
`;

const StyledCreateProposal = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ImagePreview = styled.div`
  margin: 2rem 0.5rem 2rem 2rem;
  padding: 2rem;
  border: 1px solid rgb(183, 183, 183);
  max-width: 300px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(78, 78, 78);

  img {
    max-width: 100%;
  }
`;

const DatePickerWrapper = styled.div`
  
  justify-content: space-between;
  margin: 10px 0;
  width: 70%;
`;