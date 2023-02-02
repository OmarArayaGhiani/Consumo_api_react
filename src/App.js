import Container from 'react-bootstrap/Container'
import Holidays from "./Components/MiApi"

function App() {
  return (
    <Container className='text-light'>
      <h1 className='text-center mt-5'>Feriados de Chile</h1>
      <Holidays />
    </Container>
  );
}

export default App
