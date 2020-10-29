import Nav from '../nav/nav2';
import Footer from "../nav/footer";

import "../../CSS/pages/aboutUs.css"

export default function AboutUs() {
    return(
        <>
            <Nav/>
            <h1 className="aboutUs-header"> About Us </h1>
            <hr className="solid" />
            <div className = "aboutUsText">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis purus rutrum, ullamcorper lacus semper, condimentum tortor. Mauris malesuada, mi eget pellentesque laoreet, velit velit pellentesque lacus, at lobortis dui ante ac massa. Vivamus accumsan at ex sit amet tristique. Donec et lacus purus. Integer interdum finibus lorem, non accumsan dui congue eget. Curabitur aliquam accumsan leo vel sodales. Aenean elementum velit et purus dictum, interdum cursus orci aliquet. Quisque blandit et felis malesuada viverra. Cras scelerisque lacinia mi a cursus. Maecenas id sem at lacus tincidunt sollicitudin. Sed feugiat risus vitae massa consectetur ultricies. Duis tempus justo ac purus suscipit ullamcorper.</p>
            <p>Nullam a magna tincidunt, laoreet enim vitae, scelerisque ligula. Fusce ultrices nisl et orci placerat suscipit id a massa. Nullam vel erat in ante vestibulum iaculis. In at justo sed tortor laoreet luctus venenatis sed urna. Vivamus ut tempor massa, eget hendrerit metus. Phasellus leo magna, dictum quis placerat quis, pretium ac dui. Etiam tristique, justo vel suscipit sodales, ligula elit cursus leo, vitae pulvinar libero leo nec nisl.</p>
            <p>Maecenas quis elit blandit, ullamcorper dolor id, fermentum purus. Sed tellus neque, pharetra et semper ut, cursus id mauris. Etiam id sagittis dolor, a facilisis est. Vivamus efficitur, purus vel tempus ultricies, tortor elit auctor tellus, ut accumsan mi purus fringilla sapien. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque ac lacus a velit facilisis tempor in eleifend risus. Sed blandit, urna ut suscipit dapibus, justo est molestie erat, eu tincidunt quam orci eget nisi. Suspendisse pharetra auctor tellus in finibus. Vivamus rhoncus porta lorem, id dictum diam ultrices sed. In scelerisque ac lacus at laoreet. Phasellus volutpat tincidunt auctor. Curabitur dictum fringilla lectus, quis suscipit dui semper vitae. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec tincidunt condimentum augue non tempor. Duis bibendum interdum dolor ut cursus. Sed quis felis nec lectus eleifend sollicitudin eget mollis felis.</p>
            </div>
            <Footer/>
        </>
    );

}