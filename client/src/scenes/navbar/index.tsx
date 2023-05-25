import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, useTheme } from '@mui/material';
import FlexBetween from '@/components/FlexBetween';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

const Navbar = () => {
  const { palette } = useTheme();
  const [selected, setSelected] = useState('dashboard');

  return (
    <FlexBetween mb="0.25rem" p="0.5rem 0rem" color={palette.grey[300]}>
      {/* LEFT SIDE LOG */}
      <FlexBetween gap="0.75rem">
        <AccountBalanceIcon sx={{ fontSize: '40px' }} />
        <Typography variant="h3" fontSize="25px">
          Finance Portfolio
        </Typography>
      </FlexBetween>

      {/* RIGHT SIDE */}
      <FlexBetween gap="2rem">
        <Box sx={{ '&:hover': { color: palette.primary[100] } }}>
          <Link
            to="/"
            onClick={() => setSelected('dashboard')}
            style={{
              color: selected === 'dashboard' ? 'inherit' : palette.grey[700],
              textDecoration: 'inherit',
            }}
          >
            Dashboard View
          </Link>
        </Box>
        <Box sx={{ '&:hover': { color: palette.primary[100] } }}>
          <Link
            to="/predictions"
            onClick={() => setSelected('predictions')}
            style={{
              color: selected === 'predictions' ? 'inherit' : palette.grey[700],
              textDecoration: 'inherit',
            }}
          >
            Predictions View
          </Link>
        </Box>
      </FlexBetween>
    </FlexBetween>
  );
};

export default Navbar;
