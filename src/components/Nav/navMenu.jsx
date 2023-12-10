import * as React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';

export default function NavMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const history = useHistory();
  const user = useSelector(store => store.user.userReducer);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (event) => {
    setAnchorEl(null);
    switch(event.target.textContent) {
        case 'Admin': history.push('/adminhomeview'); break;
        case 'All Grants': history.push('/adminallgrantsdata'); break;
        case 'Scored Reviews': history.push('/scoredreviews'); break;
        case 'Import Google Sheet': history.push('/importSheet'); break;
        case 'Reviewer Home': history.push('/reviewerhomepage'); break;
        case 'Reviewer Form': history.push('/reviewerform'); break;
        case 'Departments': history.push('/departments');break;
    }
  }

  return (
    <div>
      <Button
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MenuIcon fontSize='large' />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {user.admin && 
        <div>
        <MenuItem onClick={(e) => handleSelect(e)}>Admin</MenuItem>
        <MenuItem onClick={(e) => handleSelect(e)}>All Grants</MenuItem>
        <MenuItem onClick={(e) => handleSelect(e)}>Scored Reviews</MenuItem>
        <MenuItem onClick={(e) => handleSelect(e)}>Import Google Sheet</MenuItem>
        <MenuItem onClick={(e) => handleSelect(e)}>Departments</MenuItem>
        </div>
        }
        <MenuItem onClick={(e) => handleSelect(e)}>Reviewer Home</MenuItem>
        <MenuItem onClick={(e) => handleSelect(e)}>Reviewer Form</MenuItem>

      </Menu>
    </div>
  );
}