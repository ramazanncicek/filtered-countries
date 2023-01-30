import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container,Row,Col} from 'react-bootstrap';
import CountryCard from './Components/CountryCard';
import { useState,useEffect } from 'react';

function App() {
  const [allCountries,setCountries] = useState([]);
  const [smallerCountries,setSmallerCountries] = useState([]);
  const [countryByArea,setByArea] = useState([]);
  const [displayCountries,setDisplayCountries] = useState('');
  const [ascending,setAscending] = useState(true);
  // const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 3;
  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(()=>{
    fetch('https://restcountries.com/v2/all?fields=name,region,area')
    .then(response => response.json())
    .then(final => {
      setCountries(final);
      setDisplayCountries(final);
    });
  },[])

  const descendingList = () => {
    setDisplayCountries([...displayCountries].reverse());
    setAscending(!ascending);
  }

  const smallerByArea = () => {
    allCountries.find((country) =>{
      if(country.name == "Lithuania") setSmallerCountries(allCountries.filter((area) => area.area < country.area))
    });
    setDisplayCountries(smallerCountries);
  }
  const unitByRegion = () => {
    setByArea(allCountries.filter((item) => item.region == "Oceania"));
    setDisplayCountries(countryByArea);
  }
  return (
    <Container className="App" fluid>
      <Row style={{margin: "5px 5px 10px 0", width:"fit-content"}}>
        <Col className='d-flex justify-content-start country-header'>Filtered Countries</Col>
      </Row>
      <Row style={{marginBottom: "10px"}}>
        <Col className='d-flex justify-content-start'>
          <button onClick={smallerByArea} className="country-btn">Smaller than Lithuania</button>
          <button onClick={unitByRegion} style={{marginLeft:"20px"}} className="country-btn">Inside 'Ocean' Region</button>
        </Col>
        <Col className='d-flex justify-content-end'>
          {ascending ? <button onClick={descendingList} className="country-btn">Descending</button> : <button onClick={descendingList} className="country-btn">Ascending</button>}
        </Col>
      </Row>
      {displayCountries.length > 0 ? displayCountries.map((country,index) => (
        <CountryCard name={country.name} region={country.region} area={country.area} key={index} ></CountryCard>
      )) : null}
    </Container>
  );
}

export default App;
