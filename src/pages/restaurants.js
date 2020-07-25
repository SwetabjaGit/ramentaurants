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
  CircularProgress,
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
  /* progress: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    margin: 'auto',
    marginTop: 100,
    marginBottom: 100,
    padding: 5,
    zoom: 1.5
  }, */
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
  paginateBox: {
    textAlign: "center",
    marginTop: 50,
  },
}));

const Restaurants = props => {
  const {
    className, 
    staticContext,
    restaurants,
    topRestaurants,
    loading,
    nextHref,
    hasMoreItems
  } = props;
  const itemsPerPage = 8;
  const classes = useStyles();
  const sortRef = useRef(null);
  const searchRef = useRef(null);
  const [filter, setFilter] = useState('');
  const [openSort, setOpenSort] = useState(false);
  const [selectedSort, setSelectedSort] = useState('All');
  const [mode, setMode] = useState('grid');
  const [pricingModalOpen, setPricingModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [errors, setErrors] = useState({});
  //let pageCount = restaurants !== null ? Math.ceil(restaurants.length / itemsPerPage) : 0;

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

  /* useEffect(() => {
    props.listTopRestaurants();
  }, [props.listTopRestaurants]); */

  useEffect(() => {
    console.log({ restaurants });
    console.log({ topRestaurants });
  }, [restaurants, topRestaurants]);


  const handleSortOpen = () => {
    setOpenSort(true);
  };

  const handleSortClose = () => {
    setOpenSort(false);
  };

  const handleSortSelect = value => {
    setSelectedSort(value);
    setOpenSort(false);
    props.listRestaurantsByCountry(value);
  };

  const handleModeChange = (event, value) => {
    setMode(value);
  };

  const handleSearchChange = (event) => {
    setFilter(event.target.value);
    props.filterRestaurantsByKeyword(event.target.value);
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


  let paginateBar = (
    <div className={classes.paginateBox}>
      <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={8}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
      />
    </div>
  );

  const loader = (
    <CircularProgress
      key={0}
      className={classes.progress}
      color="secondary" 
      style={{ color: '#D41' }} 
    />
  );

  const fetchMoreData = () => {
    let articlesUrl = `https://asia-east2-socialape-d8699.cloudfunctions.net/api/nytarticles?page_size=8`;
    if(nextHref) {
      articlesUrl = nextHref;
    }
    console.log('%c SCREAMS REFRESHED', 'color: green; font-weight: bold');
    props.fetchRestaurants(articlesUrl);
  };

  let fetchedArticles = loading && restaurants.length === 0 ? (
    <CardSkeleton/>
  ) : (
    <InfiniteScroll
      pageStart={0}
      loadMore={fetchMoreData}
      hasMore={hasMoreItems}
      loader={restaurants.length === 0
        ? <CardSkeleton key={0} />
        : loader
      }
    >
      <Grid
        container
        spacing={2}
      >
        {restaurants.map((restaurant, i) => (
          <Grid
            key={i}
            item
            xl={mode === 'grid' ? 3 : 12}
            lg={mode === 'grid' ? 4 : 12}
            md={mode === 'grid' ? 6 : 12}
            sm={12}
            xs={12}
          >
            <GridCard
              key={restaurant._id}
              restaurant={restaurant} 
            />
          </Grid>
        ))}
      </Grid>
    </InfiniteScroll>
  );


  /* let itemsGrid = (
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
  ); */


  return (
    <div className={clsx(classes.root, className)}>
      <div className={classes.header}>
        <Typography
          className={classes.title}
          variant="h1"
        >
          Showing {restaurants && restaurants.length} restaurants
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
            <SearchIcon 
              fontSize="large" 
              className={classes.searchIcon} 
            />
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
              <ViewModuleIcon fontSize="large" />
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
      
      <div className={classes.restaurantData}>
        {fetchedArticles}
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
  loading: PropTypes.bool,
  nextHref: PropTypes.string.isRequired,
  hasMoreItems: PropTypes.bool.isRequired,
  fetchRestaurants: PropTypes.func.isRequired,
  listTopRestaurants: PropTypes.func.isRequired,
  listRestaurantsByCountry: PropTypes.func.isRequired,
  filterRestaurantsByKeyword: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  restaurants: state.data.restaurants,
  topRestaurants: state.data.topRestaurants,
  loading: state.data.loading,
  nextHref: state.data.nextHref,
  hasMoreItems: state.data.hasMoreItems
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