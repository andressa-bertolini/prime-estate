import IconTeam from "@assets/icons/icon-team.svg";
import IconTeamWhite from "@assets/icons/icon-team-white.svg";
import IconHandshake from "@assets/icons/icon-handshake.svg";
import IconHandshakeWhite from "@assets/icons/icon-handshake-white.svg";
import IconBulb from "@assets/icons/icon-bulb.svg";
import IconBulbWhite from "@assets/icons/icon-bulb-white.svg";


const AboutTopics = ({iconsColor}) => {
  return(
    <div className="home-about__topics">
    <div>
        {iconsColor == 'white' ? <img src={IconTeamWhite} alt="Team"/> : <img src={IconTeam} alt="Team"/>}
        <h4>Expert Guidance</h4>
        <p>Our experienced real estate professionals are here to assist you every step of the way, whether you're buying, selling, or renting.</p>
    </div>
    <div>
        {iconsColor == 'white' ? <img src={IconHandshakeWhite} alt="Handshake"/> : <img src={IconHandshake} alt="Handshake"/>}
        <h4>Personalized Service</h4>
        <p>We understand that every client is unique, and we tailor our services to match your specific needs and preferences.</p>
    </div>
    <div>
        {iconsColor == 'white' ? <img src={IconBulbWhite} alt="Experience"/> : <img src={IconBulb} alt="Experience"/>}
        <h4>Seamless Experience</h4>
        <p>With cutting-edge technology and market insights, we make property searching and transactions smooth, efficient, and stress-free.</p>
    </div>
</div>
)}

export default AboutTopics;