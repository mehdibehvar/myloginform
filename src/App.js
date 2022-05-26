
import './App.css';
import { useAuthStateContext } from './AuthContext/AuthContext';
import DashBoard from './Dashboard/DashBoard';
import LoginForm from './loginpage/LoginForm';

function App() {
  const {token}=useAuthStateContext()
  return (<>
   {token?<DashBoard/>:<LoginForm/>} 
  
  </>
  );
}

export default App;
