import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@material-ui/core'
import React, { useContext, useState } from 'react'
import { v4 as uuidV4 } from 'uuid'
import {
  expenseCategories,
  incomeCategories
} from '../../../constants/categories'
import { formatDate } from '../../../utils/formatDate'
import { ExpenseTrackerContext } from '../../Context/context'
import useStyles from './style'
const initialState = {
  amount: '',
  category: '',
  type: 'Income',
  date: formatDate(new Date()),
  id: '',
}
export default function Form() {
  const classes = useStyles()
  const [formData, setFormData] = useState(initialState)
  const { addTransaction } = useContext(ExpenseTrackerContext)
  const createTransaction = () => {
   if( !formData.amount||!formData.category)return 
    const transaction = {
      ...formData,
      amount: Number(formData.amount),
      id: uuidV4(),
    }
    addTransaction(transaction)
    setFormData(initialState)
  }
  const selectedCategories =
    formData.type === 'Income' ? incomeCategories : expenseCategories
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography align="center" variant="subtitle2" gutterBottom>
          ...
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
          <Select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >
            <MenuItem value="Income">Income</MenuItem>
            <MenuItem value="Expense">Expense</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            {selectedCategories.map((category) => (
              <MenuItem key={category.type} value={category.type}>
                {category.type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <TextField
          type="number"
          label="Amount"
          fullWidth
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          type="date"
          label="Date"
          fullWidth
          value={formData.date}
          onChange={(e) =>
            setFormData({
              ...formData,
              date: formatDate(e.target.value),
            })
          }
        />
      </Grid>
      <Button
        className={classes.button}
        variant="outlined"
        color="primary"
        fullWidth
        onClick={createTransaction}
      >
        Create
      </Button>
    </Grid>
  )
}
