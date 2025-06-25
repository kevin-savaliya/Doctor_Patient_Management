import './App.css';


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Homepage from './Rendering/Homepage';
import LoginPage from './Rendering/Loginpage';
import AddPatients from './Rendering/add-patients';
import AddMedicine from './Rendering/add-medicine';
import AddPrescription from './Rendering/add-prescription';
import Routing from './routing';

function App() {
  return (
    <div>
      <Routing />
      {/* <LoginPage /> */}
      {/* <Homepage/> */}
      {/* <AddPatients/> */}
      {/* <AddMedicine/> */}
      {/* <AddPrescription/> */}
    </div>
  );
}

export default App;
