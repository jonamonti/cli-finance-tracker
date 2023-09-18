import { useState } from "react"
import { Box, IconButton, InputBase, Typography, Select, MenuItem, FormControl, useTheme, useMediaQuery } from "@mui/material";
import { DarkMode, LightMode, Notifications, Help, Search, Menu, Close, Message, HomeOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import MonefyLogo from "components/MonefyLogo";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isNotMobile = useMediaQuery("(min-width: 900px)");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  // separate colors
  const { palette } = useTheme();
  const neutralLight = palette.neutral.light;
  const dark = palette.neutral.dark;
  const background = palette.background.default;
  const alt = palette.background.alt
  const primaryLight = palette.primary.light;
  const firstName = user?.firstName || 'Jona';

  // functions
  const handleNavigate = () => {
    navigate('/home');
  };

  const handleMode = () => {
    dispatch(setMode());
  };

  const handleLogout = () => {
    dispatch(setLogout());
    navigate('/');
  };

  const handleOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <FlexBetween padding='1rem 6%' backgroundColor='alt'>

      <FlexBetween gap='1.75rem'>
        <MonefyLogo handleClick={handleNavigate} />
        { // hide search bar if screen is small
          isNotMobile && (
            <FlexBetween backgroundColor={neutralLight} borderRadius='6px' gap='2.5rem' padding='0.1rem 1.5rem'>
              <InputBase placeholder="Search ..." />
              <IconButton>
                <Search />
              </IconButton>
            </FlexBetween>
          )
        }
      </FlexBetween>

      {/* desktop */}
      {isNotMobile ? (
        <FlexBetween gap='2rem'>
          <IconButton onClick={handleMode}>
            {
              palette.mode === 'dark' ? (
                <DarkMode sx={{ fontSize: '20px' }} />) : (
                <LightMode sx={{ color: dark, fontSize: '20px' }} />
              )
            }

          </IconButton>
          <IconButton onClick={handleNavigate}>
            <HomeOutlined sx={{ fontSize: '20px' }} />
          </IconButton>
          <FormControl
            variant='standard'
            value={firstName}
            sx={{
              '& .MuiInputBase-root': {
                borderRadius: '6px',
              }
            }}>
            <Select
              value={firstName}
              sx={{
                backgroundColor: neutralLight,
                width: '150px',
                p: '0.25rem 1rem',
                '& .MuiSvgIcon-root': {
                  pr: '0.25rem',
                  width: '3rem'
                },
                '& MuiSelect-select:focus': {
                  backgroundColor: neutralLight,

                }
              }}
              input={<InputBase />}
            >
              <MenuItem value={firstName}>
                <Typography>{firstName}</Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                Log Out
              </MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={handleOpen}
        >
          <Menu />
        </IconButton>
      )}

      {/* mobile */}
      {!isNotMobile && isMenuOpen ? (
        <Box
          position='fixed'
          right='0'
          bottom='0'
          height='100%'
          zIndex='10'
          maxWidth='500px'
          minWidth='300px'
          backgroundColor={background}
        >
          <Box display='flex' justifyContent='flex-end' p='1rem'>
            <IconButton onClick={handleOpen}>
              <Close />
            </IconButton>
          </Box>
          <FlexBetween display='flex' flexDirection='column' justifyContent='center' alignItems='center' gap='3rem'>
            <IconButton onClick={handleMode}>
              {
                palette.mode === 'dark' ? (
                  <DarkMode sx={{ fontSize: '20px' }} />) : (
                  <LightMode sx={{ color: dark, fontSize: '20px' }} />
                )
              }

            </IconButton>
            <Message sx={{ fontSize: '20px' }} />
            <Notifications sx={{ fontSize: '20px' }} />
            <Help sx={{ fontSize: '20px' }} />
            <FormControl
              variant='standard'
              value={firstName}
              sx={{
                '& .MuiFormControl-root': {
                  borderRadius: '6px'
                }
              }}>
              <Select
                value={firstName}
                sx={{
                  backgroundColor: neutralLight,
                  width: '150px',
                  p: '0.25rem 1rem',
                  '& .MuiSvgIcon-root': {
                    pr: '0.25rem',
                    width: '3rem'
                  },
                  '& MuiSelect-select:focus': {
                    backgroundColor: neutralLight,

                  }
                }}
                input={<InputBase />}
              >
                <MenuItem value={firstName}>
                  <Typography>{firstName}</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>

        </Box>
      ) : (
        <></>
      )
      }

    </FlexBetween>
  )
}

export default Navbar