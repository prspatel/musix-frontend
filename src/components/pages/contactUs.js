
import React, { useContext, useState } from "react";
import Nav from '../nav/nav1';
import Footer from "../nav/footer";
import logo from '../../images/logo2.png';
import { Form , Button} from 'react-bootstrap';
import "../../CSS/pages/contactUs.css";
import Nav2 from "../nav/nav2";
import UserContext from "../misc/userContext";
import ErrorNotice from "../misc/error";
import Axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

export default function Contact() {
    const { userData } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [review, setReview] = useState("");
    const [error, setError] = useState();


    const submit = async (e) => {
        e.preventDefault();
        try {
            const reviewObject = { email, name, review }
            const reviewRes = await Axios.post(
                "/users/review",
                reviewObject
            );
            toast.success(reviewRes.data.msg, { position: "bottom-center" });
            setEmail("");
            setName("");
            setReview("");
        }
        catch (err) {
                err.response.data.msg && setError(err.response.data.msg);
        }
    }
    return(
        <>
            {userData && userData.user ? <Nav2 /> : <Nav />}
            <div className="aboutus-body">
                <div className="aboutus-content">
                    <h1 className="contactUs-header"> Contact Us </h1>
                    <hr className="solid" />
                    <div className = "contactUsText">
                        {/*<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis purus rutrum, ullamcorper lacus semper, condimentum tortor. Mauris malesuada, mi eget pellentesque laoreet, velit velit pellentesque lacus, at lobortis dui ante ac massa. Vivamus accumsan at ex sit amet tristique. Donec et lacus purus. Integer interdum finibus lorem, non accumsan dui congue eget. Curabitur aliquam accumsan leo vel sodales. Aenean elementum velit et purus dictum, interdum cursus orci aliquet.
                            Quisque blandit et felis malesuada viverra. Cras scelerisque lacinia mi a cursus. Maecenas id sem at lacus tincidunt sollicitudin. Sed feugiat risus vitae massa consectetur ultricies. Duis tempus justo ac purus suscipit ullamcorper.</p>*/}
                        <p>First of all <b>thank you</b> for stopping by <b>Musix</b>. <b>Musix</b> is built on providing the best customer service adn the most user friendly as well as a simple user interface for customers like
                            you to explore. To be the best, we have to take compliments and constructive feedback to imporve this application and be the best in the business. Below is a contact form which directly
                            goes to our customer service enhancement team. If your request is found valuable or popular and abides with our policies, we will make sure to fulfill it. Feel free to leave any kind of
                            constructive feedback. Keep using Musix and we will <b>play the moment</b> with you lifetime.</p>
                    </div >
                    <div className="contactFormdiv">
                        <Form className="contact-form" onSubmit={submit}>
                            <img className="logo" src={logo} alt="logo" />
                            {error && (
                                <ErrorNotice message={error} clearError={() => setError(undefined)} />
                            )}
                            <hr className="solid" />
                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Label style={{ float: "left"}}>Email address</Form.Label>
                                <Form.Control type="email" value={email} placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} required />
                            </Form.Group>

                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Label style={{ float: "left" }}>Full Name</Form.Label>
                                <Form.Control type="text" value={name} placeholder="Full Name" onChange={(e) => setName(e.target.value)} required />
                            </Form.Group>

                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label style={{ float: "left" }}>Message</Form.Label>
                                <Form.Control as="textarea" rows={3} value={review} onChange={(e) => setReview(e.target.value)} required />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Submit Review
                             </Button>
                        </Form>
                    </div>
                    <ToastContainer/>
                </div>
            </div>
            <Footer/>
        </>
    );

}