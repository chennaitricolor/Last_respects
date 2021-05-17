import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import DateSelection from "../components/SlotBooking/DateSelection";
import ZoneSelection from "../views/ZoneSelection/ZoneSelection";

const useStyles = makeStyles(() => ({
  slotBookingTitle: {
    color: "#466783",
    fontSize: "18px",
    fontWeight: "bold",
    marginTop: "2%",
    marginLeft: "2%",
  },
}));

const SlotBookingContainer = () => {
  const styles = useStyles();

  const [selectedDate, setSelectedDate] = useState(
    new Date().getDate().toString()
  );

  useEffect(() => {
    console.log("Test");
  }, []);

  const selectDate = (date) => {
    setSelectedDate(date.date);
  };

  return (
    <div>
      <div className={styles.slotBookingTitle}>Slot Booking</div>
      <DateSelection selectedDate={selectedDate} selectDate={selectDate} />
    </div>
  );
};

export default SlotBookingContainer;
