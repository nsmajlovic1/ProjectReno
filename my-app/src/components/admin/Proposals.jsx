import{Outlet, useNavigate} from "react-router-dom"
import { AdminHeaders, PrimaryButton } from "./CommonStyled";

const Proposals = () => {
    
    const navigate = useNavigate()

    return ( 
    <>
    <AdminHeaders>
    <PrimaryButton onClick={() => navigate("/admin/create-proposal")}>
        Create
    </PrimaryButton>
    </AdminHeaders>
    <Outlet/> 
    </>
    );
}
 
export default Proposals;