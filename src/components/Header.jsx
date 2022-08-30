// const MyDrawer = ({ open, toggleDrawer }) => {
//   return (
//       <Drawer
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           '& .MuiDrawer-paper': {
//             width: drawerWidth,
//             boxSizing: 'border-box',
//           },
//         }}
//         variant="persistent"
//         anchor="left"
//         open={open}
//       >
//       <Toolbar
//         sx={{
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'flex-end',
//           px: [1]
//         }}
//       >
//         <IconButton onClick={toggleDrawer}>
//           <ChevronLeft />
//         </IconButton>
//         {/* <Link
//           onClick={toggleDrawer}
//           style={{ padding: 10 }}
//           underline="none"
//           variant="button"
//           color="textPrimary"
//           component={NavLink}
//           to="/about" >
//         </Link> */}
//       </Toolbar>
//       <Divider />
//     </Drawer>
//   );
// }

// const Header = () => {
//   const [open, setOpen] = useState(false);
//   const toggleDrawer = () => {
//     setOpen((old) => !old)
//   }

//   return (
//     <AppBar position="absolute" minWidth="30%" color="primary" enableColorOnDark>
//       <Toolbar sx={{ pr: '24px' }}>
//         <IconButton
//           edge="start"
//           color="inherit"
//           aria-label="open drawer"
//           onClick={toggleDrawer}
//           sx={{
//             marginRight: '36px',
//             ...(open && { display: 'none' }),
//           }}
//         >
//           <Menu />
//         </IconButton>
//         <Typography
//           component="h1"
//           variant="h6"
//           color="inherit"
//           noWrap
//           sx={{ flexGrow: 1 }}
//         >
//           Lazarillo Admin
//         </Typography>
//       </Toolbar>
//       {open ? <MyDrawer open={open} toggleDrawer={toggleDrawer} /> : <></>}
//     </AppBar>
//   );
// }

// export default Header;

import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import InfoIcon from '@mui/icons-material/Info';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
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
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
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

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  // List of pages that can be navigated in the web
  const pagesList = [
    {
      name: 'Robots',
      icon: <SmartToyIcon />,
      path: "/"
    },
    {
      name: 'About',
      icon: <InfoIcon />,
      path: "/about"
    }
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" enableColorOnDark open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" noWrap component="div">
            Lazarillo Admin
          </Typography>
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
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {pagesList.map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton onClick={() => handleNavigate(item.path)}>
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}
