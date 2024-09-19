import AssignmentIcon from "@mui/icons-material/Assignment";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import InputField from "../../components/InputField";
import PublicIcon from "@mui/icons-material/Public";
import CardJobs from "../../components/CardJobs";
import { getListJobs } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { coreService, logout } from "../../utils/general";

function Home() {
  const navigate = useNavigate();
  const email = coreService.getItem("email");

  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [fullTime, setFullTime] = useState(true);

  const [listJobs, setListJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/auth/login", { replace: true });
  };

  function isPalindrome(text) {
    const texts = text.split('').map((v) => v).filter((v) => v[0] && v[v?.length - 1])

    if(texts[0].toLowerCase() === text[texts?.length -1].toLowerCase()) {
      return true
    } else {
      return false
    }
  }

  const queryListJobs = async () => {
    const ispalin = isPalindrome("krak")

    console.log(ispalin)

    setLoading(true);
    try {



      const res = await getListJobs({
        desc: description,
        loc: location,
        fullTime: fullTime,
      });
      if (res?.status === 200) {
        const datasFilter = res?.data?.filter((v) => v !== null && fullTime);

        if(fullTime) {
          setListJobs(datasFilter);
        } else {
          setListJobs([])
        }
        
      } else {
        alert("Gagal mendapatkan data jobs!");
      }
    } catch (e) {
      alert("Gagal mendapatkan data jobs!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    queryListJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box
      sx={{
        width: "100%",
        height: "100dvh",
        overflowY: "hidden",
        overflow: "hidden",
        scrollbarWidth: "none", // Hide the scrollbar for firefox
        "&::-webkit-scrollbar": {
          display: "none", // Hide the scrollbar for WebKit browsers (Chrome, Safari, Edge, etc.)
        },
        "&-ms-overflow-style:": {
          display: "none", // Hide the scrollbar for IE
        },
      }}
    >
      <Box
        width={"100%"}
        sx={{
          backgroundColor: "#FF6229",
        }}
        display={"flex"}
      >
        <Stack
          width={"100%"}
          alignItems={"center"}
          p={2}
          direction={"row"}
          justifyContent={"space-between"}
        >
          {" "}
          <Typography fontSize={24} fontWeight={"bold"} color="white">
            DansPRO Jobs
          </Typography>
          <Stack>
            <Typography fontWeight={"500"} color="white">
              {email}
            </Typography>
            <Button onClick={handleLogout} variant="contained">
              Logout
            </Button>
          </Stack>
        </Stack>
      </Box>
      <Box padding={2} flexDirection={"column"} spacing={2}>
        <Stack
          gap={2}
          flexDirection={"row"}
          width={"100%"}
          alignItems={"flex-end"}
        >
          <Box width={"30%"}>
            <InputField
              value={description}
              setValue={setDescription}
              title={"Job Description"}
              placeholder={"Filter by title, benefits, companies, expertise"}
              icon={<AssignmentIcon />}
            />
          </Box>
          <Box width={"30%"}>
            <InputField
              value={location}
              setValue={setLocation}
              title={"Location"}
              placeholder={"Filter by city, state, zip code or country"}
              icon={<PublicIcon />}
            />
          </Box>
          <FormControlLabel
            sx={{
              alignItems: "center",
            }}
            control={
              <Checkbox
                checked={fullTime}
                onChange={(e) => {
                  setFullTime(e?.target?.checked);
                }}
              />
            }
            label={
              <Typography fontWeight={"bold"} fontSize={16}>
                Full Time Only
              </Typography>
            }
          />
          <Button
            onClick={() => {
              queryListJobs();
            }}
            variant="contained"
            sx={{
              backgroundColor: "#FF6229",
              height: "40px",
            }}
          >
            Search
          </Button>
        </Stack>
        <Box
          border={4}
          borderColor={"gray"}
          p={3}
          mt={3}
          sx={{ overflowX: "scroll", overflowY: "scroll" }}
          height={"70dvh"}
        >
          <Typography fontSize={24} fontWeight={"bold"}>
            Job List
          </Typography>
          <Stack gap={2}>
            {loading ? (
              <Box
                display={"flex"}
                width={"100%"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <CircularProgress size={40} />
              </Box>
            ) : listJobs && listJobs?.length > 0 ? (
              // eslint-disable-next-line array-callback-return
              listJobs.map((value, i) => {
                if (value !== null) {
                  return (
                    <CardJobs
                      onClick={() => {
                        navigate("/jobs-detail", {
                          state: {
                            id: value?.id,
                          },
                        });
                      }}
                      key={i}
                      data={value}
                    />
                  );
                }
              })
            ) : (
              <Box
                display={"flex"}
                width={"100%"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Typography fontWeight={"bold"}>No Data!</Typography>
              </Box>
            )}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
