import Navbar from 'scenes/navbar'
import { Box, Divider, Typography, useTheme, useMediaQuery, IconButton } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FlexBetween from 'components/FlexBetween';
import TrxCard from 'components/TrxCard';
import Wrapper from 'components/Wrapper';
import { DeleteOutline, EditOutlined } from '@mui/icons-material';
import { ApiAuth } from 'utils/functions';
import { setTransactions } from 'state';
import EditTrxCard from 'components/EditTrxCard';


const TrxHistoryPage = () => {
  const isNotMobile = useMediaQuery("(min-width: 1000px)");

  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions);

  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const neutralLight = palette.neutral.light;

  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const handleDelete = async (el) => {
    const Api = ApiAuth(token);

    const response = await Api.post('transaction/delete', { _id: el, userID: _id, });
    const transactions = response.data;
    dispatch(setTransactions(transactions));

  };

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNotMobile ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="center"
      >
        <Wrapper>
          <FlexBetween gap='0.5rem' pb='1.1rem'>
            <FlexBetween gap='1rem'>
              <Box width={'500px'}>
                <Typography
                  variant='h4'
                  color={dark}
                  fontWeight='500'
                >
                  Transaction History
                </Typography>
                <Typography>Ckeck all your movements</Typography>
              </Box>
            </FlexBetween>
          </FlexBetween>

          <Divider />
          {
            transactions?.map((el, i) => {
              return <EditTrxCard {...el} key={i} />
            })
          }
          <Divider />


        </Wrapper>
      </Box>
    </Box>
  )
}

export default TrxHistoryPage