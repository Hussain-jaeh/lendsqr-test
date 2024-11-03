import { FC, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import UserDetailsHeader from '../../components/users/UserDetailsHeader';
import UserDetailsMain from '../../components/users/UserDetailsMain';
import '../../styles/user-details.scss';
import Loader from '../../components/general/Loader';

interface User {
    // Define the shape of your user object based on your API response
    id: string;
    orgName: string;
    userName: string;
    email: string;
    phoneNumber: string;
    createdAt: string;
    profile: {
        firstName: string;
        lastName: string;
        phoneNumber: string;
        // Add other profile fields
    };
    // Add other necessary fields
}

const UserDetail: FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<User | null>(null); // Initialize with null
    const { id } = useParams<{ id: string }>(); // Type the params

    const fetchUser = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/${id}`);
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching user:', error);
        
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [id]); 

    return (
        <section className="user-details">
            <Link to="/dashboard" className="back">
                <img src="/images/icons/back-icon.svg" alt="back" />
                <span>Back to Users</span>
            </Link>
            <div className="header-btns">
                <h1>User Details</h1>
                <div>
                    <button type="button">BLACKLIST USER</button>
                    <button type="button">ACTIVATE USER</button>
                </div>
            </div>
            {loading ? (
                <Loader />
            ) : user ? (
                <div>
                    <UserDetailsHeader user={user} />
                    <UserDetailsMain user={user} />
                </div>
            ) : (
                <div>No user found.</div> // Handle the case where no user is found
            )}
        </section>
    );
};

export default UserDetail;
