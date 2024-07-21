import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import Home from "./components/Dashboard/Home";
import AddInvoice from "./components/Dashboard/AddInvoice";
import Setting from "./components/Dashboard/Setting";
import Invoice from "./components/Dashboard/Invoice";
import InvoiceDetails from "./components/Dashboard/InvoiceDetails";

function App() {
  //creating the router
  const myRouter = createBrowserRouter([
    {path: '', Component:Login},
    {path:'/login', Component:Login},
    {path:'/register', Component:Register},
    {path:'/dashboard', Component:Dashboard, children: [
      {path: '', Component:Home},
      {path: 'home', Component:Home},
      {path: 'add-invoice', Component:AddInvoice},
      {path: 'invoice', Component:Invoice},
      {path: 'invoice-detail', Component:InvoiceDetails},
      {path: 'setting', Component:Setting},
    ]},
  ])

  return (
    <div >
      <RouterProvider router={myRouter}>
        <Login/>
        <Register />
      </RouterProvider>
    </div>
  );
}

export default App;
