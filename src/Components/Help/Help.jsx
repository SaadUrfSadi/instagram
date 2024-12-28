import React from 'react';
import './Help.css';

function Help() {
  return (
    <>
    <section>
        <div className="help-container">
            <div className="helps-tags">
                <a href="https://about.meta.com/" style={{border:"none"}}>Meta</a>
                <a href="https://about.instagram.com/" style={{border:"none"}}>About</a>
                <a href="https://about.instagram.com/blog/" style={{border:"none"}}>Blogs</a>
                <a href="" style={{border:"none"}}>Jobs</a>
                <a href="https://help.instagram.com/" style={{border:"none"}}>Help</a>
                <a href="">API</a>
                <a href="https://privacycenter.instagram.com/policy/?entry_point=ig_help_center_data_policy_redirect" style={{border:"none"}}>Privacy</a>
                <a href="https://help.instagram.com/581066165581870/" style={{border:"none"}}>Terms</a>
                <a href="https://www.instagram.com/explore/locations/" style={{border:"none"}}>Locations</a>
                <a href="https://www.instagram.com/web/lite/" style={{border:"none"}}>Instagram Lite</a>
                <a href="about:blank" style={{border:"none"}}>Thread</a>
                <a href="https://www.facebook.com/help/instagram/261704639352628" style={{border:"none"}}>Contact</a>
                <a href="https://www.instagram.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2Faccounts%2Fmeta_verified%2F%3Fentrypoint%3Dweb_footer%26__coig_login%3D1" style={{border:"none"}}>Meta Verified</a>
            </div>
            <div className="copy-right">
                <p>&#169;<span>  2024 Instagram from Meta</span></p>
            </div>
        </div>
    </section>
    </>
  )
}

export default Help