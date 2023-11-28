import{Outlet, useNavigate} from "react-router-dom"
import { AdminHeaders, PrimaryButton } from "./CommonStyled";

const Proposals = () => {
    
    const navigate = useNavigate()

    return ( 
    <>
    <AdminHeaders>
    CreateProposal
    <PrimaryButton onClick={() => navigate("/admin/proposals/create-proposal")}>
        Create
    </PrimaryButton>
    </AdminHeaders>
    <Outlet/> 
    </>
    );
}
 
export default Proposals;