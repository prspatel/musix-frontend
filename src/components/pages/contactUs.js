import React, { useState, useEffect } from 'react';
import Nav from '../nav/nav2';
import Footer from "../nav/footer";

import "../../CSS/pages/contactUs.css"

export default function Contact() {
    return(
        <>
            <Nav/>
            <h1 className="contactUs-header"> Contact Us </h1>
            <hr className="solid" />
            <div className = "contactUsText">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis purus rutrum, ullamcorper lacus semper, condimentum tortor. Mauris malesuada, mi eget pellentesque laoreet, velit velit pellentesque lacus, at lobortis dui ante ac massa. Vivamus accumsan at ex sit amet tristique. Donec et lacus purus. Integer interdum finibus lorem, non accumsan dui congue eget. Curabitur aliquam accumsan leo vel sodales. Aenean elementum velit et purus dictum, interdum cursus orci aliquet. Quisque blandit et felis malesuada viverra. Cras scelerisque lacinia mi a cursus. Maecenas id sem at lacus tincidunt sollicitudin. Sed feugiat risus vitae massa consectetur ultricies. Duis tempus justo ac purus suscipit ullamcorper.</p>
            </div>
            <Footer/>
        </>
    );

}