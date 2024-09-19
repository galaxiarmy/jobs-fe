import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getJobDetail } from "../../utils/api";
function JobsDetail() {
  const location = useLocation();
  const navigate = useNavigate()
  const { id } = location?.state;

  const [loading, setLoading] = useState(false);
  const [jobsDetail, setJobsDetail] = useState(null);

  function plainString(html) {
    var divContainer = document.createElement("div");
    divContainer.innerHTML = html;
    return divContainer.textContent || divContainer.innerText || "";
  }

  const queryJobsDetail = async (idx) => {
    setLoading(true);
    try {
      const res = await getJobDetail(idx);

      if (res?.status === 200) {
        setJobsDetail(res?.data);
      } else {
        alert("Gagal mendapatkan data jobs!");
      }

    } catch (e) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    queryJobsDetail(id);
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
        padding={2}
        width={"100%"}
        sx={{
          backgroundColor: "#FF6229",
        }}
      >
        <Typography fontSize={24} fontWeight={"bold"} color="white">
          DansPRO Jobs
        </Typography>
      </Box>
      <Box padding={2} flexDirection={"column"} spacing={2}>
        <Stack onClick={() => {
            navigate(-1)
        }} style={{cursor: "pointer"}} gap={1} direction={"row"} mb={2}>
            <ArrowBackIcon />
            <Typography fontWeight={"bold"}>Back</Typography>
        </Stack>
        {loading ? (
          <Box
            display={"flex"}
            width={"100%"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <CircularProgress size={40} />
          </Box>
        ) : (
          <Stack
            pb={1}
            flexDirection={"row"}
            justifyContent={"space-between"}
            border={"4px solid gray"}
            sx={{ overflowX: "scroll", overflowY: "scroll" }}
            height={"80dvh"}
          >
            <Stack p={3} width={"100%"} gap={3}> 
              <Stack pb={2} borderBottom={"1px solid"}>
                <Typography fontSize={16} color="gray">
                  {jobsDetail?.type} / {jobsDetail?.location}
                </Typography>
                <Typography color="#384752" fontWeight={"bold"} fontSize={24}>
                  {jobsDetail?.title}
                </Typography>
              </Stack>
              <Stack flexDirection={"row"} gap={2}>
                <Box width={"70%"}>{plainString(jobsDetail?.description)}</Box>
                <Stack gap={2}>
                  <Box border={"3px solid "} width={"100%"}>
                    <Box p={2} borderBottom={"1px solid"}>
                      <Typography fontWeight={"bold"} fontSize={22}>{jobsDetail?.company}</Typography>
                    </Box>
                    <Stack
                      p={2}
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      {jobsDetail?.company_url}
                    </Stack>
                  </Box>
                  <Box p={3} border={"3px solid "}>
                    <Typography>How to Apply!</Typography>
                    <Stack
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      {plainString(jobsDetail?.how_to_apply)}
                    </Stack>
                  </Box>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        )}
      </Box>
    </Box>
  );
}

export default JobsDetail;
