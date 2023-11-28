import styled from "styled-components";
import { useState } from "react";
import { PrimaryButton } from "./CommonStyled";
const CreateProposal = () => {
    const [projectname, setProjectName] = useState("")
    const [description, setDescription] = useState("")
    return ( <StyledCreateProposal>
        <StyledForm>
            <h3>Create a Proposal</h3>
            <input 
                type = "text" 
                placeholder = "Project Name"
                onChange={ev => setProjectName(ev.target.value)}>    
            </input>
            <input 
                type = "text" 
                placeholder = "Description"
                onChange={ev => setDescription(ev.target.value)}>    
            </input>
            <input type = "file" accept=".docx, .pdf"></input>
            <PrimaryButton>Continue</PrimaryButton>
        </StyledForm>
    </StyledCreateProposal> );
}
 
export default CreateProposal;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin-top: 2rem;

  input {
    padding: 7px;
    min-height: 30px;
    outline: none;
    border-radius: 5px;
    border: 1px solid rgb(182, 182, 182);
    margin: 0.3rem 0;

    &:focus {
      border: 2px solid rgb(0, 208, 255);
    }
  }

  
`;

const StyledCreateProposal = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ImagePreview = styled.div`
  margin: 2rem 0 2rem 2rem;
  padding: 2rem;
  border: 1px solid rgb(183, 183, 183);
  max-width: 300px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: rgb(78, 78, 78);

  img {
    max-width: 100%;
  }
`;