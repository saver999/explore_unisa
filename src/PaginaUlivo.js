import Carousel from '../src/components/Carousel/Carousel';
import Navbar from '../src/components/navbar/navbar';
import Card from '../src/components/CardFigma/cardFigma';
import Footer from '../src/components/footer/footer';
import immagine1 from "./image/immagine1.JPG";
import image1 from "./image/img.png";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import data from './vittime.json'


function PaginaUlivo(){
    const {id} = useParams();
    const vittima = data.vittime_mafia.find(v => v.id === parseInt(id));
    console.log(vittima)
    if(!vittima){
        console.log('vittima non trovata')
        return <div>Vittima non trovata</div>
    }

    return(
        <div>
            <Navbar/>
            <Container className="fluid">
                <Row className="my-4">
                    <h3>{vittima.nome}</h3>
                    <Col md="2" style={{
                        backgroundImage : `url(${image1})`,
                        backgroundSize : 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition:'center center',
                        minHeight:'400px'
                    }}/>
                    <Col>
                        <div className="">
                            <p>{vittima.testo}</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>

    );
}
export default PaginaUlivo;

