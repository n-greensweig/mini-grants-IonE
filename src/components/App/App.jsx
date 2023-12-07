import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

// Temporaily removed Protected Routes
// import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import LandingPage from '../LandingPage/LandingPage';

// Page imports
import AdminAllGrantsData from '../AdminAllGrantsData/AdminAllGrantsData';
import AdminHomeView from '../AdminHomeView/AdminHomeView';
import AdminReviewersTable from '../AdminReviewersTable/AdminReviewersTable';
import GrantReviewForm from '../GrantReviewForm/GrantReviewForm';
import ReviewerForm from '../ReviewerForm/ReviewerForm';
import ReviewerHomePage from '../ReviewerHomePage/ReviewerHomePage';
import ScoredReviews from '../ScoredReviews/ScoredReviews';
import ScoredReviewDetails from '../ScoredReviewDetails/ScoredReviewDetails';
import ImportGoogleSheet from '../ImportGoogleSheet/importGoogleSheet';
import Departments from '../Departments/Departments';


import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user.userReducer);

  useEffect(() => {
    axios.get('/userInfoRoute')
    .then((response) => {
      dispatch({ type: 'SET_USER', payload: response.data });
      dispatch({ type: 'FETCH_CURRENT_CYCLE'});
    }).catch((error) => {
      console.error(error);
    })
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* Routes for our pages are here */}
          <Route exact path="/adminallgrantsdata" component={AdminAllGrantsData} />
          <Route exact path="/importSheet" component={ImportGoogleSheet} />
          <Route exact path="/adminhomeview" component={AdminHomeView} />
          <Route exact path="/adminreviewerstable" component={AdminReviewersTable} />
          <Route exact path="/grantreviewform" component={GrantReviewForm} />
          <Route exact path="/reviewerform" component={ReviewerForm} />
          <Route exact path="/reviewerhomepage" component={ReviewerHomePage} />
          <Route exact path="/scoredreviews" component={ScoredReviews} />
          <Route exact path="/scoredreviewdetails" component={ScoredReviewDetails} />
          <Route exact path="/home" component={LandingPage} />
          <Route exact path="/departments" component={Departments} />
          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
