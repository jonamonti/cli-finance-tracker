import { Box, Divider, Typography, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTransactions } from "state";
import FlexBetween from "./FlexBetween";
import TrxCard from "./TrxCard";
import Wrapper from "./Wrapper";
import { ApiAuth } from "utils/functions";

const TrxHistory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions);
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const { palette } = useTheme();
  const dark = palette.neutral.dark;

  const handleClick = () => {
    navigate('/transactions')
  }

  const getPosts = async () => {
    const Api = ApiAuth(token);
    const response = await Api.get(`/transaction/${_id}`);
    const transactions = response.data;
    dispatch(setTransactions(transactions));
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Wrapper>
      <FlexBetween gap='0.5rem' pb='1.1rem'>
        <FlexBetween gap='1rem'>
          <Box>
            <Typography
              variant='h4'
              color={dark}
              fontWeight='500'
            >
              Transaction History
            </Typography>
            <Typography>Ckeck your last movements</Typography>
          </Box>
        </FlexBetween>
      </FlexBetween>

      <Divider />
      {
        transactions?.map((el, i) => {
          if (i <= 2) return <TrxCard {...el} key={i} />
        })
      }
      <Divider />
      {transactions?.length > 3 ? (
        <Box display={'flex'} justifyContent='flex-end' pt='1.1rem'>
          <Typography
            color='primary'
            onClick={handleClick}
            sx={{
              '&:hover': {
                cursor: 'pointer'
              }
            }}>
            {`See all (${(transactions.length)})`}
          </Typography>
        </Box>
      ) : (
        <Box display={'flex'} justifyContent='flex-end' pt='1.1rem'>
          <Typography
            color='primary'
            onClick={handleClick}
            sx={{
              '&:hover': {
                cursor: 'pointer'
              }
            }}>
            Manage transactions</Typography>
        </Box>
      )}


    </Wrapper>
  )
}

export default TrxHistory