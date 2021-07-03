import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editBio, getMyBio } from '../store/actions/authActions';
import { getUserPosts } from '../store/actions/postActions';
import M from 'materialize-css';
import ImageSlider from "./ImageSlider";


class Dashboard extends Component {
  state = {
    bio: "",
    origBio: "",
    isBioDisabled: true,
    editIconName: "edit",
    thisUsersPosts: [],
    justMounted: true,
    displayingAllPosts: false,
    cardsToShow: 6,
    expanded: false
  }

  componentDidMount() {
    const { user } = this.props.auth;

    this.props.getUserPosts(user.username);
    this.props.getMyBio(user.username);

    M.Tabs.init(this.Tabs);
    M.Dropdown.init(this.Dropdown);

    this.setState({
      origBio: this.props.auth.bio ? this.props.auth.bio : "",
      bio: this.props.auth.bio,
      justMounted: false
    })
  }

  componentDidUpdate(prevProps) {
    if (!this.state.displayingAllPosts && !this.props.posts.allOfAUsersPostsLoading && !this.state.justMounted) {
      this.setState({
        displayingAllPosts: true,
        thisUsersPosts: this.props.posts.allOfAUsersPosts
      });
    }

    if (prevProps.auth.bio !== this.props.auth.bio) {
      this.setState({
        bio: this.props.auth.bio,
        origBio: this.props.auth.bio
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

  showMore = () => {
    if (this.state.cardsToShow < this.state.thisUsersPosts.length) {
      this.setState({
        cardsToShow: this.state.cardsToShow + 3
      })
    }
    if (this.state.cardsToShow >= this.state.thisUsersPosts.length) {
      this.setState({
        expanded: true
      })
    }
  }

  sortTitleAscending = () => {
    var posts = this.state.thisUsersPosts;
    posts.sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
    this.setState({
      thisUsersPosts: posts
    })
  }

  sortTitleDescending = () => {
    var posts = this.state.thisUsersPosts;
    posts.sort((a, b) => (b.title > a.title) ? 1 : ((a.title > b.title) ? -1 : 0))
    this.setState({
      thisUsersPosts: posts
    })
  }

  sortDateOldToNew = () => {
    var posts = this.state.thisUsersPosts;
    posts.sort((a, b) => (a.datePosted > b.datePosted) ? 1 : ((b.datePosted > a.datePosted) ? -1 : 0))
    this.setState({
      thisUsersPosts: posts
    })
  }

  sortDateNewToOld = () => {
    var posts = this.state.thisUsersPosts;
    posts.sort((a, b) => (b.datePosted > a.datePosted) ? 1 : ((a.datePosted > b.datePosted) ? -1 : 0))
    this.setState({
      thisUsersPosts: posts
    })
  }

  render() {
    const { user } = this.props.auth;
    console.log(this.props.auth);
    console.log(this.state.thisUsersPosts)

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
                  <Link to="/settings"><button className="btn"><i className="material-icons icon-size">settings</i></button></Link>
                </div>
              </div>
              <div className="bio-text col s12">
                <textarea
                  name="bio"
                  id="bio"
                  className="bio-size"
                  maxLength="450"
                  placeholder={(this.props.auth.bio !== '') ? this.props.auth.bio : "Add a bio!"}
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
              <li key={"a"} className="tab col s4"><a href="#my-posts">Your Posts</a></li>
              <li key={"b"} className="tab col s4"><a href="#claimed-posts">Claimed Posts</a></li>
              <li key={"c"} className="tab col s4"><a href="#favorite-posts">Favorited Posts</a></li>
            </ul>
          </div>
          <div className="" style={{"padding": "0 1.5rem"}}>
            <button ref={Dropdown => { this.Dropdown = Dropdown; }} className='dropdown-trigger btn col s2' data-target='dropdown1'>Sort By</button>

            <ul id='dropdown1' className='dropdown-content'>
             <li key={"1"} className="my-dropdown-list" onClick={this.sortDateNewToOld}>Date Posted (New to Old)</li>
             <li key={"2"} className="my-dropdown-list" onClick={this.sortDateOldToNew}>Date Posted (Old to New)</li>
             <li key={"3"} className="my-dropdown-list" onClick={this.sortTitleAscending}>Title (A-Z)</li>
             <li key={"4"} className="my-dropdown-list" onClick={this.sortTitleDescending}>Title (Z-A)</li>
            </ul>
          </div>
          <div id="my-posts" className="add-spacing col s12 center-align">
            {
              this.state.thisUsersPosts.length === 0 ? (
                <div className="col s12 center-align">
                  You haven't made any posts
                </div>
              ) : (
                this.state.thisUsersPosts.slice(0, this.state.cardsToShow).map((post,key) => {
                  return (
                    <div key={post.datePosted} className="col s12 m4">
                      <div className="card blue-grey dashboard-card" style={{"height": "61vh"}}>
                        <div className="card-content white-text">
                          <div className="row">
                            <div className="col s12 offset-s4 top-right-corner">New York City, NY</div>
                            <div className="card-title">{post.title}</div>
                            <div className="col s12" style={{"height": "14.86vh"}}>
                              <ImageSlider images={post.pics} />
                            </div>
                            <div className="details">
                              <div>
                                <ul className="col s4 left-align">
                                  <li className="">Age:</li>
                                  <li className="indent">{post.age}</li>
                                </ul>
                                <ul className="col s4 left-align">
                                  <li className="">Sex:</li>
                                  <li className="indent">{post.sex}</li>
                                </ul>
                                <ul className="col s4 left-align">
                                  <li className="">Friendly?:</li>
                                  <li className="indent">{post.friendly}</li>
                                </ul>
                              </div>
                              <div className="col s12">
                                <ul className="col s6 left-align">
                                  <li className="">Fur Color:</li>
                                  <li className="indent">{post.furColors.join(", ")}</li>
                                </ul>
                                <ul className="col s6 left-align">
                                  <li className="">Fur Pattern:</li>
                                  <li className="indent">{post.furPattern}</li>
                                </ul>
                              </div>
                              <ul className="col s12 left-align">
                                <li className="">Other Info:</li>
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
                  );
                })
              )
            }
            {
              this.state.thisUsersPosts.length !== 0 && (
              this.state.expanded ? (
                <div className="row">
                  <div className="col s12">
                    <button className="btn col s12 m4 offset-m4 disabled">Showing All Posts</button>
                  </div>
                </div>
              ) : (
                <div className="row">
                  <div className="col s12">
                    <button className="btn col s12 m4 offset-m4" onClick={this.showMore}>Show More</button>
                  </div>
                </div>
              ))
            }
          </div>
          <div id="claimed-posts" className="add-spacing col s12 center-align">No posts claimed</div>
          <div id="favorite-posts" className="add-spacing col s12 center-align">No posts favorited</div>
        </div>
      </div>
    );
  }
}
/*
<div className="details">
  <ul className="col s12 left-align">
    <li className="">Age:</li>
    <li className="indent">{post.age}</li>
    <li className="">Sex:</li>
    <li className="indent">{post.sex}</li>
    <li className="">Fur Color:</li>
    <li className="indent">{post.furColors.join(", ")}</li>
    <li className="">Fur Pattern:</li>
    <li className="indent">{post.furPattern}</li>
    <li className="">Friendliness:</li>
    <li className="indent">{post.friendly}</li>
    <li className="">Other Info:</li>
    <li className="indent">{post.otherInfo ? post.otherInfo : "No extra details provided"}</li>
  </ul>
</div>


<div className="details">
  <ul className="col s6 left-align">
    <li className="">Age:</li>
    <li className="indent">{post.age}</li>
    <li className="">Sex:</li>
    <li className="indent">{post.sex}</li>
  </ul>
  <ul className="col s6 left-align">
    <li className="">Fur Color:</li>
    <li className="indent">{post.furColors.join(", ")}</li>
    <li className="">Fur Pattern:</li>
    <li className="indent">{post.furPattern}</li>
  </ul>
  <p className="col s12"></p>
  <ul className="col s12 left-align">
    <li className="">Friendliness:</li>
    <li className="indent">{post.friendly}</li>
    <li className="">Other Info:</li>
    <li className="indent">{post.otherInfo ? post.otherInfo : "No extra details provided"}</li>
  </ul>
</div>
*/

Dashboard.propTypes = {
  getUserPosts: PropTypes.func.isRequired,
  editBio: PropTypes.func.isRequired,
  getMyBio: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  posts: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  posts: state.posts
});

export default connect(mapStateToProps, { getUserPosts, editBio, getMyBio })(withRouter(Dashboard));
