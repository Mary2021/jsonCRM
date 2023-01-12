import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import GroupIcon from '@mui/icons-material/Group';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';

const drawerWidth = 200;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  })
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const nop = () => { };

const DrawerItem = ({ Icon, text, href, onClick = nop } ) => {
  return <ListItem key={text} disablePadding>
    <ListItemButton onClick={onClick} >
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <a href={href}><ListItemText primary={text} /></a>
    </ListItemButton>
  </ListItem>
}

export default function PersistentDrawerLeft({ children }: { children: any }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  let buttonText = ''

   const handleCreate = (e) => {
    if (router.asPath == '/client') {
      e.preventDefault()
      router.push('/client/create')
    }
    if (router.asPath == '/service') {
      e.preventDefault()
      router.push('/service/create')
    }
    if (router.asPath == '/person') {
      e.preventDefault()
      router.push('/person/create')
    }
    if (router.asPath == '/invoice') {
      e.preventDefault()
      router.push('/invoice/create')
    }
    if (router.asPath == '/') {
      e.preventDefault()
      router.push('/client/create')
    }
  }

  const showButton = () => {
    if (router.asPath.includes('create') || (router.asPath.includes('edit'))) {
      return null
    }
    if (router.asPath === '/client' || '/') {
      buttonText = 'Lisa uus klient'
    }
    if (router.asPath == '/service') {
      buttonText = 'Lisa uus teenus'
    }
    if (router.asPath == '/person') {
      buttonText = 'Lisa uus isik'
    }
    if (router.asPath == '/invoice') {
      buttonText = 'Lisa uus arve'
    }
    return <Button flex-wrap='nowrap' variant="contained" color="primary" onClick={(e) => handleCreate(e)}>{buttonText}</Button>
  }

  return (
    <Box sx={{ display: 'flex' }} >
      <CssBaseline />
      <AppBar position="fixed" open={open} >
        <Toolbar style={{ backgroundColor: 'white' }} >
          <IconButton
            color="default"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <div style={{ "width": "80%" }}></div>
          {/* button rendered from Edit component */}
          <div id='btnContainer'></div>
          {showButton()}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} size="large">
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <DrawerItem Icon={GroupIcon} text="Kliendid" href="/client" />
          <DrawerItem Icon={MailIcon} text="Teenused" href="/service" />
        </List>
        <Divider />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
}