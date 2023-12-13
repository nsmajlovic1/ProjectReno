import{Outlet, useNavigate} from "react-router-dom"
import { useState, useEffect } from 'react';
import { AdminHeaders, PrimaryButton } from "./CommonStyled";
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import styled from 'styled-components';


export default function Proposals() {
  const navigate = useNavigate()
  const [proposals, setProposals] = useState([]);
  
  
  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const response = await fetch('http://localhost:3080/get-proposals');
        const data = await response.json();
        setProposals(data.proposals);
      } catch (error) {
        console.error('Error fetching proposals:', error);
      }
    };

    fetchProposals();
  }, []);


  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3080/delete-proposal/${id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error deleting proposal:', errorData.error);
        return;
      }
  
      const updatedProposals = proposals.filter((proposal) => proposal.id !== id);
      setProposals(updatedProposals);
    } catch (error) {
      console.error('Error deleting proposal:', error);
      
    }
  };
  
  
  
  
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'description', headerName: 'Description', width: 200 },
    { field: 'startDate', headerName: 'StartDate', width: 130 },
    { field: 'endDate', headerName: 'EndDate', width: 130 },
    { field: 'milestoneCount', headerName: 'Milestones', width: 150},
    { field: 'status', headerName: 'Status', width: 120},
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 170,
      renderCell: (params) =>{
          return(
             <Actions>
              <Delete onClick={() => handleDelete(params.row.id)}>Delete</Delete>
              <View>View</View>
             </Actions>
          )
      }
    },
  ];


  return (<>
  <AdminHeaders>
    <h2>Proposals</h2>
    <PrimaryButton onClick={() => navigate("/admin/create-proposal")}>
        Create
    </PrimaryButton>
    </AdminHeaders>
    <Outlet/> 
    <br></br>
    <br></br>
    <br></br>

    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={proposals}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
    </>
  );
}

const Actions = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    button{
        border: none;
        outline: none;
        padding: 3px 5px;
        color: white;
        border-radius: 3px;
        cursor: pointer;
    }
`
const Delete = styled.button`
    background-color: rgb(255,77,73);
`

const View = styled.button`
    background-color: rgb(114,225,40);
`



    
 
