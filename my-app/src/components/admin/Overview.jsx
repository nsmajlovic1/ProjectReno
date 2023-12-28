import { useState, useEffect } from 'react';
import {FaUsers, FaClipboard} from 'react-icons/fa';
import styled from 'styled-components';
import Widget from './Widget';
const Overview = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3080/stats');
                const data = await response.json();
                console.log('Fetched data:', data);
                
                setStats(data.stats || {});
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); 

    if (loading) {
        return <div>Loading...</div>;
    }
    const userCount = stats && stats.userCount ? stats.userCount : 0;
    const proposalCount = stats && stats.proposalCount ? stats.proposalCount : 0;
    const data = [
        {
            icon: <FaUsers/>,
            digits: userCount,
            title: "Users",
            color: "rgb(102,108,255)",
            bgColor: "rgba(102,108,255,0.12)"
        },

        {
            icon: <FaClipboard/>,
            digits: proposalCount,
            title: "Proposals",
            color: "rgb(38,198,249)",
            bgColor: "rgba(38,198,249,0.12)"
        }
    ]
    
    return ( 
    <StyledOverview>
        <MainStats>
            <Summary>
                <Title>
                    <h2>Overview</h2>
                </Title>
                <WidgetWrapper>
                    {data?.map((data,index) => <Widget key={index} data={data}/> )}
                </WidgetWrapper>
            </Summary>
        </MainStats>
    </StyledOverview> );
}
 
export default Overview;

const StyledOverview = styled.div`
    width: 100%;
    display: flex;
`

const MainStats = styled.div`
    width: 100%;
    flex: 2;

`

const Title = styled.div`
    p{
        font-size: 14px;
        color: rgba(234,234,255,0.68);
    }
    
`
const Summary = styled.div`
    background: rgb(48,51,78);
    color: rgba(234,234,255,0.68);
    width: 40%;
    padding: 1.5rem;
    height: 170px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const WidgetWrapper = styled.div`
    width: 60%;
    display: flex;
    justify-content: space-between;
`
