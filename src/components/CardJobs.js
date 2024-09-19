import { Stack, Typography } from "@mui/material";
import moment from "moment";
import React from "react";

function CardJobs({ data, onClick = () => {} }) {
  return (
    <Stack
      style={{
        cursor: "pointer",
      }}
      onClick={onClick}
      pb={1}
      flexDirection={"row"}
      justifyContent={"space-between"}
      borderBottom={"1px solid gray"}
    >
      <Stack>
        <Typography color="#4267B2" fontWeight={"bold"}>
          {data?.title}
        </Typography>
        <Typography color="#909090">
          {data?.company} -{" "}
          <Typography color="#4d962e" component={"span"} fontWeight={"bold"}>
            {data?.type}
          </Typography>
        </Typography>
      </Stack>
      <Stack alignItems={"flex-end"}>
        <Typography color="#000000"> {data?.location}</Typography>
        <Typography color="#909090">
          {moment(data?.created_at).fromNow()}
        </Typography>
      </Stack>
    </Stack>
  );
}

export default CardJobs;
