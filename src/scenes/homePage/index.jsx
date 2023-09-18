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
      <Box
        width="100%"
        padding="0rem 6%"
        // display={isNotMobile ? "flex" : "block"}
        display={'flex'}
        flexDirection={isNotMobile ? "row" : "column"}
        gap="1rem"
        justifyContent="flex-start"
      >
        <Box flexBasis={isNotMobile ? "35%" : undefined}>
          <UserCard userId={_id} />
        </Box>
        <Box flexBasis={isNotMobile ? "60%" : undefined} >
          <NewTransaction />
        </Box>
      </Box>
      <Box
        width="100%"
        padding="0rem 6%"
        // display={isNotMobile ? "flex" : "block"}
        display={'flex'}
        flexDirection={isNotMobile ? "row" : "column"}
        gap="0.5rem"
        justifyContent="flex-start"
      >
        {/* <Box
          width="100%"
          // padding="1rem 6%"
          // display={isNotMobile ? "flex" : "block"}
          display={'flex'}
          flexDirection={isNotMobile ? "row" : "column"}
          gap="1rem"
          justifyContent="flex-start"
        > */}
        <Box flexBasis={isNotMobile ? "35%" : undefined}>
          <TrxHistory />
        </Box>
        <Box flexBasis={isNotMobile ? "35%" : undefined}>
          <BalanceChart />
        </Box>
      </Box>

    </Box>

    // </Box>
  )
}

export default HomePage