import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        py: 8,
      }}
    >
      <CircularProgress enableTrackSlot size="30px" aria-label="Loading…" />
    </Box>
  );
};
