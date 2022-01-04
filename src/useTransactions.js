import { useContext } from 'react'
import { ExpenseTrackerContext } from './components/Context/context'
import { expenseCategories, incomeCategories, resetCategories } from './constants/categories'

export default function useTransactions(title) {
  resetCategories()
  const { transactions } = useContext(ExpenseTrackerContext)
  console.log(transactions)
  const transactionsPerType = transactions.filter((t) => t.type === title)
  const total = transactionsPerType.reduce(
    (accumulator, currentValue) => (accumulator += currentValue.amount),
    0,
  )

  const categories = title === "Income" ? incomeCategories : expenseCategories;

  console.log({ transactionsPerType, total, categories })
  transactionsPerType.forEach((t)=>{
    const category = categories.find((c)=>c.type === t.category)
    if(category)category.amount += t.amount;
  })

  const filteredCategories = categories.filter((c)=>c.amount > 0)

  const chartData = {
    labels:filteredCategories.map((c)=>c.type),
    datasets:[{
      data:filteredCategories.map((c)=>c.amount),
      backgroundColor:filteredCategories.map((c)=>c.color)
    }],
  }

  return {total,chartData}
}
