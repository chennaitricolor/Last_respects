import React from "react";
import { Dropdown } from 'primereact/dropdown';
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(() => ({

}));

const ZoneSelection = () => {

  /*const handleZoneSelection = (e) => {
    setMonth(e.target.value)
  }
  const handleSiteSelection = (e) => {
    getPieData(e.target.value)
  }*/

  return (
    <div style={{ minHeight:320 }} >
     {/*} <div className="col-12 float-left mb-4">
        <div className="col-6 float-left px-0">
        <label>Zone Name</label>
          <Dropdown
            placeholder="Zone Name"
            value={selectedZone}
            options={zoneList}
            className="graph-select"
            onChange={(e) => handleZoneSelection(e)}
          />
        </div>
        <div className="col-6 float-right px-0">
        <label>Site Name</label>
          <Dropdown
            placeholder="Site Name"
            value={selectedSite}
            options={siteList}
            className="graph-select"
            onChange={(e) => handleSiteSelection(e)}
          />
        </div>
        <div className="col-12 p-0 mt-3">
          <label>Site Name</label>
          <div className="m-0 row"> 
            
          </div>
        </div>
        <div className="col-12 p-0 mt-3">
          <label>Contact</label>
          <div className="m-0 row">
            
          </div>
        </div>
        <div className="col-12 p-0 mt-3">
          <label>Address</label>
          <div className="m-0 row">
          </div>
        </div>
      </div>
  */}
    </div>
  )
  
}

export default ZoneSelection;
