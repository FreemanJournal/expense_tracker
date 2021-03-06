import { Card, CardContent, CardHeader, Divider, Grid, Typography } from '@material-ui/core'
import React, { useContext } from 'react'
import useTransactions from '../../useTransactions';
import { ExpenseTrackerContext } from '../Context/context';
import Form from './Form/Form';
import List from './List/List';
import useStyles from "./styles";

export default function Main() {
    const classes = useStyles();
    const title = useContext(ExpenseTrackerContext)
    const incomeTotal =useTransactions('Income');
    const expenseTotal =useTransactions('Expense');
    const balance = (incomeTotal.total - expenseTotal.total).toFixed(2)

    return (
        <>
            <Card className={classes.root}>
                <CardHeader title={title.appName} subheader="Powered by Speechly"/>
                <CardContent>
                    <Typography align='center' variant='h5'>Total Balance $ {balance}</Typography>
                    <Typography variant='subtitle1' style={{lineHeight:"1.5em",marginTop:"20px"}}>
                        Try saying: Add income for $100 in Category Salary for Monday...
                    </Typography>
                    <Divider/>
                    <Form/>                    
                </CardContent>
                <CardContent className={classes.cartContent}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}> 
                        <List/> 
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            
        </>
    )
}
