import React, { Component } from 'react';


class KittyPostForm extends Component {

	render() {
		return (
			<div className="container">
				<h4 className="center">Kitty Post</h4>
				<form>
					<div className="row">
            <div className="row">
              <div className="input-field col s12">
                <label htmlFor="postTitle">Title (Or Name of Cat):</label>
                <input type="text" id="postTitle" />
              </div>
            </div>
            <div className="row">
              <div className="col s12 m6">
              	<p>Sex:</p>                                    	
                <p>
      		        <label>
      		        	<input type="radio" name="sex" value="female" /> 
      		        	<span>Female</span>
      		        </label>
                </p>
      		      <p>
        	        <label>
        	        	<input type="radio" name="sex" value="male" /> 
        	        	<span>Male</span>
        	        </label>
        		    </p>
              </div>
              <div className="col s12 m6">
                <p>Fur Color:</p>                                    	
                <p>
      		        <label>
      		        	<input type="checkbox" name="furColor" value="black" /> 
      		        	<span>Black</span>
      		        </label>
        		    </p>
        		    <p>
      		        <label>
      		        	<input type="checkbox" name="furColor" value="white" /> 
      		        	<span>White</span>
      		        </label>
        		    </p>
        		    <p>
      		        <label>
      		        	<input type="checkbox" name="furColor" value="ginger" /> 
      		        	<span>Ginger</span>
      		        </label>
        		    </p>
        		    <p>
      		        <label>
      		        	<input type="checkbox" name="furColor" value="brown" /> 
      		        	<span>Brown</span>
      		        </label>
        		    </p>
        		    <p>
      		        <label>
      		        	<input type="checkbox" name="furColor" value="gray" /> 
      		        	<span>Gray</span>
      		        </label>
        		    </p>
        		    <p>
      		        <label>
      		        	<input type="checkbox" name="furColor" value="hairless" /> 
      		        	<span>Hairless</span>
      		        </label>
      		      </p>
              </div>
            </div>
            <div className="row">
              <div className="col s12 m6">
                <p>Fur Pattern:</p>                                    	
                <p>
      		        <label>
      		        	<input type="radio" name="furPattern" value="solid" /> 
      		        	<span>Solid</span>
      		        </label>
  		          </p>
        		    <p>
      		        <label>
      		        	<input type="radio" name="furPattern" value="tabby-striped" /> 
      		        	<span>Tabby-Striped</span>
      		        </label>
        		    </p>
        		    <p>
      		        <label>
      		        	<input type="radio" name="furPattern" value="tabby-spotted" /> 
      		        	<span>Tabby-Spotted</span>
      		        </label>
        		    </p>
        		    <p>
      		        <label>
      		        	<input type="radio" name="furPattern" value="tabby-blotched" /> 
      		        	<span>Tabby-Blotched</span>
      		        </label>
        		    </p>
        		    <p>
      		        <label>
      		        	<input type="radio" name="furPattern" value="tabby-ticked" /> 
      		        	<span>Tabby-Ticked</span>
      		        </label>
        		    </p>
        		    <p>
      		        <label>
      		        	<input type="radio" name="furPattern" value="bicolor" /> 
      		        	<span>Bicolor</span>
      		        </label>
        		    </p>
        		    <p>
      		        <label>
      		        	<input type="radio" name="furPattern" value="tricolor" /> 
      		        	<span>Tricolor</span>
      		        </label>
        		    </p>
        		    <p>
      		        <label>
      		        	<input type="radio" name="furPattern" value="tortoiseshell" /> 
      		        	<span>Tortoiseshell</span>
      		        </label>
        		    </p>
        		    <p>
      		        <label>
      		        	<input type="radio" name="furPattern" value="colorpoint" /> 
      		        	<span>Colorpoint</span>
      		        </label>
        		    </p>
        		    <p>
      		        <label>
      		        	<input type="radio" name="furPattern" value="hairless" /> 
      		        	<span>Hairless</span>
      		        </label>
        		    </p>
              </div>
              <div className="col s12 m6">
                <p>Is the cat friendly?:</p>                                    	
                <p>
        	        <label>
        	        	<input type="radio" name="friendly" value="friendly" /> 
        	        	<span>Friendly (likes hoomans)</span>
        	        </label>
                </p>
        		    <p>
      		        <label>
      		        	<input type="radio" name="friendly" value="somewhatFriendly" /> 
      		        	<span>Somewhat Friendly</span>
      		        </label>
        		    </p>
        		    <p>
      		        <label>
      		        	<input type="radio" name="friendly" value="feral" /> 
      		        	<span>Feral (hoomans scare me)</span>
      		        </label>
        		    </p>
              </div>
            </div>
            <div className="row">
              <div className="center col s12">
                <p>Other Info (where the cat likes to be, what time of day do you see them the most, what food do they like to eat, etc...):</p>
                <textarea name="details" rows="30" cols="30" placeholder="Likes chicken more than fish. Always near garbage at local diner around 6pm."></textarea>
              </div>
            </div>
            <div className="row">
              <div className="center col s12">
              	<p>Upload any pictures of the cat:</p>
                <input type="file" name="pics" accept="image/*" /> 
              </div>
            </div>
            <div className="row">
              <div className="center col s12">
                <button>Post</button>
              </div>
            </div>
          </div>
        </form>
			</div>
		);
	}
}

export default KittyPostForm;