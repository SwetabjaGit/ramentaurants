import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  Grid,
  Menu,
  MenuItem,
  ListItemText,
  Typography,
  Input,
  Popper,
  ClickAwayListener,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  colors
} from '@material-ui/core';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import CircularProgress from '@material-ui/core/CircularProgress';
import SearchIcon from '@material-ui/icons/Search';
import StarsIcon from '@material-ui/icons/Stars';

// Components
//import { Paginate } from 'components';
import GridCard from '../components/GridCard';
import Header from '../components/Header';
import PricingModal from '../components/PricingModal';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    margin: '0 auto',
    paddingBottom: 10,
    backgroundColor: '#F4F6F8'
  },
  search: {
    backgroundColor: '#FFF',
    minWidth: 200,
    borderRadius: 4,
    flexBasis: 300,
    height: 18,
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  searchIcon: {
    color: 'inherit'
  },
  searchInput: {
    flexGrow: 1,
    color: 'inherit',
    '& input::placeholder': {
      opacity: 1,
      color: 'inherit'
    }
  },
  searchPopper: {
    zIndex: theme.zIndex.appBar + 100
  },
  searchPopperContent: {
    marginTop: theme.spacing(1)
  },
  header: {
    width: '70%',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    padding: theme.spacing(4, 0, 4, 0)
  },
  restaurantData: {
    width: '70%',
    margin: '0 auto',
  },
  title: {
    position: 'relative',
    fontWeight: 'bold',
    '&:after': {
      position: 'absolute',
      bottom: -8,
      left: 0,
      content: '" "',
      height: 3,
      width: 80,
      backgroundColor: theme.palette.primary.main
    }
  },
  actions: {
    display: 'flex',
    alignItems: 'center'
  },
  sortButton: {
    backgroundColor: '#FFF',
    textTransform: 'none',
    letterSpacing: 0,
    width: 150,
    height: 50,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  paginate: {
    marginTop: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center'
  },
  progress: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    margin: 'auto',
    marginTop: 20,
    marginBottom: 30,
    zoom: 1.5
  },
  trialButton: {
    marginLeft: theme.spacing(2),
    color: theme.palette.white,
    height: 48,
    backgroundColor: colors.green[600],
    '&:hover': {
      backgroundColor: colors.green[900]
    }
  },
  trialIcon: {
    marginRight: theme.spacing(1)
  },
}));

const Restaurants = props => {
  const { className, staticContext, ...rest } = props;

  const classes = useStyles();
  const sortRef = useRef(null);
  const searchRef = useRef(null);
  const [searchValue, setSearchValue] = useState('');
  const [openSearchPopover, setOpenSearchPopover] = useState(false);
  const [openSort, setOpenSort] = useState(false);
  const [selectedSort, setSelectedSort] = useState('Singapore');
  const [mode, setMode] = useState('grid');
  const [restaurants, setRestaurants] = useState([]);
  const [pricingModalOpen, setPricingModalOpen] = useState(false);
  //const [hasMoreItems, setHasMoreItems] = useState(true);
  //const [nextHref, setNextHref] = useState(null);

  const fetchUrl = 'http://starlord.hackerearth.com/TopRamen';
  const sortOptions = [
    'Myanmar',
    'Singapore',
    'SG',
    'Taiwan',
    'China',
    'Malaysia',
    'Thailand',
    'Japan',
    'South Korea',
    'USA',
    'Indonesia',
    'JPN',
    'Hong Kong'
  ];
  const popularSearches = [
    'Devias React Dashboard',
    'Devias',
    'Admin Pannel',
    'Project',
    'Pages'
  ];

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const fetchRestaurants = (source) => {
      axios.get(fetchUrl, { cancelToken: source.token })
        .then(res => {
          console.log(res.data);
          setRestaurants(res.data);
        })
        .catch(err => {
          console.error(err);
        });
    };

    fetchRestaurants(source);

    return () => {
      source.cancel();
    };
  }, []);

  const handleSortOpen = () => {
    setOpenSort(true);
  };

  const handleSortClose = () => {
    setOpenSort(false);
  };

  const handleSortSelect = value => {
    setSelectedSort(value);
    setOpenSort(false);
  };

  const handleModeChange = (event, value) => {
    setMode(value);
  };

  const handleSearchChange = event => {
    setSearchValue(event.target.value);
    
    if (event.target.value) {
      if (!openSearchPopover) {
        setOpenSearchPopover(true);
      }
    } else {
      setOpenSearchPopover(false);
    }
  };

  const handleSearchPopverClose = () => {
    setOpenSearchPopover(false);
  };

  const handlePricingOpen = () => {
    setPricingModalOpen(true);
  };

  const handlePricingClose = () => {
    setPricingModalOpen(false);
  };

  const api = {
    baseUrl: 'https://api.soundcloud.com',
    user_id: '94957189',
    client_id: 'sttWEuQHjL9Wqu5vwNb0iNf52zXFtQvs',
    page_size: '12'
  };

  /* const fetchMoreData = () => {
    var url = api.baseUrl + 
      '/users/' + api.user_id + '/favorites' +
      '?client_id=' + api.client_id +
      '&linked_partitioning=1&page_size=' + api.page_size;
    
    if(nextHref){
      url = nextHref;
    }

    axios.get(url)
      .then(res => {
        if(res) {
          console.log(res.data.next_href);
          var restaurantss = restaurants;
          res.data.collection.map(track => {
            if(track.artwork_url == null) {
              track.artwork_url = track.user.avatar_url;
            }
            restaurantss.push(track);
            return track;
          });

          if(res.data.next_href) {
            setRestaurants(restaurantss);
            setNextHref(res.data.next_href);
          } else {
            setHasMoreItems(false);
          }
        }
      })
      .catch(err => {
        console.error(err);
      });
  }; */

  const loader = <CircularProgress className={classes.progress} color="secondary" style={{ color: '#D41' }} />

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Header
        title="RAMENTAURANTS"
        description="Top Ramen restaurants of the world"
      />

      <div className={classes.header}>
        <Typography
          className={classes.title}
          variant="h1"
        >
          Showing {restaurants.length} restaurants
        </Typography>

        <div className={classes.actions}>
          <div
            className={classes.search}
            ref={searchRef}
          >
            <Input
              className={classes.searchInput}
              disableUnderline
              onChange={handleSearchChange}
              placeholder="Search for Restaurants"
              value={searchValue}
            />
            <SearchIcon className={classes.searchIcon} />
          </div>
          <Button
            className={classes.trialButton}
            onClick={handlePricingOpen}
            variant="contained"
          >
            <StarsIcon className={classes.trialIcon} />
            TopRamens
          </Button>
          <Popper
            anchorEl={searchRef.current}
            className={classes.searchPopper}
            open={openSearchPopover}
            transition
          >
            <ClickAwayListener onClickAway={handleSearchPopverClose}>
              <Paper
                className={classes.searchPopperContent}
                elevation={3}
              >
                <List>
                  {popularSearches.map(search => (
                    <ListItem
                      button
                      key={search}
                      onClick={handleSearchPopverClose}
                    >
                      <ListItemIcon>
                        <SearchIcon />
                      </ListItemIcon>
                      <ListItemText primary={search} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </ClickAwayListener>
          </Popper>
          <Button
            className={classes.sortButton}
            onClick={handleSortOpen}
            ref={sortRef}
          >
            {selectedSort}
            <ArrowDropDownIcon />
          </Button>
          <ToggleButtonGroup
            exclusive
            onChange={handleModeChange}
            size="small"
            value={mode}
          >
            <ToggleButton value="grid">
              <ViewModuleIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>

      <div className={classes.restaurantData}>
        {/* <InfiniteScroll
          pageStart={0}
          loadMore={fetchMoreData}
          hasMore={hasMoreItems}
          loader={loader}
        > */}
          <Grid
            container
            spacing={2}
          >
            {restaurants.map((restaurant, i) => (
              <Grid
                item
                key={i}
                xl={mode === 'grid' ? 3 : 12}
                lg={mode === 'grid' ? 4 : 12}
                md={mode === 'grid' ? 6 : 12}
                sm={12}
                xs={12}
              >
                <GridCard restaurant={restaurant} />
              </Grid>
            ))}
          </Grid>
        {/* </InfiniteScroll> */}
      </div>

      <PricingModal
        onClose={handlePricingClose}
        open={pricingModalOpen}
      />
      <Menu
        anchorEl={sortRef.current}
        className={classes.menu}
        onClose={handleSortClose}
        open={openSort}
      >
        {sortOptions.map(
          option => (
            <MenuItem
              className={classes.menuItem}
              key={option}
              onClick={() => handleSortSelect(option)}
            >
              <ListItemText primary={option} />
            </MenuItem>
          )
        )}
      </Menu>
    </div>
  );
};

Restaurants.propTypes = {
  className: PropTypes.string
};

export default Restaurants;
