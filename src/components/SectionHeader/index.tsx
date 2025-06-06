import "./sectionHeader.css";
import { SectionHeaderProps } from "./sectionHeader.types";

import { NavLink } from "react-router-dom";

const SectionHeader = ({ heading, title, buttonText, linkUrl }: SectionHeaderProps) => {
    return(
        <div className="section-header">
            <div className="section-header-content container">
                <h2>{ title }</h2>
            </div>
        </div>
    )
}

export default SectionHeader;