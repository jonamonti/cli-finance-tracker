import {
  ConfirmationNumber,
} from "@mui/icons-material";
import {
  Box,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
  FormControl,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Wrapper from './Wrapper'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTransactions } from "state";
import { trxTypes, trxCategories } from "utils/const";
import { ApiAuth } from "utils/functions";
import dayjs from 'dayjs';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const NewTransaction = ({ update, c_id, cType, cCategory, cDescription, cAmount, cDdateStr, openDialog }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const neutralLight = palette.neutral.light;
  const dark = palette.neutral.dark;

  const [type, setType] = useState(cType || trxTypes[1]);
  const handleType = (e) => {
    setType(e.target.value);
    setCategory(trxCategories[e.target.value][0])
  }

  const [category, setCategory] = useState(cCategory || trxCategories[type][0]);
  const handleCategory = (e) => {
    setCategory(e.target.value);
  }

  const [amount, setAmount] = useState(cAmount || '');
  const handleAmount = (e) => {
    setAmount(parseFloat(e.target.value))
  }

  const [description, setDescription] = useState(cDescription || '');
  const handleDescription = (e) => {
    setDescription(e.target.value)
  }

  const cDate = dayjs(cDdateStr);

  const [date, setDate] = useState(cDate || dayjs());

  const handleDate = (value) => {
    setDate(value)
  }

  // const closeDialog = () => {
  //   openDialog(false)
  // }

  const handleAddTrx = async () => {
    const Api = ApiAuth(token);
    const response = await Api.post('transaction', { userID: _id, amount, type, category, description, date });
    const transactions = response.data;
    dispatch(setTransactions(transactions));
    setAmount('');
    setDescription('');
    if (update) openDialog();

  };

  const handleUpdateTrx = async () => {
    const Api = ApiAuth(token);
    const response = await Api.put('transaction', { _id: c_id, userID: _id, amount, type, category, description, date });
    const transactions = response.data;
    dispatch(setTransactions(transactions));
    setAmount('');
    setDescription('');
  };

  return (
    <Box mb='2rem'  >
      <Wrapper>
        <Box sx={{ height: '300px' }}>
          <FlexBetween>
            <Typography
              variant='h4'
              fontWeight='500'
              mb='1rem'
              color={dark}
              whiteSpace='break-spaces'
            >
              {update ? 'Is something wrong? Edit here!' : 'New expense? Add it!'}
            </Typography>
            {/* <Box mb={'1rem'}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Select a date"
                  fontSize='small'
                  value={date}
                  maxDate={dayjs()}
                  onChange={handleDate}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Box> */}
          </FlexBetween>
          <FlexBetween gap='1rem'>
            {/* amount */}
            <TextField
              fullWidth
              placeholder="0"
              sx={{ marginBottom: '1rem' }}
              label="How much?"
              value={amount}
              onChange={handleAmount}
              type="number"
              inputProps={{
                step: '0.01', // Set the step to allow decimal numbers with 2 decimal places
              }}
            />
            <Box mb={'1rem'}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Select a date"
                  fontSize='small'
                  value={date}
                  maxDate={dayjs()}
                  onChange={handleDate}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Box>
            {/* <TextField
              fullWidth
              sx={{ marginBottom: '1rem' }}
              label="Add a description"
              value={description}
              onChange={handleDescription}
              type="text"
              inputProps={{

              }}
            /> */}
          </FlexBetween>
          {/* <FlexBetween gap='2rem'> */}
          <Box
            display='flex'
            alignItems='center'
            gap='1rem'
            mb='1.5rem'
            flexDirection={isNotMobile ? 'row' : 'column'}
          >
            {/* trx type */}
            <FormControl
              variant='standard'
              value={type}
              sx={{
                '& .MuiInputBase-root': {
                  borderRadius: '6px',
                  width: `${isNotMobile ? '200px' : '100%'}`
                }
              }}>
              <Select
                value={type}
                onChange={handleType}
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
                {trxTypes.map((el, i) => {
                  return (
                    <MenuItem value={el} key={i}>
                      <Typography>{`${el.charAt(0).toUpperCase() + el.slice(1)}`}</Typography>
                    </MenuItem>
                  )
                })}

              </Select>
            </FormControl>

            {/* trx category */}
            <FormControl
              variant='standard'
              value={category}
              sx={{
                '& .MuiInputBase-root': {
                  borderRadius: '6px',
                  width: '200px'
                }
              }}>
              <Select
                value={category}
                onChange={handleCategory}
                sx={{
                  backgroundColor: neutralLight,
                  width: '200px',
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
                {trxCategories[type].map((el, i) => {
                  return (
                    <MenuItem value={el} key={i}>
                      <Typography>{`${el.charAt(0).toUpperCase() + el.slice(1)}`}</Typography>
                    </MenuItem>
                  )
                })}

              </Select>
            </FormControl>

          </Box>
          {/* add trx button */}
          <TextField
            fullWidth
            sx={{ marginBottom: '1rem' }}
            label="Add a description"
            value={description}
            onChange={handleDescription}
            type="text"
            inputProps={{

            }}
          />
          <Button
            variant="standard"
            type='button'
            disabled={!date || !amount || !description}
            onClick={update ? handleUpdateTrx : handleAddTrx}
            sx={{
              // m: '2rem 0',
              // p: '1rem',
              backgroundColor: palette.primary.main,
              color: palette.background.alt,
              '&:hover': { color: palette.primary.main }
            }}>
            {update ? 'Edit' : 'Add'}
          </Button>
        </Box>

      </Wrapper>
    </Box>
  )
}

export default NewTransaction