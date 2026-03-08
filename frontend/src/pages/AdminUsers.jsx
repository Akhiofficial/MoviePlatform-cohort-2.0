import React, { useState, useEffect } from 'react';
import { Filter, Download, Trash2, Ban } from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';
import AdminTopbar from '../components/AdminTopbar';
import { api } from '../context/AuthContext';
import { motion } from 'framer-motion';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await api.get('/admin/users');
            setUsers(res.data.users);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDeleteUser = async (id) => {
        if (!window.confirm('Are you sure you want to delete/ban this user?')) return;
        try {
            await api.delete(`/admin/users/${id}`);
            setUsers(users.filter((u) => u._id !== id));
            alert('User deleted successfully');
        } catch (error) {
            console.error('Error deleting user:', error);
            alert(error.response?.data?.message || 'Error deleting user');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex bg-[#110C0C] min-h-screen text-white font-sans selection:bg-brand-red selection:text-white"
        >
            <AdminSidebar />
            <main className="flex-1 flex flex-col h-screen overflow-y-auto w-full bg-[#110C0C]">
                <AdminTopbar />
                <div className="p-8 pb-20 max-w-[1200px] w-full mx-auto space-y-10">
                    <section className="bg-[#1A1414] border border-[#2A1E1E] rounded-[24px] p-8 md:p-10 shadow-xl overflow-x-auto">
                        <div className="flex justify-between items-end mb-8 min-w-[700px]">
                            <div>
                                <h2 className="text-2xl font-bold text-white tracking-tight mb-1">Manage Users</h2>
                                <p className="text-gray-400 text-[13px] font-medium">Showing {users.length} registered users</p>
                            </div>
                            <div className="flex gap-3">
                                <button className="w-[38px] h-[38px] rounded-full border border-[#2A1E1E] flex items-center justify-center hover:bg-white/5 transition-colors group cursor-pointer shadow-sm">
                                    <Filter className="w-[18px] h-[18px] text-gray-400 group-hover:text-white" />
                                </button>
                                <button className="w-[38px] h-[38px] rounded-full border border-[#2A1E1E] flex items-center justify-center hover:bg-white/5 transition-colors group cursor-pointer shadow-sm">
                                    <Download className="w-[18px] h-[18px] text-gray-400 group-hover:text-white" />
                                </button>
                            </div>
                        </div>

                        <div className="w-full">
                            <table className="w-full text-left whitespace-nowrap min-w-[800px]">
                                <thead>
                                    <tr className="text-[10px] uppercase tracking-widest text-gray-500 font-black border-b border-[#2A1E1E]">
                                        <th className="pb-4 pl-4 w-12">User</th>
                                        <th className="pb-4">Full Name</th>
                                        <th className="pb-4">Email Address</th>
                                        <th className="pb-4">Role</th>
                                        <th className="pb-4">Joined Date</th>
                                        <th className="pb-4 pr-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr>
                                            <td colSpan="6" className="py-10 text-center text-gray-500">Loading users...</td>
                                        </tr>
                                    ) : users.length > 0 ? (
                                        users.map((user) => (
                                            <tr key={user._id} className="group border-b border-[#2A1E1E]/50 hover:bg-[#201818] transition-colors cursor-pointer">
                                                <td className="py-5 pl-4">
                                                    <div className="w-10 h-10 rounded-full border border-white/5 bg-[#302020] flex items-center justify-center text-white font-bold text-[15px]">
                                                        {user.fullname ? user.fullname.charAt(0).toUpperCase() : '?'}
                                                    </div>
                                                </td>
                                                <td className="py-5 text-[14px] font-bold text-white transition-colors">{user.fullname}</td>
                                                <td className="py-5 text-[13px] text-gray-400 font-medium">{user.email}</td>
                                                <td className="py-5 text-[12px] text-gray-400 font-bold tracking-wider uppercase">
                                                    {user.role === 'admin' ? (
                                                        <span className="text-brand-red">Admin</span>
                                                    ) : (
                                                        <span>User</span>
                                                    )}
                                                </td>
                                                <td className="py-5 text-[13px] text-gray-400 font-medium">
                                                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                                                </td>
                                                <td className="py-5 pr-4 text-right">
                                                    <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button
                                                            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-brand-red hover:bg-brand-red/10 transition-colors shadow-sm"
                                                            title="Ban / Delete User"
                                                            onClick={(e) => { e.stopPropagation(); handleDeleteUser(user._id); }}
                                                        >
                                                            <Ban className="w-[15px] h-[15px]" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="py-10 text-center text-gray-500">No users found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </main>
        </motion.div>
    );
};

export default AdminUsers;
