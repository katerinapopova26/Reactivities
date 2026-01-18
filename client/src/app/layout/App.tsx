import { Box, Container, CssBaseline } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

function App() {
const [activities, SetActivities] = useState<Activity[]>([]);
const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);


useEffect(() => {
axios.get<Activity[]>("https://localhost:5001/api/activities")
  .then((response) => SetActivities(response.data));
  
  return () => {}
}, [])

//function to select activity

const handleSelectActivity = (id: string) => {
  setSelectedActivity(activities.find(x => x.id === id));
}

//function to cancel the activity

const handleCancelSelectActivity = () => {
  setSelectedActivity(undefined);
}


  return (
    <>
      <Box sx={{ bgcolor: "#eeeeee" }}>
        <CssBaseline />
        <NavBar />
        <Container maxWidth="xl" sx={{ mt: 3 }}>
          <ActivityDashboard
            activities={activities}
            selectActivity={handleSelectActivity}
            cancelSelectActivity={handleCancelSelectActivity}
            selectedActivity={selectedActivity}
          />
        </Container>
      </Box>
    </>
  );
}

export default App
