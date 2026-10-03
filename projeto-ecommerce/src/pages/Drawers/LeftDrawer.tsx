import { Box, Drawer, IconButton, Typography } from "@mui/material";
import type { TDrawer } from "../../types/TypeDrawer";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

export const LeftDrawer = ({ open, onClose }: TDrawer) => {
  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            m: 2,
            height: "calc(100% - 32px)",
            borderRadius: 3,
            width: 460,
            overflow: "hidden",
          },
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
        <IconButton onClick={onClose}>
          <CloseOutlinedIcon />
        </IconButton>
      </Box>
      <Box sx={{ p: 2 }}>
        <Typography>ASDAD</Typography>
      </Box>
    </Drawer>
  );
};
