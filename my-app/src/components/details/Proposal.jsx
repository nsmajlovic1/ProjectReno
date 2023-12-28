import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const Proposal = () => {
    const { id } = useParams();
    const [proposal, setProposal] = useState([])
    const [userRole, setUserRole] = useState('');
    const navigate = useNavigate()
    
    useEffect(() => {
        const fetchProposals = async () => {
          try {
            const response = await fetch(`http://localhost:3080/get-proposal/${id}`);
            const data = await response.json();
            setProposal(data.proposal);
            setUserRole(JSON.parse(localStorage.getItem("user"))?.role)
          } catch (error) {
            console.error('Error fetching proposals:', error);
          }
        };
    
        fetchProposals();
      }, [userRole,id]);

     

      const handleApprove = async () => {
        try {
            await fetch(`http://localhost:3080/approve-proposal/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Refresh the new proposal
            const response = await fetch(`http://localhost:3080/get-proposal/${id}`);
            const data = await response.json();
            setProposal(data.proposal);
            navigate('/admin/proposals');
        } catch (error) {
            console.error('Error approving proposal:', error);
        }
    };


    const handleReject = async () => {
        try {
            await fetch(`http://localhost:3080/reject-proposal/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Refresh the new proposal
            const response = await fetch(`http://localhost:3080/get-proposal/${id}`);
            const data = await response.json();
            setProposal(data.proposal);
            navigate('/admin/proposals');
        } catch (error) {
            console.error('Error rejecting proposal:', error);
        }
    };

    function calculateCommissionAmount(proposal) {
        const commissionAmount = (proposal.totalProposalValue * proposal.renoHomeownerCommissionPercentage) / 100;
        return commissionAmount
      }
      
    function calculateNetPayment(proposal) {
        const netPayment = proposal.totalProposalValue - calculateCommissionAmount(proposal);
        return netPayment 
    }

    return ( 
    <StyledProposal>
        <ProposalContainer>
            <ProposalDetails>
                <h3>{proposal.name}</h3>
                <p><span>Description: </span>{proposal.description}</p>
                <p><span>Start Date: </span>{proposal.startDate}</p>
                <p><span>End Date: </span>{proposal.endDate}</p>
                <p><span>Number of Milestones: </span>{proposal.milestoneCount}</p>
                <Value>Total Proposal Value: {new Intl.NumberFormat('en-AE', { style: 'currency', currency: 'AED' }).format(proposal.totalProposalValue)}</Value>
                <Value>Commission Amount: {new Intl.NumberFormat('en-AE', { style: 'currency', currency: 'AED' }).format(calculateCommissionAmount(proposal))}</Value>
                <Value>Net Payment to Creator: {new Intl.NumberFormat('en-AE', { style: 'currency', currency: 'AED' }).format(calculateNetPayment(proposal))}</Value>                
                { userRole === 'superadmin' && proposal.status === 'pending' ? (
                    <>
                        <RejectButton onClick={handleReject}>
                            Reject
                        </RejectButton>
                        <ApproveButton onClick={handleApprove}>
                            Approve
                        </ApproveButton>
                    </>
                ) : null}
                    
                  
            </ProposalDetails>
        </ProposalContainer>
    </StyledProposal> );
}
 
export default Proposal;

const StyledProposal = styled.div`
  display: flex;
  justify-content: center;
  margin: 3rem;
`;

const ProposalDetails = styled.div`
  flex: 2;
  margin-left: 2rem;
  h3{
    font-size: 35px;
    margin: 0.5rem 0;
  }

  p span{
    font-weight: bold;
  }

`;

const Value = styled.div`
  margin: 1rem 0;
  font-weight: bold;
  font-size: 20px;
`;

const ProposalContainer = styled.div`
  max-width: 500px;
  width: 100%;
  height: auto;
  display: flex;
  padding: 2rem;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 5px;
`;
/*
const ImageContainer = styled.div`
  flex: 1;
  img {
    width: 100%;
  }
`;
*/
const RejectButton = styled.button`
  padding: 9px 12px;
  border-radius: 5px;
  font-weight: 400;
  letter-spacing: 1.15px;
  background-color: lightgray;
  color: black;
  border: none;
  outline: none;
  cursor: pointer;
  margin: 1.5rem 0rem;
  width: 160px;
`;

const ApproveButton = styled.button`
  padding: 9px 12px;
  border-radius: 5px;
  font-weight: 400;
  letter-spacing: 1.15px;
  background-color: #4b70e2;
  color: #f9f9f9;
  border: none;
  outline: none;
  cursor: pointer;
  margin: 1.5rem -8rem;
  width: 160px;
  position: absolute;
  left: 60%;
`;