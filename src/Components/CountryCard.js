import {Container,Row} from 'react-bootstrap';
const CountryCard = (props) => {
    return ( 
        <Container fluid className='country-bg'>
            <Row>{props.name}</Row>
            <Row>{props.region}</Row>
            <Row>{props.area}</Row>
        </Container>
     );
}
 
export default CountryCard;