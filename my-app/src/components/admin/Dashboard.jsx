import { NavLink, Outlet } from "react-router-dom";
import styled from "styled-components";
import {FaClipboard, FaTachometerAlt,FaDollarSign} from 'react-icons/fa';
const Dashboard = () => {
    return (
    <StyledDashboard>
        <SideNav>
            <h3>Quick Links</h3>
            <NavLink className={({isActive}) => isActive ? "link-active" : "link-inactive" } 
            to="/admin/overview">
                
                <FaTachometerAlt/> Overview
            
            </NavLink>
            <NavLink className={({isActive}) => isActive ? "link-active" : "link-inactive" }
            to="/admin/proposals">
            
                <FaClipboard/> Proposals
            
            </NavLink>
            <NavLink className={({isActive}) => isActive ? "link-active" : "link-inactive" }
            to="/admin/commission-settings">
            
                <FaDollarSign/>Commission Settings
            
            </NavLink>
        </SideNav>
        <Content>
            <Outlet/>
        </Content>
    </StyledDashboard>
    );
}
 
export default Dashboard;

const StyledDashboard = styled.div`
    display: flex;
    height: 100vh;
`

const SideNav = styled.div`
    //border-right: 1.5px solid gray;
    //border-top: 1.5px solid gray;
    display: flex;
    height: calc(100vh - 70px);
    position: fixed;
    overflow-y: auto;
    width: 200px;
    flex-direction: column;
    padding: 2rem;
    background-color: #eff0f2;

    h3{
        margin: 0 0 1.3rem 0;
        padding: 0;
        text-transform: uppercase;
        font-size: 19px;
    }

    a{
        text-decoration: none;
        margin-bottom: 1.3rem;
        font-size: 15px;
        opacity: 2;
        display: flex;
        align-items: center;
        font-weight: 700;

        svg{
            margin-right: 0.5rem;
            font-size: 18px;
        }
    }
`

const Content = styled.div`
    margin-left: 200px;
    padding: 2rem 3rem;
    width: 100%;
`
