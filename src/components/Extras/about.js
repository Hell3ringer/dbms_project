import React, { Component } from 'react';
// import Topnav from '../dashboard/topnav'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
class about extends Component{
    dash(){
        var id = localStorage.getItem('loginID')
        var role = id[4]+id[9]
        if (role === "AH") {
            window.location.replace("/dashboard_admin")     
        }else if(role === "PH"){
            window.location.replace("/dashboard_prof")     
        }else if(id[6]+id[7]==="PS"){
            window.location.replace("/dashboard")   
        }
    }
    render(){
        return(
                <div className="entire_div_profile">
                {/* <Dashboard/> */}
                <div id="nav_id" className="topnav navbar nav-pills fixed-top navbar-dark bg-dark">          
                {/* <a href="/dashboard">Dashboard</a> */}
                <a onClick={this.dash}>Dashboard</a>
                <span className="navbar-text cfs-class" style={{marginLeft:"40%"}}>Course Feedback System CFS</span>
                <a href="/contact">Contact</a>
                <a href="/about">About</a>
                <a className="active" href="/" onClick={this.Logout}>Logout</a>
                </div>

                <div style={{marginLeft:"15%",marginRight:"15%",marginTop:"15%"}}>
                    {/* This site is for collecting feedbacks for the courses and professors individually and show them to the students to help them choose courses and professors. */}
                    <>
  <title>W3.CSS Template</title>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
  <link rel="stylesheet" href="https://www.w3schools.com/lib/w3-theme-black.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
  {/* Sidebar on click */}
  <nav className="w3-sidebar w3-bar-block w3-white w3-card w3-animate-left w3-xxlarge" style={{display: 'none', zIndex: 2}} id="mySidebar">
    <a href="javascript:void(0)" onclick="w3_close()" className="w3-bar-item w3-button w3-display-topright w3-text-teal">Close
      <i className="fa fa-remove" />
    </a>
    <a href="#" className="w3-bar-item w3-button">Link 1</a>
    <a href="#" className="w3-bar-item w3-button">Link 2</a>
    <a href="#" className="w3-bar-item w3-button">Link 3</a>
    <a href="#" className="w3-bar-item w3-button">Link 4</a>
    <a href="#" className="w3-bar-item w3-button">Link 5</a>
  </nav>
  {/* Navbar */}
  <div className="w3-top">
    <div className="w3-bar w3-theme-d2 w3-left-align">
      <a className="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right w3-hover-white w3-theme-d2" href="javascript:void(0);" onclick="openNav()"><i className="fa fa-bars" /></a>
      <a href="#" className="w3-bar-item w3-button w3-teal"><i className="fa fa-home w3-margin-right" />Logo</a>
      <a href="#team" className="w3-bar-item w3-button w3-hide-small w3-hover-white">Team</a>
      <a href="#work" className="w3-bar-item w3-button w3-hide-small w3-hover-white">Work</a>
      <a href="#pricing" className="w3-bar-item w3-button w3-hide-small w3-hover-white">Price</a>
      <a href="#contact" className="w3-bar-item w3-button w3-hide-small w3-hover-white">Contact</a>
      <div className="w3-dropdown-hover w3-hide-small">
        <button className="w3-button" title="Notifications">Dropdown <i className="fa fa-caret-down" /></button>     
        <div className="w3-dropdown-content w3-card-4 w3-bar-block">
          <a href="#" className="w3-bar-item w3-button">Link</a>
          <a href="#" className="w3-bar-item w3-button">Link</a>
          <a href="#" className="w3-bar-item w3-button">Link</a>
        </div>
      </div>
      <a href="#" className="w3-bar-item w3-button w3-hide-small w3-right w3-hover-teal" title="Search"><i className="fa fa-search" /></a>
    </div>
    {/* Navbar on small screens */}
    <div id="navDemo" className="w3-bar-block w3-theme-d2 w3-hide w3-hide-large w3-hide-medium">
      <a href="#team" className="w3-bar-item w3-button">Team</a>
      <a href="#work" className="w3-bar-item w3-button">Work</a>
      <a href="#pricing" className="w3-bar-item w3-button">Price</a>
      <a href="#contact" className="w3-bar-item w3-button">Contact</a>
      <a href="#" className="w3-bar-item w3-button">Search</a>
    </div>
  </div>
  {/* Image Header */}
  <div className="w3-display-container w3-animate-opacity">
    <img src="/w3images/sailboat.jpg" alt="boat" style={{width: '100%', minHeight: 350, maxHeight: 600}} />
    <div className="w3-container w3-display-bottomleft w3-margin-bottom">  
      <button onclick="document.getElementById('id01').style.display='block'" className="w3-button w3-xlarge w3-theme w3-hover-teal" title="Go To W3.CSS">LEARN W3.CSS</button>
    </div>
  </div>
  {/* Modal */}
  <div id="id01" className="w3-modal">
    <div className="w3-modal-content w3-card-4 w3-animate-top">
      <header className="w3-container w3-teal w3-display-container"> 
        <span onclick="document.getElementById('id01').style.display='none'" className="w3-button w3-teal w3-display-topright"><i className="fa fa-remove" /></span>
        <h4>Oh snap! We just showed you a modal..</h4>
        <h5>Because we can <i className="fa fa-smile-o" /></h5>
      </header>
      <div className="w3-container">
        <p>Cool huh? Ok, enough teasing around..</p>
        <p>Go to our <a className="w3-text-teal" href="/w3css/default.asp">W3.CSS Tutorial</a> to learn more!</p>
      </div>
      <footer className="w3-container w3-teal">
        <p>Modal footer</p>
      </footer>
    </div>
  </div>
  {/* Team Container */}
  <div className="w3-container w3-padding-64 w3-center" id="team">
    <h2>OUR TEAM</h2>
    <p>Meet the team - our office rats:</p>
    <div className="w3-row"><br />
      <div className="w3-quarter">
        <img src="/w3images/avatar.jpg" alt="Boss" style={{width: '45%'}} className="w3-circle w3-hover-opacity" />
        <h3>Johnny Walker</h3>
        <p>Web Designer</p>
      </div>
      <div className="w3-quarter">
        <img src="/w3images/avatar.jpg" alt="Boss" style={{width: '45%'}} className="w3-circle w3-hover-opacity" />
        <h3>Rebecca Flex</h3>
        <p>Support</p>
      </div>
      <div className="w3-quarter">
        <img src="/w3images/avatar.jpg" alt="Boss" style={{width: '45%'}} className="w3-circle w3-hover-opacity" />
        <h3>Jan Ringo</h3>
        <p>Boss man</p>
      </div>
      <div className="w3-quarter">
        <img src="/w3images/avatar.jpg" alt="Boss" style={{width: '45%'}} className="w3-circle w3-hover-opacity" />
        <h3>Kai Ringo</h3>
        <p>Fixer</p>
      </div>
    </div>
  </div>
  {/* Work Row */}
  <div className="w3-row-padding w3-padding-64 w3-theme-l1" id="work">
    <div className="w3-quarter">
      <h2>Our Work</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </div>
    <div className="w3-quarter">
      <div className="w3-card w3-white">
        <img src="/w3images/snow.jpg" alt="Snow" style={{width: '100%'}} />
        <div className="w3-container">
          <h3>Customer 1</h3>
          <h4>Trade</h4>
          <p>Blablabla</p>
          <p>Blablabla</p>
          <p>Blablabla</p>
          <p>Blablabla</p>
        </div>
      </div>
    </div>
    <div className="w3-quarter">
      <div className="w3-card w3-white">
        <img src="/w3images/lights.jpg" alt="Lights" style={{width: '100%'}} />
        <div className="w3-container">
          <h3>Customer 2</h3>
          <h4>Trade</h4>
          <p>Blablabla</p>
          <p>Blablabla</p>
          <p>Blablabla</p>
          <p>Blablabla</p>
        </div>
      </div>
    </div>
    <div className="w3-quarter">
      <div className="w3-card w3-white">
        <img src="/w3images/mountains.jpg" alt="Mountains" style={{width: '100%'}} />
        <div className="w3-container">
          <h3>Customer 3</h3>
          <h4>Trade</h4>
          <p>Blablabla</p>
          <p>Blablabla</p>
          <p>Blablabla</p>
          <p>Blablabla</p>
        </div>
      </div>
    </div>
  </div>
  {/* Container */}
  <div className="w3-container" style={{position: 'relative'}}>
    <a onclick="w3_open()" className="w3-button w3-xlarge w3-circle w3-teal" style={{position: 'absolute', top: '-28px', right: 24}}>+</a>
  </div>
  {/* Pricing Row */}
  <div className="w3-row-padding w3-center w3-padding-64" id="pricing">
    <h2>PRICING</h2>
    <p>Choose a pricing plan that fits your needs.</p><br />
    <div className="w3-third w3-margin-bottom">
      <ul className="w3-ul w3-border w3-hover-shadow">
        <li className="w3-theme">
          <p className="w3-xlarge">Basic</p>
        </li>
        <li className="w3-padding-16"><b>10GB</b> Storage</li>
        <li className="w3-padding-16"><b>10</b> Emails</li>
        <li className="w3-padding-16"><b>10</b> Domains</li>
        <li className="w3-padding-16"><b>Endless</b> Support</li>
        <li className="w3-padding-16">
          <h2 className="w3-wide"><i className="fa fa-usd" /> 10</h2>
          <span className="w3-opacity">per month</span>
        </li>
        <li className="w3-theme-l5 w3-padding-24">
          <button className="w3-button w3-teal w3-padding-large"><i className="fa fa-check" /> Sign Up</button>
        </li>
      </ul>
    </div>
    <div className="w3-third w3-margin-bottom">
      <ul className="w3-ul w3-border w3-hover-shadow">
        <li className="w3-theme-l2">
          <p className="w3-xlarge">Pro</p>
        </li>
        <li className="w3-padding-16"><b>25GB</b> Storage</li>
        <li className="w3-padding-16"><b>25</b> Emails</li>
        <li className="w3-padding-16"><b>25</b> Domains</li>
        <li className="w3-padding-16"><b>Endless</b> Support</li>
        <li className="w3-padding-16">
          <h2 className="w3-wide"><i className="fa fa-usd" /> 25</h2>
          <span className="w3-opacity">per month</span>
        </li>
        <li className="w3-theme-l5 w3-padding-24">
          <button className="w3-button w3-teal w3-padding-large"><i className="fa fa-check" /> Sign Up</button>
        </li>
      </ul>
    </div>
    <div className="w3-third w3-margin-bottom">
      <ul className="w3-ul w3-border w3-hover-shadow">
        <li className="w3-theme">
          <p className="w3-xlarge">Premium</p>
        </li>
        <li className="w3-padding-16"><b>50GB</b> Storage</li>
        <li className="w3-padding-16"><b>50</b> Emails</li>
        <li className="w3-padding-16"><b>50</b> Domains</li>
        <li className="w3-padding-16"><b>Endless</b> Support</li>
        <li className="w3-padding-16">
          <h2 className="w3-wide"><i className="fa fa-usd" /> 50</h2>
          <span className="w3-opacity">per month</span>
        </li>
        <li className="w3-theme-l5 w3-padding-24">
          <button className="w3-button w3-teal w3-padding-large"><i className="fa fa-check" /> Sign Up</button>
        </li>
      </ul>
    </div>
  </div>
  {/* Contact Container */}
  <div className="w3-container w3-padding-64 w3-theme-l5" id="contact">
    <div className="w3-row">
      <div className="w3-col m5">
        <div className="w3-padding-16"><span className="w3-xlarge w3-border-teal w3-bottombar">Contact Us</span></div>
        <h3>Address</h3>
        <p>Swing by for a cup of coffee, or whatever.</p>
        <p><i className="fa fa-map-marker w3-text-teal w3-xlarge" />&nbsp;&nbsp;Chicago, US</p>
        <p><i className="fa fa-phone w3-text-teal w3-xlarge" />&nbsp;&nbsp;+00 1515151515</p>
        <p><i className="fa fa-envelope-o w3-text-teal w3-xlarge" />&nbsp;&nbsp;test@test.com</p>
      </div>
      <div className="w3-col m7">
        <form className="w3-container w3-card-4 w3-padding-16 w3-white" action="/action_page.php" target="_blank">
          <div className="w3-section">      
            <label>Name</label>
            <input className="w3-input" type="text" name="Name" required />
          </div>
          <div className="w3-section">      
            <label>Email</label>
            <input className="w3-input" type="text" name="Email" required />
          </div>
          <div className="w3-section">      
            <label>Message</label>
            <input className="w3-input" type="text" name="Message" required />
          </div>  
          <input className="w3-check" type="checkbox" defaultChecked name="Like" />
          <label>I Like it!</label>
          <button type="submit" className="w3-button w3-right w3-theme">Send</button>
        </form>
      </div>
    </div>
  </div>
  {/* Image of location/map */}
  <img src="/w3images/map.jpg" className="w3-image w3-greyscale-min" style={{width: '100%'}} />
  {/* Footer */}
  <footer className="w3-container w3-padding-32 w3-theme-d1 w3-center">
    <h4>Follow Us</h4>
    <a className="w3-button w3-large w3-teal" href="javascript:void(0)" title="Facebook"><i className="fa fa-facebook" /></a>
    <a className="w3-button w3-large w3-teal" href="javascript:void(0)" title="Twitter"><i className="fa fa-twitter" /></a>
    <a className="w3-button w3-large w3-teal" href="javascript:void(0)" title="Google +"><i className="fa fa-google-plus" /></a>
    <a className="w3-button w3-large w3-teal" href="javascript:void(0)" title="Google +"><i className="fa fa-instagram" /></a>
    <a className="w3-button w3-large w3-teal w3-hide-small" href="javascript:void(0)" title="Linkedin"><i className="fa fa-linkedin" /></a>
    <p>Powered by <a href="https://www.w3schools.com/w3css/default.asp" target="_blank">w3.css</a></p>
    <div style={{position: 'relative', bottom: 100, zIndex: 1}} className="w3-tooltip w3-right">
      <span className="w3-text w3-padding w3-teal w3-hide-small">Go To Top</span>   
      <a className="w3-button w3-theme" href="#myPage"><span className="w3-xlarge">
          <i className="fa fa-chevron-circle-up" /></span></a>
    </div>
  </footer>
</>

                
                </div>
                </div>

        )
    }
}
export default about;