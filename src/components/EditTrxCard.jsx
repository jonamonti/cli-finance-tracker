import { DeleteOutlineOutlined, EditOutlined } from '@mui/icons-material'
import { Box, Dialog, DialogContent, DialogTitle, Divider, IconButton, useTheme } from '@mui/material'
import React, { useState } from 'react'
import FlexBetween from './FlexBetween'
import NewTransaction from './NewTransaction'
import TrxCard from './TrxCard'
import { ApiAuth } from 'utils/functions'
import { useDispatch, useSelector } from 'react-redux'
import { setTransactions } from 'state'


const EditTrxCard = ({ _id, type, category, description, amount, date }) => {
  const { palette } = useTheme();
  const neutralLight = palette.neutral.light;
  const { _id: userID } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  const handleDelete = async () => {
    const Api = ApiAuth(token);

    const response = await Api.post('transaction/delete', { _id, userID });
    const transactions = response.data;
    dispatch(setTransactions(transactions));

  };

  const [dialogOpen, setDialogOpen] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('md');

  const handleEditClick = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };
  return (
    <Box
      pl='0.5rem'
      sx={{
        '&:hover': {
          backgroundColor: `${neutralLight}`,
          cursor: 'pointer'
        }
      }}>
      <FlexBetween>
        <Box width={'80%'} >
          <TrxCard type={type} category={category} description={description} amount={amount} date={date} />
        </Box>
        <IconButton onClick={handleEditClick}>
          <EditOutlined />
        </IconButton>
        {/* Dialog */}
        <Dialog
          open={dialogOpen}
          onClose={handleClose}
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          sx={{
            '& .MuiDialogContent-root': {
              backgroundColor: palette.background.alt,

            }
          }}>
          <DialogContent>
            {/* prefix c refers to 'current' trx */}
            <NewTransaction
              update
              c_id={_id}
              cType={type}
              cCategory={category}
              cDescription={description}
              cAmount={amount}
              cDdateStr={date}
              openDialog={handleClose} />
          </DialogContent>
        </Dialog>
        <IconButton onClick={() => handleDelete(_id)}>
          <DeleteOutlineOutlined />
        </IconButton>
      </FlexBetween>
      <Divider />
    </Box>
  )
}

export default EditTrxCard