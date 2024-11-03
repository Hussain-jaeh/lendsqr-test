import { FC } from 'react';
import { useState } from 'react';
import { UserModel } from '../../core/models';
import moment from 'moment';
import {useNavigate } from 'react-router-dom';
import FilterForm from './FilterForm';
import MoreDropDown from './MoreDropDown';






interface Props {
	users: UserModel[];
	loading: Boolean;
}

const tableHeaders = ['Organization', 'Username', 'Email', 'Phone number', 'Date joined', 'Status', ''];

const UsersTable: FC<Props> = ({ users, loading }) => {
	const navigate = useNavigate();

const handleUserClick = (userId: string) => {
  navigate(`/dashboard/users/${userId}`);
};

	const [isFilterOpen, setIsFilterOpen] = useState<null | Number>(null);
	const [isOptionsOpen, setIsOptionsOpen] = useState<null | Number>(null);

	return (
		<div data-testid="user-table" className="users-table" >
			<table>
				<thead>
					<tr>
						{tableHeaders.map((header, index) => {
							return (
								<th key={index}>
									<div>
										<span>{header}</span>
										{header && (
											<img
												src="/images/icons/filter-icon.svg"
												alt="filter-icon"
												onClick={() => (isFilterOpen === index ? setIsFilterOpen(null) : setIsFilterOpen(index))}
											/>
										)}
									</div>
									{isFilterOpen === index ? <FilterForm /> : ''}
								</th>
							);
						})}
					</tr>
				</thead>

				<tbody>
					{users.map((user: any, index: number) => {
						return (
							<tr key={index}   onClick={() => handleUserClick(user.id)}>


								<td> {user.orgName}</td>
								<td>{user?.userName}</td>
								<td>{user?.email}</td>
								<td>{user?.phoneNumber}</td>
								<td>{moment(user?.createdAt).format('MMM D, YYYY h:mm a')}</td>
								<td>
									<span className="status active"> Active</span>
								</td>
								<td>
									<img
										src="/images/icons/more-icon.svg"
										alt="more"
										onClick={() => (isOptionsOpen === index ? setIsOptionsOpen(null) : setIsOptionsOpen(index))}
									/>

									{isOptionsOpen === index ? <MoreDropDown /> : ''}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default UsersTable;
