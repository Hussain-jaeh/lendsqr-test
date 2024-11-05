import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import FilterForm from './FilterForm';
import MoreDropDown from './MoreDropDown';
import { FilterValues } from '../../core/models';

interface UserModel {
  id: string;
  orgName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  status: string;
}

interface Props {
  users: UserModel[];
  loading: boolean;
}

const tableHeaders = ['Organization', 'Username', 'Email', 'Phone number', 'Date joined', 'Status', ''];

const UsersTable: FC<Props> = ({ users, loading }) => {
  const navigate = useNavigate();
  const [filteredUsers, setFilteredUsers] = useState<UserModel[] | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState<number | null>(null);
  const [isOptionsOpen, setIsOptionsOpen] = useState<number | null>(null);

  const handleUserClick = (userId: string) => {
    navigate(`/dashboard/users/${userId}`);
  };

  const handleFilter = (filterValues: FilterValues) => {
    console.log('Filter values:', filterValues); // Debug filter values

    const filtered = users.filter(user => {
      const dateMatch = filterValues.date
        ? moment(user.createdAt).format('YYYY-MM-DD') === filterValues.date
        : true;

      const organizationMatch =
        !filterValues.organization ||
        user.orgName.toLowerCase().includes(filterValues.organization.toLowerCase());
      const usernameMatch =
        !filterValues.username || user.userName.toLowerCase().includes(filterValues.username.toLowerCase());
      const emailMatch = !filterValues.email || user.email.toLowerCase().includes(filterValues.email.toLowerCase());
      const phoneMatch = !filterValues.phone || user.phoneNumber.includes(filterValues.phone);
      const statusMatch = !filterValues.status || user.status.toLowerCase() === filterValues.status.toLowerCase();

      return organizationMatch && usernameMatch && emailMatch && phoneMatch && statusMatch && dateMatch;
    });

    setFilteredUsers(filtered);
    setIsFilterOpen(null);
  };

  const handleResetFilters = () => {
    setFilteredUsers(users);
    setIsFilterOpen(null);
  };

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  const renderStatus = () => {
    const statuses = ['active', 'pending', 'blacklisted', 'inactive'];
    const randomIndex = Math.floor(Math.random() * statuses.length);
    const randomStatus = statuses[randomIndex];
  
    let statusClass = '';
    let statusText = '';
    let statusBgColor = '';
    let statusTextColor = '';
  
    switch (randomStatus) {
      case 'active':
        statusClass = 'status-active';
        statusText = 'Active';
        statusBgColor = '#d0efd9';
        statusTextColor = '#39CD62';
        break;
      case 'pending':
        statusClass = 'status-pending';
        statusText = 'Pending';
        statusBgColor = '#f3eedf';
        statusTextColor = '#E9B200';
        break;
      case 'blacklisted':
        statusClass = 'status-blacklisted';
        statusText = 'Blacklisted';
        statusBgColor = '#efcad2';
        statusTextColor = '#E4033B';
        break;
        case 'inactive':
          statusClass = 'status-inactive';
          statusText = 'inactive';
          statusBgColor = '#e0e3ec';
          statusTextColor = ' #545F7D';
          break;
    }
  
    return (
      <div
        className={`status-bar ${statusClass}`}
        style={{
          backgroundColor: statusBgColor,
          color: statusTextColor,
        }}
      >
        <span className="status-text">{statusText}</span>
      </div>
    );
  };

  return (
    <div data-testid="user-table" className="users-table">
      <table>
        <thead>
          <tr>
            {tableHeaders.map((header, index) => (
              <th key={index}>
                <div>
                  <span>{header}</span>
                  {header && (
                    <img
                      src="/images/icons/filter-icon.svg"
                      alt="filter-icon"
                      className="filter-icon"
                      onClick={() => setIsFilterOpen(isFilterOpen === index ? null : index)}
                    />
                  )}
                </div>
                {isFilterOpen === index && (
                  <FilterForm onFilter={handleFilter} onReset={handleResetFilters} />
                )}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {filteredUsers?.map((user, index) => (
            <tr key={user.id} onClick={() => handleUserClick(user.id)}>
              <td>{user.orgName}</td>
              <td>{user.userName}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>{moment(user.createdAt).format('MMM D, YYYY h:mm a')}</td>
              <td>{renderStatus()}</td>
              <td onClick={(e) => e.stopPropagation()}>
                <img
                  src="/images/icons/more-icon.svg"
                  alt="more"
                  onClick={() => setIsOptionsOpen(isOptionsOpen === index ? null : index)}
                />
                {isOptionsOpen === index && <MoreDropDown />}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
