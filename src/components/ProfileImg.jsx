import { Box } from "@mui/material";

const ProfileImg = ({ image, size = '60px' }) => {
  return (
    <Box width={size} height={size}>
      <img
        alt='userPicture'
        style={{ objectFit: 'cover', borderRadius: '50%' }}
        src={`http://localhost:1337/assets/${image}`}
      />

    </Box>
  )
};

export default ProfileImg