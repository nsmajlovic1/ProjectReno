import{Outlet, useNavigate} from "react-router-dom"
import { useState, useEffect } from 'react';
import { AdminHeaders, PrimaryButton } from "./CommonStyled";
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import styled from 'styled-components';


export default function Proposals() {
  const navigate = useNavigate()
  const [proposals, setProposals] = useState([]);
  const [nextProposalId, setNextProposalId] = useState(0);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const response = await fetch('http://localhost:3080/get-proposals');
        const data = await response.json();
        setProposals(data.proposals);
        setNextProposalId(data.proposals.length + 1);
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
  

  const generateReport = async () => {
    try {
      setLoading(true);

      const response = await fetch('http://localhost:3080/generate-report');
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'proposals_report.xlsx';
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        console.error('Error generating report:', response.statusText);
      }
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setLoading(false);
    }
  };

  
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 120 },
    { field: 'description', headerName: 'Description', width: 180 },
    { field: 'startDate', headerName: 'StartDate', width: 130 },
    { field: 'endDate', headerName: 'EndDate', width: 130 },
    { field: 'milestoneCount', headerName: 'Milestones', width: 130},
    { field: 'totalProposalValue', headerName: 'Total Proposal Value', width: 160},
    { field: 'status', headerName: 'Status', width: 110},
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 150,
      renderCell: (params) =>{
          return(
             <Actions>
              <Delete onClick={() => handleDelete(params.row.id)}>Delete</Delete>
              <View onClick={() => navigate(`/proposal/${params.row.id}`)}>View</View>
             </Actions>
          )
      }
    },
  ];


  return (<>
    <AdminHeaders>
      <h2>Proposals</h2>
      <PrimaryButton onClick={() => navigate(`/admin/create-proposal/${nextProposalId}`)}>
          Create
      </PrimaryButton>
    </AdminHeaders>
    <Outlet/> 
    <br></br>
    <br></br>
    <br></br>

    <div style={{height: 400, width: '100%'}}>
      <DataGrid
        rows={proposals}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        
      />
    </div>

    <div>
      <GenerateButton onClick={generateReport} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Report'}
      </GenerateButton>
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

const GenerateButton = styled.button`
  padding: 9px 12px;
  border-radius: 5px;
  font-weight: 400;
  letter-spacing: 1.15px;
  background-color: #4b70e2;
  color: #f9f9f9;
  border: none;
  outline: none;
  cursor: pointer;
  position: absolute;
  right: 6.7%;
  top:85%;
`;