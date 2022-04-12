import './App.css';
import SignIn from './pages/Login';
import SignUp from './pages/Signup';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Overview from './pages/Dashboard/Overview';
import Home from './pages/Home';
import Statistics from './pages/Dashboard/Statistics';
import Users from './pages/Dashboard/Users';
import Parcels from './pages/Dashboard/Parcels';

function App() {
	return (
		<Router>
			<div className="App">
				<Routes>
					<Route path='/register' element={<SignUp/>} />
					<Route path='/login' element={<SignIn/>} />
					<Route path='/dashboard' element={<Dashboard/>}>
						<Route path= 'overview' element={<Overview/>} />
						<Route path= 'statistics' element={<Statistics/>} />
						<Route path= 'users' element={<Users/>} />
						<Route path= 'parcels' element={<Parcels/>} />
					</Route>
					<Route path='/' element={<Home/>}/>
				</Routes>
			</div>
		</Router>
	);
}


export default App;
