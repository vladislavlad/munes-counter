import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import useAxiosAuthed from "../../../hooks/useAxiosAuthed";
import AuthContext from "../../../context/AuthProvider";

export default function AccountMenu() {

    const { auth, setAuth } = useContext(AuthContext);
    const [user, setUser] = useState(null);
    const axiosAuthed = useAxiosAuthed();
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);

    console.log('USER', user)

    useEffect(() => {


        const getUser = async () => {
            await axiosAuthed.get('/current-user')
                .then(
                    response => {
                        if (response?.data != null) {
                            setUser(response.data)
                        }
                        return response.data
                    },
                    () => {
                        console.log('ERROR in GET /current-user')
                    }
                );
        };

        getUser();
    }, [auth, axiosAuthed, setUser]);


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        setAuth({});
        setUser({});
        localStorage.removeItem('refreshToken')
        navigate('/login');
    }

    let initials = null
    if (user) {
        initials = (user.firstName?.substring(0, 1) ?? '') + (user.lastName?.substring(0, 1) ?? '')
    }

    return (
        <React.Fragment>
            <Tooltip title="Account menu">
                <IconButton
                    onClick={ handleClick }
                    size="small"
                    sx={ { ml: 2 } }
                    aria-controls={ isOpen ? 'account-menu' : undefined }
                    aria-haspopup="true"
                    aria-expanded={ isOpen ? 'true' : undefined }
                >
                    <Avatar sx={ { width: 42, height: 42 } }>
                        { initials }
                    </Avatar>
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={ anchorEl }
                id="account-menu"
                open={ isOpen }
                onClose={ handleClose }
                onClick={ handleClose }

                // TODO refactor ?
                slotProps={ {
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        }
                    }
                } }
                transformOrigin={ { horizontal: 'right', vertical: 'top' } }
                anchorOrigin={ { horizontal: 'right', vertical: 'bottom' } }
            >
                <MenuItem onClick={ handleClose }>
                    <Avatar/>
                    { user?.firstName ?? 'Anonymous' } { user?.lastName ?? '' }
                </MenuItem>

                <Divider/>

                <MenuItem onClick={ handleClose }>
                    <ListItemIcon>
                        <Settings fontSize="small"/>
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem onClick={ handleLogout }>
                    <ListItemIcon>
                        <Logout fontSize="small"/>
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}
