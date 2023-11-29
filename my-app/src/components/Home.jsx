import styled from "styled-components";

const Home = () => {
    return ( 
    <AdminHeaders>
        Welcome to RenoHome
    </AdminHeaders>
    
     );
}
 
export default Home;

export const AdminHeaders = styled.div`
    font-size: 3em;
    font-weight: bold;
    margin: 0;
    padding: 0;
    height: 70vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`;