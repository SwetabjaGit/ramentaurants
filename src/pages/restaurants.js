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
  LinearProgress,
  colors
} from '@material-ui/core';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import InfiniteScroll from 'react-infinite-scroller';
import ReactPaginate from 'react-paginate';
import SearchIcon from '@material-ui/icons/Search';
import StarsIcon from '@material-ui/icons/Stars';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

// Redux Stuff
import { connect } from 'react-redux';
import { 
  fetchRestaurants,
  listTopRestaurants,
  listRestaurantsByCountry,
  filterRestaurantsByKeyword
} from '../redux/actions/dataActions';

// Components
import GridCard from '../components/GridCard';
import Header from '../components/Header';
import PricingModal from '../components/PricingModal';
import CardSkeleton from '../components/CardSkeleton';



const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    margin: '0 auto',
    paddingBottom: 100,
    backgroundColor: '#F4F6F8'
  },
  search: {
    backgroundColor: '#FFF',
    minWidth: 200,
    borderRadius: 4,
    flexBasis: 300,
    height: 50,
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
    marginTop: 100,
    marginBottom: 100,
    padding: 5,
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
  paginateBox: {
    textAlign: "center",
    marginTop: 50,
  },
}));

const Restaurants = props => {
  const {
    className, 
    staticContext,
    fetchRestaurants,
    listTopRestaurants,
    listRestaurantsByCountry,
    filterRestaurantsByKeyword,
    data,
    UI: { loading },
    ...rest 
  } = props;

  const itemsPerPage = 8;
  const classes = useStyles();
  const sortRef = useRef(null);
  const searchRef = useRef(null);
  const [filter, setFilter] = useState('');
  const [openSort, setOpenSort] = useState(false);
  const [selectedSort, setSelectedSort] = useState('All');
  const [mode, setMode] = useState('grid');
  const [topRestaurants, setTopRestaurants] = useState([]);
  const [pricingModalOpen, setPricingModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [restaurants, setRestaurants] = useState([]);
  const [errors, setErrors] = useState({});
  //const [openSearchPopover, setOpenSearchPopover] = useState(false);
  //const [hasMoreItems, setHasMoreItems] = useState(true);
  //const [nextHref, setNextHref] = useState(null);

  const sortOptions = [
    'All',
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

  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  useEffect(() => {
    listTopRestaurants()
  }, [listTopRestaurants]);

  useEffect(() => {
    setRestaurants(data.filteredRestaurants);
    console.log(data.filteredRestaurants);
  }, [data.filteredRestaurants]);

  useEffect(() => {
    setTopRestaurants(data.topRestaurants);
  }, [data.topRestaurants]);

  useEffect(() => {
    if(props.UI.errors){
      setErrors(props.UI.errors);
    }
  }, [props.UI.errors]);



  const handleSortOpen = () => {
    setOpenSort(true);
  };

  const handleSortClose = () => {
    setOpenSort(false);
  };

  const handleSortSelect = value => {
    setSelectedSort(value);
    setOpenSort(false);
    listRestaurantsByCountry(value);
  };

  const handleModeChange = (event, value) => {
    setMode(value);
  };

  const handleSearchChange = (event) => {
    setFilter(event.target.value);
    filterRestaurantsByKeyword(event.target.value);
  };

  const handlePricingOpen = () => {
    setPricingModalOpen(true);
  };

  const handlePricingClose = () => {
    setPricingModalOpen(false);
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  //const loader = <LinearProgress className={classes.progress} color="secondary" style={{ backgroundColor: '#D41' }} />
  let pageCount = data.filteredRestaurants !== null ? Math.ceil(data.filteredRestaurants.length / itemsPerPage) : 0;


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
          Showing {data.filteredRestaurants && data.filteredRestaurants.length} restaurants
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
              value={filter}
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
        
        <Grid
          container
          spacing={2}
        >
          {data.filteredRestaurants ? (
            data.filteredRestaurants
            .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
              .map((restaurant, i) => (
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
              ))
          ) : (
            <CardSkeleton />
          )}
        </Grid>
        {/* <InfiniteScroll
          pageStart={0}
          loadMore={fetchMoreData}
          hasMore={hasMoreItems}
          loader={loader}
        >
        </InfiniteScroll> */}
        <div className={classes.paginateBox}>
          <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
          />
        </div>
      </div>

      <PricingModal
        topRestaurants={topRestaurants}
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
  className: PropTypes.string,
  fetchRestaurants: PropTypes.func.isRequired,
  listTopRestaurants: PropTypes.func.isRequired,
  listRestaurantsByCountry: PropTypes.func.isRequired,
  filterRestaurantsByKeyword: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data,
  UI: state.UI
});

const mapActionsToProps = {
  fetchRestaurants,
  listTopRestaurants,
  listRestaurantsByCountry,
  filterRestaurantsByKeyword
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Restaurants);