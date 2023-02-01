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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const lastItemDisplayed = currentPage * itemsPerPage;
  const firstItemDisplayed = lastItemDisplayed - itemsPerPage;

  useEffect(()=>{
    fetch('https://restcountries.com/v2/all?fields=name,region,area')
    .then(response => response.json())
    .then(final => {
      setCountries(final);
      setDisplayCountries(final);
    });
  },[]);

  useEffect(() => {
  setDisplayCountries(smallerCountries);
  },[smallerCountries]);

  useEffect(() => {
  setDisplayCountries(countryByArea);
  },[countryByArea]);

  const descendingList = () => {
    setDisplayCountries([...displayCountries].reverse());
    setAscending(!ascending);
  }

  const smallerByArea = () => {
    allCountries.find((country) =>{
      if(country.name === "Lithuania") setSmallerCountries(allCountries.filter((area) => area.area < country.area))
    });
  }
  const unitByRegion = () => {
    setByArea(allCountries.filter((item) => item.region === "Oceania"));
  }

  const pageUp = () => {
    if(currentPage === Math.ceil(displayCountries.length / itemsPerPage)) setCurrentPage(1);
    else setCurrentPage(currentPage+1);
  };

  const pageDown = () => {
    if(currentPage>1) setCurrentPage(currentPage-1);
    else setCurrentPage(Math.ceil(displayCountries.length / itemsPerPage));
  };

  return (
    <Container className="App" fluid>
      <Row style={{margin: "5px 5px 10px 0", width:"fit-content"}}>
        <Col className='d-flex justify-content-start country-header'>Filtered Countries</Col>
      </Row>
      <Row style={{marginBottom: "10px"}}>
        <Col className='d-flex justify-content-start'>
          <button onClick={smallerByArea} className="country-btn">Smaller than Lithuania</button>
          <button onClick={unitByRegion} style={{marginLeft:"20px"}} className="country-btn">Inside 'Ocean' Region</button>
          <button onClick={pageDown} style={{marginLeft:"20px"}} className="country-btn">Page Down</button>
          <h3 style={{marginLeft:"10px"}}>{currentPage}</h3>
          <button onClick={pageUp} style={{marginLeft:"10px"}} className="country-btn">Page Up</button>
        </Col>
        <Col className='d-flex justify-content-end'>
          {ascending ? <button onClick={descendingList} className="country-btn">Descending</button> : <button onClick={descendingList} className="country-btn">Ascending</button>}
        </Col>
      </Row>
      {displayCountries.length > 0 ? displayCountries.map((country,index) =>{
        if (index < lastItemDisplayed && index >= firstItemDisplayed) return <CountryCard name={country.name} region={country.region} area={country.area} key={index}></CountryCard>;
      }) : null}
    </Container>
  );
}

export default App;
