import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

// Temporaily removed Protected Routes
// import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
// Temporaily removed Protected Routes
// import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';

// Page imports
import AdminAllGrantsData from '../AdminAllGrantsData/AdminAllGrantsData';
import AdminHomeView from '../AdminHomeView/AdminHomeView';
import AdminReviewersTable from '../AdminReviewersTable/AdminReviewersTable';
import GrantReviewForm from '../GrantReviewForm/GrantReviewFrom';
import ReviewerForm from '../ReviewerForm/ReviewerFrom';
import ReviewerHomePage from '../ReviewerHomePage/ReviewerHomePage';

import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/about" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* Routes for our pages are here */}
          <Route exact path="/adminallgrantsdata">
            <AdminAllGrantsData />
          </Route>

          <Route exact path="/adminhomeview">
            <AdminHomeView />
          </Route>

          <Route exact path="/adminreviewerstable">
            <AdminReviewersTable />
          </Route>

          <Route exact path="/grantreviewform">
            <GrantReviewForm />
          </Route>

          <ProtectedRoute exact path="/reviewerfrom">
            <ReviewerForm />
          </ProtectedRoute>

          <ProtectedRoute exact path="/reviewerhomepage">
            <ReviewerHomePage />
          </ProtectedRoute>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route exact path="/reviewerfrom">
            <ReviewerForm />
          </Route>

          <Route exact path="/reviewerhomepage">
            <ReviewerHomePage />
          </Route>

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
