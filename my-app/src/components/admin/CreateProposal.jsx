import styled from "styled-components";
import { useState } from "react";
import { SecondaryButton } from "./CommonStyled";
import { useNavigate } from "react-router-dom"

const CreateProposal = () => {
    const [projectname, setProjectName] = useState("")
    const [description, setDescription] = useState("")
    const [uploadimg, setUploadImg] = useState("")
    const [projectnameError, setProjectnameError] = useState("")
    const [descriptionError, setDescriptionError] = useState("")
    const navigate = useNavigate()

   /* const onButtonClick = () => {
        // Set initial error values to empty
        setProjectnameError("")
        setDescriptionError("")
 
        // Check if the user has entered both fields correctly
        if ("" === projectname) {
            setProjectnameError("Please enter a Project name")
            return
        }
        else if ("" === description) {
            setDescriptionError("Please enter a Descrption")
            return
        }
        else{
            navigate("/admin/create-milestone")
        }
    }*/

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
            <input 
                type = "file" 
                accept="image/" 
                onChange={handleImageUpload}>
            </input>
            <SecondaryButton onClick={() => navigate("/admin/create-milestone")}>Continue</SecondaryButton>
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