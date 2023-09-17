import { Typography, useTheme } from "@mui/material";

const MonefyLogo = ({ handleClick }) => {
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  return (
    <Typography
      fontWeight='bold'
      fontSize={'clap(1rem, 2rem, 2.25rem)'}
      color='primary'
      onClick={handleClick}
      sx={{
        "&:hover": {
          color: primaryLight,
          cursor: "pointer"
        }
      }}>
      Monefy
    </Typography>
  )
}

export default MonefyLogo;