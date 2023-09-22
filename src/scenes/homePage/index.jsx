import { Box, useMediaQuery } from '@mui/material'
import Navbar from 'scenes/navbar'
import { useSelector } from 'react-redux'
import UserCard from 'components/UserCard'
import NewTransaction from 'components/NewTransaction'
import TrxHistory from 'components/TrxHistory'
import BalanceChart from 'components/BalanceChart'

const HomePage = () => {
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  const { _id } = useSelector((state) => state.user);

  return (
    <Box>
      <Navbar />
      {/* MAIN CANVAS */}
      <Box
        width={'100%'}
        display={isNotMobile ? 'flex' : 'block'}
        p='2rem 6%'
        gap='1.5rem'
        justifyContent={'space-between'}
      >
        {/* FIRST COLUMN */}
        <Box
          flexBasis={isNotMobile ? "35%" : undefined}
        >
          <UserCard userId={_id} />
          <TrxHistory />
        </Box>
        {/* SECOND COLUMN */}
        <Box
          flexBasis={isNotMobile ? "65%" : undefined}
          mt={isNotMobile ? undefined : "2rem"}
        >
          <NewTransaction />
          <BalanceChart />

        </Box>
      </Box>
    </Box>
  )
}

export default HomePage