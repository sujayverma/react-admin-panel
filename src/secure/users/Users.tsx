import React, { useState, useEffect } from "react";
import Wrapper from "../Wrapper";
import api from "../../libs/axiosInstance";
import { useAuth } from "../../context/authContext";

interface UserType {
    id: number;
    name: string;
    email: string;
    role: any;
}

const Users = ( ) => {
    const { user } = useAuth(); // <-- authenticated user here
    const [users, setUsers] = useState<UserType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get("/users"); // <-- your users API
                setUsers(response.data);
            } catch (err) {
                console.error("Failed to fetch users:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) return <Wrapper><p>Loading users...</p></Wrapper>;
    return (
        <Wrapper>
            <h2>List Of Users</h2>

            <p>Logged-in User: <strong>{user?.name}</strong></p>

        <div className="table-responsive">
            <table className="table table-striped table-sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                 <tbody>
                        {users.map((u) => (
                            <tr key={u.id}>
                                <td>{u.id}</td>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                            </tr>
                        ))}
                    </tbody>
            </table>
        </div>
        </Wrapper>
    );

};

export default Users;