import '../../styles/users.scss';
import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import UsersStats from '../../components/users/UsersStats';
import UsersTable from '../../components/users/UsersTable';
import ReactPaginate from 'react-paginate';
import Loader from '../../components/general/Loader';

interface User {
    id: string;
  
}

const Users = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [users, setUsers] = useState<User[]>([]);
    const [currentItems, setCurrentItems] = useState<User[]>([]);
    const [pageCount, setPageCount] = useState<number>(0);
    const [itemOffset, setItemOffset] = useState<number>(0);
    const itemsPerPage = 9;

    const handlePageClick = (event: { selected: number }) => {
        const newOffset = (event.selected * itemsPerPage) % users.length;
        setItemOffset(newOffset);
    };

	const fetchUsers = async () => {
		setLoading(true);
		try {
			const response = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
			setUsers(response.data);
            console.log(response)
		} catch (error) {
			const axiosError = error as AxiosError; 
			console.error('Error fetching users:', axiosError.response?.data || axiosError.message);
            
		} finally {
			setLoading(false);
		}
	};
    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(users.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(users.length / itemsPerPage));
    }, [itemOffset, users]);

    return (
        <section className="users">
            <h1>Users</h1>
            <div>
                <UsersStats />
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <UsersTable users={currentItems} loading={loading} />
                        <div className="users-paginate">
                            <div className="user-page-info">
                                <p>
                                    Showing{' '}
                                    <span>
                                        {itemOffset + currentItems.length} <img src="/images/icons/down-arrow.svg" alt="down arrow" />
                                    </span>{' '}
                                    out of {users.length}
                                </p>
                            </div>
                            <ReactPaginate
                                nextLabel=">"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={2}
                                pageCount={pageCount}
                                previousLabel="<"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="arrow"
                                nextClassName="arrow"
                                breakLabel="..."
                                containerClassName="pagination"
                                activeClassName="active"
                            />
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default Users;
