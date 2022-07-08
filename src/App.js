
import Dashboard from "./Dashboard/Dashboard";
import React, { useEffect, useState, Fragment, Component } from "react";

import { HashRouter , Route, Routes,  Link  } from "react-router-dom";

import Sqlrun from "./Sql/Sqlrun";
import Report from "./Report/Report";
import MiniDrawer from "./Dashboard/ListImport";







function App() {

  

  
  
  return (
      <div>
      <HashRouter>
      <Fragment>
      <MiniDrawer/>
        <Routes>     
        
        {/* <Route exact path="/dashboard" element={ <Dashboard />} >     */}
        {/* <Route exact path="sqlrun" element={ <Sqlrun/>} />
        <Route exact path="report" element={ <Report/>} />  */}
       {/* </Route>      */}
        </Routes>

        </Fragment>
      </HashRouter>
      </div>
  
  );
}

export default App;
