
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { FilterValues } from '../../core/models';

interface Props {
  onFilter: (values: FilterValues) => void;
  onReset: () => void;
}

const FilterForm: FC<Props> = ({ onFilter, onReset }) => {
  const {
    register,
    handleSubmit,
    reset,
   
  } = useForm<FilterValues>({
    mode: 'all'
  });

  const onSubmit = (data: FilterValues) => {
    onFilter(data);
  };

  const handleReset = () => {
    reset(); 
    onReset(); 
	console.log("submitted")
  };

  return (
    <form className="filter-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="organization">Organization</label>
        <select {...register('organization')}>
          <option value="">Select</option>

        </select>
      </div>

      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="User"
          {...register('username')}
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Email"
          {...register('email')}
        />
      </div>

      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          placeholder="Date"
          {...register('date')}
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone Number</label>
        <input
          type="tel"
          placeholder="Phone Number"
          {...register('phone')}
        />
      </div>

      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select {...register('status')}>
          <option value="">Select</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="button" onClick={handleReset}>
          Reset
        </button>
        <button type="submit">Filter</button>
      </div>
    </form>
  );
};

export default FilterForm;