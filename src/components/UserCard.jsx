import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileImg from './ProfileImg';
import FlexBetween from './FlexBetween';
import Wrapper from './Wrapper';
import { Box, Typography, useTheme, Divider } from '@mui/material';
import { BalanceOutlined, EditOutlined, LocalGroceryStoreOutlined, PaidOutlined, PercentOutlined, ReceiptOutlined } from '@mui/icons-material';

const UserWidget = ({ userId }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const transactions = useSelector((state) => state.transactions);
  const totals = useSelector((state) => state.totals)
  const dark = palette.neutral.dark;

  const getUser = async () => {
    const response = await fetch(`http://localhost:1337/user/${userId}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser()
  }, []);

  if (!user) return null; // add a loading component here!

  const {
    firstName,
    email,
    picturePath
  } = user;

  return (
    <Box mb='2rem'>
      <Wrapper>
        <FlexBetween gap='0.5rem' pb='1.1rem'>
          <FlexBetween gap='1rem'>
            <ProfileImg image={picturePath} />
            <Box>
              <Typography
                variant='h4'
                color={dark}
                fontWeight='500'
                sx={{
                  '&:hover': {
                    color: palette.primary.dark,
                    cursor: 'pointer'
                  }
                }}>Hi {firstName}</Typography>
              <Typography>{email}</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined />
        </FlexBetween>

        <Divider />

        {/* some data */}
        <Box p='1rem 0'>
          <Box display='flex' alignItems='center' gap='1rem' mb='0.5rem'>
            <ReceiptOutlined fontSize='large' color='primary' />
            <Typography>{`Transactions: ${transactions?.length}`}</Typography>
          </Box>
        </Box>
        <Box display='flex' alignItems='center' gap='1rem' pb={'0.5rem'}>
          <PaidOutlined fontSize='large' color='primary' />
          <Typography>Total income: ${totals.totalAmountIncome}</Typography>
        </Box>
        <Box display='flex' alignItems='center' gap='1rem' pb={'0.5rem'}>
          <LocalGroceryStoreOutlined fontSize='large' color='primary' />
          <Typography>Total expenses: ${totals.totalAmountExpenses}</Typography>
        </Box>
        <Box display='flex' alignItems='center' gap='1rem' pb={'0.5rem'}>
          <BalanceOutlined fontSize='large' color='primary' />
          <Typography>Balance: ${totals.totalBalance}</Typography>
        </Box>
        <Box display='flex' alignItems='center' gap='1rem' pb={'0.5rem'}>
          <PercentOutlined fontSize='large' color='primary' />
          <Typography>You've spent {totals.expenseRatio}% of your income</Typography>
        </Box>

      </Wrapper>
    </Box>
  )

};

export default UserWidget;

