"use client";

import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { PlusCircle, TrendingDown, TrendingUp, DollarSign, LogOut, LogOutIcon } from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    PieChart,
    Pie,
    Cell,
} from 'recharts';
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import axios from 'axios';

export default function Home() {
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        type: 'expense',
        amount: '',
        description: '',
        category: ''
    });
    const { data: session, status } = useSession();
    const router = useRouter();


    const user = session?.user?.email
    const fetchTransactions = async () => {
        try {
            const response = await axios.get('/api/transactions', {
                params: { user }
            });
            if (!response) {
                throw new Error('Failed to fetch transactions');
            }
            const data = response.data;
            setTransactions(Array.isArray(data) ? data : []);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching transactions:', error);
            setTransactions([]);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (status === "loading") return;
        if (!session || status === "unauthenticated") {
            router.push("/login");
        } else {
            fetchTransactions();
        }
    }, [router, session, status]);



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/transactions', {
                ...formData,
                user
            });

            if (response.status == 201) {
                setFormData({
                    type: 'expense',
                    amount: '',
                    description: '',
                    category: ''
                });
                fetchTransactions();
            }
        } catch (error) {
            console.error('Error adding transaction:', error);
        }
    };

    const calculateTotal = (type) => {
        return transactions
            .filter(t => t.type === type)
            .reduce((acc, curr) => acc + (typeof curr.amount === 'number' ? curr.amount : 0), 0);
    };

    const income = calculateTotal('income');
    const expenses = calculateTotal('expense');
    const balance = income - expenses;

    // Prepare data for charts
    const categoryData = transactions.reduce((acc, transaction) => {
        const existingCategory = acc.find(item => item.category === transaction.category);
        if (existingCategory) {
            existingCategory.amount += transaction.amount;
        } else {
            acc.push({
                category: transaction.category,
                amount: transaction.amount,
                type: transaction.type
            });
        }
        return acc;
    }, []);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

    const monthlyData = transactions.reduce((acc, transaction) => {
        const date = new Date(transaction.date);
        const month = date.toLocaleString('default', { month: 'short' });

        if (!acc[month]) {
            acc[month] = { income: 0, expense: 0 };
        }

        if (transaction.type === 'income') {
            acc[month].income += transaction.amount;
        } else {
            acc[month].expense += transaction.amount;
        }

        return acc;
    }, {});

    const barChartData = Object.entries(monthlyData).map(([month, data]) => ({
        month,
        Income: data.income,
        Expenses: data.expense
    }));

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-4xl font-bold">SpendWise</h1>

                    <Dialog>
                        <div className='flex gap-4'>
                            <DialogTrigger asChild>
                                <Button>
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Add Transaction
                                </Button>
                            </DialogTrigger>
                            <Button
                                className='bg-red-950'
                                onClick={() => signOut()}
                            >
                                <LogOutIcon className="mr-2 h-4 w-4" />
                                Logout
                            </Button>
                        </div>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add New Transaction</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="type">Type</Label>
                                    <Select
                                        value={formData.type}
                                        onValueChange={(value) => setFormData({ ...formData, type: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="income">Income</SelectItem>
                                            <SelectItem value="expense">Expense</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="amount">Amount</Label>
                                    <Input
                                        id="amount"
                                        type="number"
                                        value={formData.amount}
                                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                        placeholder="Enter amount"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Input
                                        id="description"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        placeholder="Enter description"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Input
                                        id="category"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        placeholder="Enter category"
                                        required
                                    />
                                </div>
                                <Button type="submit" className="w-full">Add Transaction</Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-green-100 rounded-full">
                                <TrendingUp className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Total Income</p>
                                <h2 className="text-2xl font-bold text-green-600">${income.toFixed(2)}</h2>
                            </div>
                        </div>
                    </Card>
                    <Card className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-red-100 rounded-full">
                                <TrendingDown className="h-6 w-6 text-red-600" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Total Expenses</p>
                                <h2 className="text-2xl font-bold text-red-600">${expenses.toFixed(2)}</h2>
                            </div>
                        </div>
                    </Card>
                    <Card className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-blue-100 rounded-full">
                                <DollarSign className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Current Balance</p>
                                <h2 className={`text-2xl font-bold ${balance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                                    ${balance.toFixed(2)}
                                </h2>
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="p-6">
                        <h2 className="text-2xl font-bold mb-4">Monthly Overview</h2>
                        <div className="w-full h-[300px]">
                            <BarChart
                                width={500}
                                height={300}
                                data={barChartData}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="Income" fill="#82ca9d" />
                                <Bar dataKey="Expenses" fill="#ff7c7c" />
                            </BarChart>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h2 className="text-2xl font-bold mb-4">Category Distribution</h2>
                        <div className="w-full h-[300px] flex justify-center">
                            <PieChart width={400} height={300}>
                                <Pie
                                    data={categoryData}
                                    cx={200}
                                    cy={150}
                                    labelLine={false}
                                    label={({ category, percent }) => `${category} (${(percent * 100).toFixed(0)}%)`}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="amount"
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </div>
                    </Card>
                </div>

                <Card className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Recent Transactions</h2>
                    <div className="space-y-4">
                        {isLoading ? (
                            <p>Loading transactions...</p>
                        ) : transactions.length === 0 ? (
                            <p>No transactions found.</p>
                        ) : (
                            transactions.map((transaction) => (
                                <div
                                    key={transaction._id}
                                    className="flex items-center justify-between p-4 border rounded-lg"
                                >
                                    <div>
                                        <p className="font-medium">{transaction.description}</p>
                                        <p className="text-sm text-muted-foreground">{transaction.category}</p>
                                    </div>
                                    <div className={`text-lg font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                        {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </Card>
            </div >
        </div >
    );
}