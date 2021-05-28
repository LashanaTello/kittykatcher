import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editBio } from '../store/actions/authActions';
import { getUserPosts } from '../store/actions/postActions';
import M from 'materialize-css';

const defaultCatPic = "https://kittykatcher.s3.amazonaws.com/default_kitty.svg";

var allOfMyPosts = [];

class Dashboard extends Component {
  state = {
    bio: "",
    origBio: "",
    isBioDisabled: true,
    editIconName: "edit",
    thisUsersPosts: [],
    justMounted: true,
    displayingAllPosts: false
  }

  componentDidMount() {
    const { user } = this.props.auth;

    this.props.getUserPosts(user.username);

    M.Tabs.init(this.Tabs);
    M.Dropdown.init(this.Dropdown);

    this.setState({
      origBio: user.bio ? user.bio : "",
      bio: user.bio,
      justMounted: false
    })
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props.auth;

    if (!this.state.displayingAllPosts && !this.props.posts.allOfAUsersPostsLoading && !this.state.justMounted) {
      allOfMyPosts = this.props.posts.allOfAUsersPosts;
      this.setState({
        displayingAllPosts: true
      });
    }

    if (prevProps.auth.user.bio !== user.bio) {
      this.setState({
        bio: user.bio,
        origBio: user.bio
      });
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  toggleEditBio = () => {
    const { user } = this.props.auth;

    if (this.state.editIconName === "edit") {
      this.setState({
        editIconName: "done"
      });
    } else {
      const userData = {
        username: user.username,
        bio: this.state.bio
      };
      this.props.editBio(userData);

      this.setState({
        editIconName: "edit"
      });
    }

    this.setState({
      isBioDisabled: !this.state.isBioDisabled
    });
  }

  cancelClicked = () => {
    if (this.state.editIconName === "edit") {
      this.setState({
        editIconName: "done"
      });
    } else {
      this.setState({
        editIconName: "edit"
      });
    }
    this.setState({
      isBioDisabled: !this.state.isBioDisabled
    });
    this.setState({
      bio: this.state.origBio
    });
  }

  render() {
    const { user } = this.props.auth;
    const example = ["thing 1", "thing 2", "thing 3", "thing 4", "thing 5", "thing 6"];
    if (this.props.posts.allOfAUsersPosts !== undefined) {
      console.log(allOfMyPosts);
    }

    return (
      <div style={{ height: "75vh" }} className="container">
        <div className="row">
          <div className="col s12">
            <p></p>
          </div>
          <div className="col s12 center-align">
            <div className="dashboard-avatar col s4">
              <img src={user.avatar} alt="User avatar"/>
            </div>
            <div className="col s8">
              <div>
                <div className="col s5 left-align">
                  <h4>
                    Welcome, <b>{user.username}</b>!
                  </h4>
                </div>
                <div className="col s1 offset-s3 right-align">
                  {
                    !this.state.isBioDisabled && <button className="red btn" onClick={this.cancelClicked}><i className="material-icons icon-size">cancel</i></button>
                  }
                </div>
                <div className="col s1">
                  <button className="btn" onClick={this.toggleEditBio}><i className="material-icons icon-size">{this.state.editIconName}</i></button>
                </div>
                <div className="col s1 right-align">
                  <button className="btn"><i className="material-icons icon-size">chat</i></button>
                </div>
                <div className="col s1 right-align">
                  <button className="btn"><i className="material-icons icon-size">settings</i></button>
                </div>
              </div>
              <div className="input-field bio-text col s12">
                <textarea
                  name="bio"
                  id="bio"
                  className="bio-size"
                  maxLength="450"
                  placeholder={(user.bio !== '') ? user.bio : "Add a bio!"}
                  value={this.state.bio}
                  disabled={this.state.isBioDisabled}
                  onChange={this.handleChange}
                ></textarea>
              </div>
              <div className="col s12">
                <p></p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="add-spacing col s12">
            <ul ref={Tabs => { this.Tabs = Tabs; }} className="tabs">
              <li key={"a"} className="tab col s4"><a href="#test1">Your Posts</a></li>
              <li key={"b"} className="tab col s4"><a href="#test2">Claimed Posts</a></li>
              <li key={"c"} className="tab col s4"><a href="#test3">Favorited Posts</a></li>
            </ul>
          </div>
          <div className="col s4">
            <button ref={Dropdown => { this.Dropdown = Dropdown; }} className='dropdown-trigger btn' data-target='dropdown1'>Sort By</button>

            <ul id='dropdown1' className='dropdown-content'>
             <li key={"1"}><a href="#!">Date (New to Old)</a></li>
             <li key={"2"}><a href="#!">Date (Old to New)</a></li>
             <li key={"3"}><a href="#!">Title (A-Z)</a></li>
             <li key={"4"}><a href="#!">Title (Z-A)</a></li>
             <li key={"5"}><a href="#!">Status</a></li>
            </ul>
          </div>
          <div id="test1" className="add-spacing col s12 center-align">
            {allOfMyPosts.map((post,key) => {
              return (
                <a href="#">
                  <div key={post.datePosted} className="col s12 m4">
                    <div className="card blue-grey dashboard-card">
                      <div className="card-content white-text">
                        <div className="row">
                          <div className="col s12 offset-s4 top-right-corner">New York City, NY</div>
                          <div className="card-title">{post.title}</div>
                          <div className="col s12"></div>
                          <div className="details">
                            <ul className="left-align">
                              <li>Age:</li>
                              <li className="indent">{post.age}</li>
                              <li>Sex:</li>
                              <li className="indent">{post.sex}</li>
                              <li>Fur Color:</li>
                              <li className="indent">{post.furColors}</li>
                              <li>Fur Pattern:</li>
                              <li className="indent">{post.furPattern}</li>
                              <li>Friendliness:</li>
                              <li className="indent">{post.friendly}</li>
                              <li>Other Info:</li>
                              <li className="indent">{post.otherInfo ? post.otherInfo : "No extra details provided"}</li>
                            </ul>
                          </div>
                          <div className="col s12 offset-s4 bottom-half">{new Date(post.dateOfLastStatusChange).toDateString()}</div>
                          <div className="col s6 pull-s1">{new Date(post.datePosted).toDateString()}</div>
                          <div className="col s6 push-s1">{post.status}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
          <div id="test2" className="add-spacing col s12 center-align">Test 2</div>
          <div id="test3" className="add-spacing col s12 center-align">Test 3</div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getUserPosts: PropTypes.func.isRequired,
  editBio: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  posts: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  posts: state.posts
});

export default connect(mapStateToProps, { getUserPosts, editBio })(withRouter(Dashboard));
