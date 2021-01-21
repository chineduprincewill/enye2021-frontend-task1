import React, { useState, useEffect } from 'react';
import './App.css';
import Datatable from './datatable';

require("es6-promise").polyfill();
require("isomorphic-fetch");

function App() {

  const [data, setData] = useState([])
  const [pmfilter, setPmfilter] = useState("");
  const [gdfilter, setGdfilter] = useState("");
  const [q, setQ] = useState("")

  useEffect(() => {
    fetch("https://api.enye.tech/v1/challenge/records")
    .then(response => response.json())
    .then((json) => setData(json.records.profiles));
  }, []);

  let group = data.reduce((r, a) => {
    //console.log("a", a);
    //console.log('r', r);
    r[a.PaymentMethod] = [...r[a.PaymentMethod] || [], a];
    return r;
   }, {});
   //console.log(group);
  let list1;

  //list1 = Object.keys(group);

  if(Object.keys(group).length > 0){
    
    const pmarray = Object.keys(group);

    const pmlist = Array.from(pmarray);

    //list1 = pmlist;

      list1 = pmlist.map(pm => (
        <option key={pm} value={pm}>{pm}</option>
      ));
  }


  let group2 = data.reduce((r, a) => {
    //console.log("a", a);
    //console.log('r', r);
    r[a.Gender] = [...r[a.Gender] || [], a];
    return r;
   }, {});
   //console.log(group);
  let list2;

  //list1 = Object.keys(group);

  if(Object.keys(group2).length > 0){
    
    const gdarray = Object.keys(group2);

    const gdlist = Array.from(gdarray);

    //list1 = pmlist;

      list2 = gdlist.map(gd => (
        <option key={gd} value={gd}>{gd}</option>
      ));
  }


  function search(rows) {
    if(q !== ""){
      const columns = rows[0] && Object.keys(rows[0]);

      return rows.filter((row) => 
        columns.some((column) => row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1 )  
      );
    }

    if(pmfilter !== ""){
      return rows.filter(row => row.PaymentMethod.toLowerCase().indexOf(pmfilter) > -1)
    }

    if(gdfilter !== ""){
      return rows.filter(row => row.Gender.indexOf(gdfilter) > -1)
    }


    return rows;
  }


  return (
    <div className="container-fluid">
        <h3 className="text text-primary text-center mt-2 p-3 border-bottom">PROFILES' E-COMMERCE TRANSACTIONS</h3>

        <div className="row mt-3 bg-grey pt-2">
          <div className="col-md-3 ml-3">
            <div className="form-group">
              <select 
                value={pmfilter} 
                className="form-control"
                onChange={(e) => setPmfilter(e.target.value)}
                placeholder="select payment method"
              >
                <option value="">filter by payment method</option>
                {list1}
              </select>
            </div>
          </div> 

          <div className="col-md-3 ml-3">
            <div className="form-group">
              <select 
                value={gdfilter} 
                className="form-control" 
                onChange={(e) => setGdfilter(e.target.value)}
                placeholder="select payment method"
              >
                <option value="">filter by gender</option>
                {list2}
              </select>
            </div>
          </div>   

          <div className="input-group col-md-3 ml-3">
            <input type="text" className="form-control" value={q} onChange={(e) => setQ(e.target.value)} placeholder="search profile" />
            <div className="input-group-btn">
              <span className="btn btn-default">
                <i className="fa fa-search"></i>
              </span>
            </div>
          </div>
        </div>
        <div className="col-12">
          <Datatable data={search(data)} />
        </div>
    </div>
  );
}

export default App;
