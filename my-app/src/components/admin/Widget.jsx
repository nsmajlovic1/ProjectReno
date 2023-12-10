import styled from "styled-components";

const Widget = ({data}) => {
    return ( 
    <StyledWidget>
        <Icon color={data.color} bgcolor={data.bgcolor}>
            {data.icon}
        </Icon>
        <Text>
            <h3>
                {data.digits.toLocaleString()}
            </h3>
            <p>{data.title}</p>
        </Text>
    </StyledWidget> );
}
 
export default Widget;

const StyledWidget = styled.div`
    display: flex;
    align-items: center;
`

const Icon = styled.div`
    background: ${({bgcolor}) => bgcolor};
    color: ${({color}) => color};
    padding: 0.5rem;
    margin-right: 0.5rem;
    border-radius: 3px;
    font-size: 20px;
`

const Text = styled.div`
    h3{
        font-weight: 900;
    }
    p{
        font-size: 14px;
        color: rgba(234,234,255,0.68);
    }
`