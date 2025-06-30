"use client"

import { useGetBatchQuery } from "@/redux/api/batchApi";
import { useFilterExpenseMutation } from "@/redux/api/expenseApi";
import { useFilterIncomeMutation } from "@/redux/api/incomeApi";
import { Ibatch } from "@/types/batch";
import { useState } from "react";

export const ReportTable = () => {
    const [selectedValue, setSelectedValue] = useState('');

    const [filterIncome] = useFilterIncomeMutation();
    const [filterExpense] = useFilterExpenseMutation();

    const [incomeRes, setIncomeRes] = useState<any>({});
    const [expenseRes, setExpenseRes] = useState<any>({});
    const [totalProfit, setTotalProfit] = useState<any>();
    const [lossOrprofit, setLossOrprofit] = useState('Profit');
    const handleChange = async (event: any) => {
        const batchId = event.target.value;
        setSelectedValue(batchId);
        const resIncome = await filterIncome(batchId).unwrap();
        const resExpense = await filterExpense(batchId).unwrap();

        setIncomeRes(resIncome);
        setExpenseRes(resExpense);

        let TotalIncome = 0;
        let TotalExpense = 0;
        if (resIncome.data) {
            TotalIncome = resIncome.data.totalIncome;
        }
        if (resExpense.data) {
            TotalExpense = resExpense.data.totalExpense;
        }
        let Profit = TotalIncome - TotalExpense;
        if (Profit < 0) {
            setLossOrprofit('Loss');
        } else {
            setLossOrprofit('Profit');
        }
        if (Profit === 0) {
            setTotalProfit('');
            console.log(Profit);
        } else {
            setTotalProfit(Profit);
        }

    };

    // console.log(incomeRes.data?.incomes.map((data: any) => data.amount));
    const {
        data: batchData,
        isLoading: batchLoading,
        refetch,
    } = useGetBatchQuery({});
    return (
        <>
            <div className="container mx-auto p-4">
                <h1 className="mb-4 text-2xl font-bold border-b pb-2">Income and Expense Report</h1>
                <div className="flex flex-col gap-6 sm:flex-row">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                            Batch <span className="text-danger">*</span>
                        </label>
                        <select
                            className="select select-bordered bg-white dark:bg-black select-sm md:select-md w-[320px]"
                            value={selectedValue}
                            onChange={handleChange}
                        >
                            <option defaultValue="">Select Batch</option>
                            {batchData?.data.map((data: Ibatch) => (
                                <option value={data.id} key={data.id}>
                                    {data.batch_number}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {totalProfit && (
                    <><div className="mb-6 mt-6">
                        <div className="block w-full rounded shadow-[rgba(236,_18,_18,_0.2)_0px_3px_15px]">
                            <div className="flex flex-col gap-6 sm:flex-row mt-4 text-center">
                                <div className="w-full ">
                                    <table className="w-full border-collapse items-center bg-transparent">
                                        <thead className="text-center text-dark">
                                            <tr>
                                                <th colSpan={3} className="bg-sky-950 py-2 text-white"> Accounting </th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-dark text-center">
                                            <tr>
                                                <td></td>
                                                <td className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-x"> Income </td>
                                                <td className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-x"> {incomeRes.data?.totalIncome}৳ </td>
                                            </tr>
                                            <tr className="border-t">
                                                <td></td>
                                                <td className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-x"> Expense </td>
                                                <td className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6  align-middle text-x"> {expenseRes.data?.totalExpense}৳ </td>
                                            </tr>
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td className={lossOrprofit === "Profit" ? "bg-green-700 text-white py-2" : "bg-red-700 text-white py-2"}></td>
                                                <td className={lossOrprofit === "Profit" ? "bg-green-700 text-white py-2" : "bg-red-700 text-white py-2"} >Total {lossOrprofit}</td>
                                                <td className={lossOrprofit === "Profit" ? "bg-green-700 text-white py-2" : "bg-red-700 text-white py-2"} > {totalProfit}৳ </td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>

                            </div>
                            <div className="flex flex-col gap-6 sm:flex-row mt-5 text-center overflow-x-auto ">
                                <div className="w-full">
                                    <h2 className="text-xl font-bold border-b bg-sky-950 py-2 text-white">Income</h2>
                                    <table className="w-full border-collapse items-center bg-transparent">
                                        <thead className="text-center text-dark">
                                            <tr className="bg-slate-200 dark:bg-slate-800">
                                                <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase"> Date </th>
                                                <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase"> Expenditure Sector </th>
                                                <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase"> comment </th>
                                                <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase"> Amount </th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-dark text-center">
                                            {incomeRes.data?.incomes.map((data: any) =>

                                                <tr className="border-b-1 border border-l-0 border-r-0 border-t-0 border-slate-200 dark:border-slate-700" key={data.id}>
                                                    <td className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-2 px-6 text-left align-middle text-xs"> {data.date} </td>
                                                    <td className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-2 px-6 text-left align-middle text-xs"> {data.expenditure_sector} </td>
                                                    <td className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-2 px-6 text-left align-middle text-xs"> {data.comment} </td>
                                                    <td className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-2 px-6 text-left align-middle text-xs"> {data.amount}৳  </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="flex flex-col mt-4 gap-6 sm:flex-row mt-5 text-center overflow-x-auto">
                                <div className="w-full">
                                    <h2 className="text-xl font-bold border-b bg-sky-950
                         py-2 text-white">Expense</h2>
                                    <table className="w-full border-collapse items-center bg-transparent">
                                        <thead className="text-center text-dark">
                                            <tr className="bg-slate-200 dark:bg-slate-800">
                                                <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase"> Date </th>
                                                <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase"> Source </th>
                                                <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase"> comment </th>
                                                <th className="bg-blueGray-50 text-blueGray-500 whitespace-nowrap  px-6 py-3 text-left align-middle text-xs font-semibold uppercase"> Amount </th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-dark text-center">
                                            {expenseRes.data?.expenses.map((data: any) =>

                                                <tr className="border-b-1 border border-l-0 border-r-0 border-t-0 border-slate-200 dark:border-slate-700" key={data.id}>
                                                    <td className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs"> {data.date} </td>
                                                    <td className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs"> {data.source} </td>
                                                    <td className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs"> {data.comment} </td>
                                                    <td className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs"> {data.amount}৳  </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    </>
                )}

            </div>

        </>
    );
}