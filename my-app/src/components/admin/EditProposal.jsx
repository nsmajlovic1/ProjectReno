import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, useEffect } from "react";
import styled from "styled-components";
import { SecondaryButton, FourthButton } from './CommonStyled';
import { useNavigate } from "react-router-dom"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
export default function EditProposal({propId}) {
    const [projectname, setProjectName] = useState("")
    const [description, setDescription] = useState("")
    const [projectstartDate, setprojectStartDate] = useState(null);
    const [projectendDate, setProjectEndDate] = useState(null);
    const [uploadimg, setUploadImg] = useState("")
    const [dbImage, setDbImage] = useState("");
    const [projectnameError, setProjectNameError] = useState("")
    const [descriptionError, setDescriptionError] = useState("")
    const [projectstartDateError, setProjectStartDateError] = useState("");
    const [projectendDateError, setProjectEndDateError] = useState("");
    const navigate = useNavigate()
    
    const [milestones, setMilestones] = useState([]);
    const [milestoneNameErrors, setMilestoneNameErrors] = useState([]);
    const [milestoneStartDateErrors, setMilestoneStartDateErrors] = useState([]);
    const [milestoneEndDateErrors, setMilestoneEndDateErrors] = useState([]);
   /* 
    const [budgetname, setBudgetName] = useState("")
    const [budgetvalue, setBudgetValue] = useState("")
    const [budgetNameError, setBudgetNameError] = useState("")
    const [budgetValueError, setBudgetValueError] = useState("")
    const [milestoneChoiceError, setMilestoneChoiceError] = useState("")
    const [milestoneId, setMilestoneId] = useState(null);
    const navigate = useNavigate()

*/
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`http://localhost:3080/get-proposal/${propId}`);
            const data = await response.json();
            setProjectName(data.proposal.name);
            setDescription(data.proposal.description)
            setprojectStartDate(new Date(data.proposal.startDate));
            setProjectEndDate(new Date(data.proposal.endDate));
            setDbImage(data.proposal.imageUrl);
            
            const milestonesResponse = await fetch(`http://localhost:3080/get-milestones/${propId}`);
            const milestonesData = await milestonesResponse.json();
            setMilestones(milestonesData.milestones);
            
            /*
            const budgetsResponse = await fetch(`http://localhost:3080/get-budgets/${milestoneId}`);
            const budgetsData = await budgetsResponse.json();
            setBudgets(budgetsData.budgets);*/
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
      
        fetchData();
      }, [propId]);

    
    const handleMilestoneNameChange = (event, index) => {
        const newMilestones = [...milestones];
        newMilestones[index].name = event.target.value;
        setMilestones(newMilestones);
    };
    
    const handleMilestoneStartDateChange = (date, index) => {
        const newMilestones = [...milestones];
        newMilestones[index].startDate = date;
        setMilestones(newMilestones);
    };
    
    const handleMilestoneEndDateChange = (date, index) => {
        const newMilestones = [...milestones];
        newMilestones[index].endDate = date;
        setMilestones(newMilestones);
    };
    

    const onButtonClick = async (event) => {
        // Prevent the default form submission behavior
        event.preventDefault(); 

        // Set initial error values to empty
        setProjectNameError("")
        setDescriptionError("")
        setProjectStartDateError("")
        setProjectEndDateError("")
        setMilestoneNameErrors(Array(milestones.length).fill(""));
        setMilestoneStartDateErrors(Array(milestones.length).fill(""));
        setMilestoneEndDateErrors(Array(milestones.length).fill(""));
        
        // Check if the user has entered both fields correctly
        if ("" === projectname) {
            setProjectNameError("Please enter a Project name")
            return
        }
        else if ("" === description) {
            setDescriptionError("Please enter a Descrption")
            return
        }
        else if (!projectstartDate) {
            setProjectStartDateError("Please select start date");
            return;
        } 
        else if (!projectendDate) {
            setProjectEndDateError("Please select end date");
            return;
        } 
        else if (projectstartDate && projectendDate && projectstartDate > projectendDate) {
            setProjectStartDateError("Start date cannot be after end date");
            return;
        }

        for (let i = 0; i < milestones.length; i++) {
            const milestone = milestones[i];
            const formattedStartDate = milestone.startDate ? format(new Date(milestone.startDate), "yyyy-MM-dd") : null;
            const formattedEndDate = milestone.endDate ? format(new Date(milestone.endDate), "yyyy-MM-dd") : null;
            if ("" === milestone.name) {
                setMilestoneNameErrors((prevErrors) => {
                    const newErrors = [...prevErrors];
                    newErrors[i] = `Please enter a Milestone ${i + 1} name`;
                    return newErrors;
                });
                return;
            }
            if (!/^[\w-]{1,15}$/.test(milestone.name)) {
                setMilestoneNameErrors((prevErrors) => {
                    const newErrors = [...prevErrors];
                    newErrors[i] = `Milestone ${i + 1} name has more than 15 characters`;
                    return newErrors;
                });
                return;
            }
            if (!formattedStartDate) {
                setMilestoneStartDateErrors((prevErrors) => {
                    const newErrors = [...prevErrors];
                    newErrors[i] = `Please select Milestone ${i + 1} start date`;
                    return newErrors;
                });
                return;
            }
            if (!formattedEndDate) {
                setMilestoneEndDateErrors((prevErrors) => {
                    const newErrors = [...prevErrors];
                    newErrors[i] = `Please select Milestone ${i + 1} end date`;
                    return newErrors;
                });
                return;
            }
            if (formattedStartDate > formattedEndDate) {
                setMilestoneStartDateErrors((prevErrors) => {
                    const newErrors = [...prevErrors];
                    newErrors[i] = `Milestone ${i + 1} start date cannot be after end date`;
                    return newErrors;
                });
                return;
            }else{
            setMilestoneStartDateErrors((prevErrors) => {
                const newErrors = [...prevErrors];
                newErrors[i] = "";
                return newErrors;
            });
        }
        }

        
        
        try {
            const response = await fetch(`http://localhost:3080/edit-proposal/${propId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: projectname,
                    description: description,
                    startDate: projectstartDate,
                    endDate: projectendDate,
                    imageUrl: uploadimg,
                    milestones: milestones.map((milestone) => ({
                        id: milestone.id, 
                        name: milestone.name,
                        budget: milestone.budget, 
                        startDate: milestone.startDate,
                        endDate: milestone.endDate
                    })),
                }),
            });
    
            const data = await response.json();
            console.log('Proposal edited:', data);
            console.log(propId)
            navigate('/admin/proposals');
        } catch (error) {
            console.error('Error editing proposal:', error);
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
            }
        }
        else{
            setUploadImg("");
        }
    }
  
  
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (event) => {
    event.preventDefault(); 
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <SecondaryButton onClick={handleClickOpen}>
        Finish
      </SecondaryButton>
      <Dialog open={open} onClose={handleClose} fullWidth = {true} maxWidth = {"md"}>
        <DialogTitle>Edit Proposal</DialogTitle>
        <DialogContent>
        <StyledEditProposal>
            <StyledForm>
                <h3>Create a Proposal</h3>
                <input 
                    type = "text" 
                    placeholder = "Project Name"
                    value={projectname}
                    onChange={ev => setProjectName(ev.target.value)}>    
                </input>
                <label className="errorLabel">{projectnameError}</label>
                <input 
                    type = "text" 
                    placeholder = "Description"
                    value={description}
                    onChange={ev => setDescription(ev.target.value)}>    
                </input>
                <label className="errorLabel">{descriptionError}</label>
                <DatePickerWrapper>
                    <DatePicker
                        selected={projectstartDate}
                        onChange={(date) => setprojectStartDate(date)}
                        selectsStart
                        startDate={projectstartDate}
                        endDate={projectendDate}
                        placeholderText="Start Date"
                    />
                    <label className="errorLabel">{projectstartDateError}</label>
                    <DatePicker
                        selected={projectendDate}
                        onChange={(date) => setProjectEndDate(date)}
                        selectsEnd
                        startDate={projectstartDate}
                        endDate={projectendDate}
                        placeholderText="End Date"
                    />
                    <label className="errorLabel">{projectendDateError}</label>
                </DatePickerWrapper>
                
                <input 
                    type = "file" 
                    accept="image/" 
                    onChange={handleImageUpload}>
                </input>

                {milestones.map((milestone, index) => (
                    <div key={index}>
                        <h3>Milestone {index + 1}</h3>
                        <input
                            type="text"
                            placeholder={`Milestone ${index + 1} Name`}
                            value={milestone.name}
                            onChange={(ev) => handleMilestoneNameChange(ev, index)}
                        />
                        <label className="errorLabel">{milestoneNameErrors[index]}</label>
                        <DatePickerWrapper>
                            <DatePicker
                                selected={milestone.startDate ? new Date(milestone.startDate) : null}
                                onChange={(date) => handleMilestoneStartDateChange(date, index)}
                                selectsStart
                                startDate={milestone.startDate ? new Date(milestone.startDate) : null}
                                endDate={milestone.endDate ? new Date(milestone.endDate) : null}
                                placeholderText={`Milestone ${index + 1} Start Date`}
                            />
                            <label className="errorLabel">{milestoneStartDateErrors[index]}</label>
                            <DatePicker
                                selected={milestone.endDate ? new Date(milestone.endDate) : null}
                                onChange={(date) => handleMilestoneEndDateChange(date, index)}
                                selectsEnd
                                startDate={milestone.startDate ? new Date(milestone.startDate) : null}
                                endDate={milestone.endDate ? new Date(milestone.endDate) : null}
                                placeholderText={`Milestone ${index + 1} End Date`}
                            />
                            <label className="errorLabel">{milestoneEndDateErrors[index]}</label>
                        </DatePickerWrapper>
                    </div>
                ))}

                <FourthButton onClick={onButtonClick}>Submit</FourthButton>
            </StyledForm>
            <ImagePreview>
                {uploadimg || dbImage ? (
                <>
                <img src={uploadimg || dbImage} alt="upload"></img>
                </> 
                ) : (
                <p>Image preview</p>
                )}
            </ImagePreview>
        </StyledEditProposal>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}


const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 230px;
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
  > div {
    h3 {
      margin-bottom: 0.5rem;
      margin-top: 2rem
    }
  }
  .errorLabel {
        color: red;
        font-size: 12px;
    }
`;

const StyledEditProposal = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ImagePreview = styled.div`
  margin: 2rem 0.5rem 2rem 2rem;
  padding: 2rem;
  border: 1px solid rgb(183, 183, 183);
  max-width: 300px;
  max-height: 300px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(78, 78, 78);

  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

const DatePickerWrapper = styled.div`
  
  justify-content: space-between;
  margin: 10px 0;
  width: 70%;
`;
