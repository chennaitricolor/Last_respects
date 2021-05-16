import React,{ useState }  from 'react';
import { Dropdown } from 'primereact/dropdown';
import { makeStyles } from '@material-ui/core/styles';
import { getSiteList, getZoneList } from '../../utils/CommonUtils';

const useStyles = makeStyles(() => ({

}));

const ZoneSelection = () => {

  const zoneList = getZoneList();
  const siteList = getSiteList();
  const [selectedZone, setZone] = useState(zoneList[0].value);
  const [selectedSite, setSite] = useState(siteList[0].value);
  const[isSiteDisabled, setSiteDisabled] = useState(true);

  const handleZoneSelection = (e) => {
    setZone(e.target.value);
    setSiteDisabled(true);
  }
  const handleSiteSelection = (e) => {
    setSite(e.target.value);

  }
  
  return (
    <div >
      <div className="col-12 float-left mb-4">
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
            disabled={isSiteDisabled}
            className="graph-select"
            onChange={(e) => handleSiteSelection(e)}
          />
        </div>
        <div className="col-12 p-0 mt-3">
          <label>Site Name : </label>
          <div className="m-0 row">

          </div>
        </div>
        <div className="col-12 p-0 mt-3">
          <label>Contact : </label>
          <div className="m-0 row">

          </div>
        </div>
        <div className="col-12 p-0 mt-3">
          <label>Address : </label>
          <div className="m-0 row">
          </div>
        </div>
      </div>
    </div>
  )

}

export default ZoneSelection;
