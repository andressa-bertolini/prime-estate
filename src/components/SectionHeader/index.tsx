import "./sectionHeader.css";
import { SectionHeaderProps } from "./sectionHeader.types";

import { NavLink } from "react-router-dom";

const SectionHeader = ({ heading, title, buttonText, linkUrl }: SectionHeaderProps) => {
    return(
        <div className="section-header">
            <div className="section-header-content container">
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

export default SectionHeader;