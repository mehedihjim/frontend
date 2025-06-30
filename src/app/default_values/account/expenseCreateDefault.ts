const expenseCreateDefault = (data : any) => {
    return {
        batch_id:data?.batch_id || "",
        date: data?.date || "",
        source: data?.source || "",
        comment: data?.comment || "",
        amount: data?.amount || "",
    }
}

export default expenseCreateDefault;