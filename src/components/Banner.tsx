import { NavLink } from "react-router-dom";

interface BannerProps {
    heading: string;
    title: string;
    buttonText: string;
    linkUrl: string;
}

const Banner: React.FC<BannerProps> = ({ heading, title, buttonText, linkUrl }) => {
    return(
        <div className="banner">
            <div className="banner-content container">
                <div>
                    <h4>{ heading }</h4>
                    <h2>{ title }</h2>
                </div>
                <div>
                    <NavLink to={ linkUrl }>{ buttonText }</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Banner;