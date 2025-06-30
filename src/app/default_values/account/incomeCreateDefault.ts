const incomeDefaultValue = (data: any) => {
    return {
        batch_id:data?.batch_id || "",
        date: data?.date || "",
        expenditure_sector: data?.expenditure_sector || "",
        comment: data?.comment || "",
        amount: data?.amount || "",
    }
}

export default incomeDefaultValue;