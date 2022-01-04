export const formatDate = (date)=>{
    const d = new Date(date);
    let month = `${d.getMonth()+1}`//month start from 0
    let day = `${d.getDate()}`;
    const year = `${d.getFullYear()}`;
    month.length <2 && (month = `0${month}`)
    day.length <2 && (day = `0${day}`)

    return [year,month,day].join('-')

}