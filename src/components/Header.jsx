import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { deleteCookie, getCookie, isTokenAlive } from '../utils/CommonUtils';
import { actionTypes } from '../utils/actionTypes';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme) => ({
  header: {
    height: 60,
    background: '#466783',
  },
  drawerPaper: {
    backgroundColor: '#466783',
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  menuItemStyle: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    paddingLeft: theme.spacing(1.5),
    position: 'relative',
    textTransform: 'uppercase',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#EEFAFE',
    letterSpacing: 0,
    textDecoration: 'none',

    '& :hover': {
      color: '#EEFAFE',
    },
  },
  listItemText: {
    '& span': {
      textTransform: 'uppercase',
      fontWeight: 'bold',
    },
    '& :hover': {
      color: '#EEFAFE',
    },
  },
  title: {
    fontWeight: 'bold',
    fontSize: '24px',
    color: '#EEFAFE',
    margin: 'auto 0',
  },
  logoutButton: {
    position: 'absolute',
    right: '8px',
    marginTop: '4px',
  },
}));

const Header = () => {
  const styles = useStyles();

  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    left: false,
  });

  useEffect(() => {
    let token = getCookie('lrToken');

    if (token === '' || !isTokenAlive(token)) {
      deleteCookie('lrToken');
      deleteCookie('lrRefreshToken');
      dispatch({
        type: actionTypes.ROUTE_TO_PATH,
        payload: {
          path: '/',
        },
      });
    }
  }, []);

  const handleLogout = () => {
    dispatch({
      type: actionTypes.INITIATE_LOGOUT,
    });
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const onHomeClick = () => {
    dispatch({
      type: actionTypes.SET_ZONE_AND_SITE_NAME,
      payload: {
        zoneName: '',
        siteName: '',
      },
    });
    dispatch({
      type: actionTypes.SET_ACTIVE_FLAG,
      payload: {
        isActive: false,
        isOwner: false,
        siteId: '',
        siteName: '',
      },
    });
  };

  const menuList = (anchor) => (
    <div
      className={clsx(styles.list, {
        [styles.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List component="nav">
        <ListItemLink key={'Home'} primary={'Home'} to={'/slotBooking'} onClick={onHomeClick} />
        <ListItemLink key={'MachineryManagement'} primary={'Machinery Management'} to={'/machinery'} />
        {/*<ListItemLink key={'InventoryManagement'} primary={'Inventory Management'} to={'/inventory'} />*/}
      </List>
    </div>
  );

  const ListItemLink = (props) => {
    const { primary, to, onClick } = props;

    const renderLink = React.useMemo(() => React.forwardRef((linkProps, ref) => <Link ref={ref} to={to} {...linkProps} />), [to]);

    return (
      <>
        <ListItem button component={renderLink} className={styles.menuItemStyle} dense>
          <ListItemText className={styles.listItemText} primary={primary} onClick={onClick} />
        </ListItem>
      </>
    );
  };

  return (
    <div>
      {window.location.pathname !== '/' && (
        <header className="container-fluid">
          <div className={`row ${styles.header}`}>
            {['left'].map((anchor) => (
              <React.Fragment key={anchor}>
                <Button className={'menu-button'} onClick={toggleDrawer(anchor, true)}>
                  <MenuIcon style={{ color: '#fff' }} />
                </Button>
                <Drawer classes={{ paper: styles.drawerPaper }} anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                  {menuList(anchor)}
                </Drawer>
              </React.Fragment>
            ))}
            <Typography variant={'h5'} component={'div'} className={styles.title}>
              Last Respects
            </Typography>
            <IconButton className={styles.logoutButton} aria-label="Logout" color="primary" onClick={handleLogout}>
              <ExitToAppIcon style={{ color: '#fff' }} />
            </IconButton>
          </div>
        </header>
      )}
    </div>
  );
};

export default Header;
