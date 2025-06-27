import React from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Link } from 'react-router';
import { DASHBOARD } from '../../constants/routes';

interface NavLink {
    path: string;
    title: string;
    subselections?: NavLink[];
}
  
const NAV_LINKS_MAPPER: NavLink[] = [
    { path: DASHBOARD, title: 'Dashboard' },
    { path: '/transactions', title: 'Transactions' },
    {
      path: '/categories',
      title: 'Categories',
      subselections: [
        { path: '/categories/income', title: 'Income' },
        { path: '/categories/expense', title: 'Expense' }
      ]
    },
    { path: '/budgeting', title: 'Budgeting' },
    { path: '/reports', title: 'Reports' },
    { path: '/settings', title: 'Settings' },
];

const Sidenav = ({ width = 240 }) => {
    return (
        <Drawer variant="permanent" sx={{ width }}>
            <List>
                {NAV_LINKS_MAPPER.map((item, index) => (
                    <ListItem component={Link} to={item.path} key={index} disablePadding>
                        <ListItemButton>
                            <ListItemText primary={item.title} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    )
}

export default Sidenav;