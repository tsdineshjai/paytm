import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Dashboard from "./components/Dashboard";
import SendMoney from "./components/Send";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/signup" element={<SignUp />} />
				<Route path="/signin" element={<SignIn />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/send" element={<SendMoney />} />
			</Routes>
		</Router>
	);
}

export default App;
