import { Box, Typography } from '@mui/material'
import React from 'react'
import FlexBetween from './FlexBetween'

const TrxCard = ({ type, category, description, amount, date }) => {

  const formattedDate = date.slice(0, 10);
  return (
    <Box display={'flex'} flexDirection='column' m={'1rem 0'}>
      <FlexBetween>
        <Typography>{`${category.charAt(0).toUpperCase() + category.slice(1)}`}</Typography>
        <Typography color={type === 'income' && 'primary'}>
          {type === 'income' ? `+$ ${amount}` : `-$ ${amount}`}
        </Typography>
      </FlexBetween>
      <FlexBetween>
        <Typography>{`${description.charAt(0).toUpperCase() + description.slice(1)}`}</Typography>
        <Typography>{formattedDate}</Typography>
      </FlexBetween>
    </Box>
  )
}

export default TrxCard