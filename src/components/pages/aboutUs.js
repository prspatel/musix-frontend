
import React, { useContext } from "react";
import Nav from '../nav/nav1';
import Nav2 from "../nav/nav2";
import Footer from "../nav/footer";
import jess from '../../images/jess.jpg';
import preet from '../../images/preet.jpg';
import trish from '../../images/trish.jpg';
import UserContext from "../misc/userContext";
import "../../CSS/pages/aboutUs.css"

export default function AboutUs() {
    const { userData } = useContext(UserContext);

    return(
        <>
            <div className="aboutus-body">
            {userData && userData.user ? <Nav2 /> : <Nav />}
                <div className= "aboutus-content">
                    <h1 className="aboutUs-header"> About Us </h1>
                    <hr className="solid" />
                    <div className="aboutUsText">
                        <p><b>Musix</b> is a 100% web based platform aimed at providing an ability to users to create mixtapes of their own choice on the web with ease. 
                        Users can create multiple mixtapes, play it on the web, and share them publicly. With our Collex feature, users can group together playlists based around a topic or genre, and interact with others in the Musix community through likes and comments.
                            Musix is a purely virtual environment to provide users the best experience of creating the best playlist of their best songs and sharing it with other users.</p>
                        <p>Please be aware that we do not own rights to the songs. We depend on the <b>Spotify API</b>  and the music player for giving users the experince to play songs on our application. Users require <b>Spotify Premium</b> account to tune in the songs and load the Musix web player. In future, we will try to extend the application to support music playing on our platform itself.</p>
                        <p>Now let us introduce you to the creators of this <b>Musix</b>. Starting from the left in the Photos below: First, <a href="https://www.linkedin.com/in/pspatel1312/" target="_blank"><b>Preet Patel</b></a> is a graduating senior majoring in computer science from
                            Stony Brook University. Preet's hobbies are playing cricket, hiking and video games. He is really interested into Cloud Services and Stock Trading. Second,<a href="https://www.linkedin.com/in/jessica-guan-2a5458181/" target="_blank"> <b>Jessica Guan</b> </a>is a senior majoring in Computer Science and Applied Mathematics
                            from Stony Brook University. She was born and raised in New York. Her hobbies include playing the piano, appreciating old and new movies, and heading out for any food adventures. She love meeting new people and making new friends! Moreover,
                            is interested in Software Engineering and Cloud Computing. Finally, <a href="https://www.linkedin.com/in/trishant-chhetry-48300415b/" target="_blank"><b>Trishant Chhetry</b></a> is a graduating senior majoring in computer science from Stony Brook University as well. Trish was born and raised in Queens, New York with his parents and younger brother. In his spare time,
                            he likes to binge only the best television series' that there are; his favorite show is The Wire. An aspiring software engineer, Trish is currently looking for a position, so please refer him to any companies that you can. </p>
                    </div>
                
                    <div className="row">
                        <div className="column">
                            <img src={ preet } alt="Snow" style={{ width:"300px", height:"300px"}}/>
                         </div>
                        <div className="column">
                            <img src={jess} alt="Forest" style={{ width: "300px", height: "300px" }} />
                         </div>
                         <div className="column">
                            <img src={trish} alt="Mountains" style={{ width: "300px", height: "300px" }}/>
                         </div>
                    </div>
                </div>
                <Footer />
            </div>

        </>
    );

}