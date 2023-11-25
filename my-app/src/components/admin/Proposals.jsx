import{Outlet, useNavigate} from "react-router-dom"

const Proposals = () => {
    
    const navigate = useNavigate()

    return ( 
    <>
    CreateProposal
    <button onClick={() => navigate("/admin/proposals/create-proposal")}>
        Create
    </button>
    <Outlet/></> );
}
 
export default Proposals;