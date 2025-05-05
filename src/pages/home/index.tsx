import { useQuery } from "@tanstack/react-query";
import { PropertiesService } from "@services/properties/PropertiesService";
import { IProperty } from "@types/properties.types"

/* Components */
import Search from "@components/Search";
import Banner from "@components/Banner";
import Property from "@components/Property";
import Skeleton from "@components/Skeleton";
import FullBackgroundCTA from "@layouts/FullBackgroundCTA";

/* Images */
import Savings from "@assets/images/savings.jpg";
import HomeKeys from "@assets/images/home-keys.jpg";
import IconTeam from "@assets/icons/icon-team.svg";
import IconHandshake from "@assets/icons/icon-handshake.svg";
import IconBulb from "@assets/icons/icon-bulb.svg";

const Home = () => {
    const usePropertyQuery = (queryKey: string, queryFn: () => Promise<IProperty[]>) => {
        return useQuery({
            queryKey: [queryKey],
            staleTime: 1000 * 60 * 30,
            queryFn,
        });
    };

    const { data: propertiesRent, isError: isErrorRent, isLoading: isPendingRent } = 
        usePropertyQuery("propertiesRent", () => PropertiesService.fetchProperties({ purpose: "rent" }));

    const { data: propertiesSale, isError: isErrorSale, isLoading: isPendingSale } = 
        usePropertyQuery("propertiesSale", () => PropertiesService.fetchProperties({ purpose: "sale" }));

    return(
        <>  
            <div className="home-search search-container">
                <div className="search">
                    <div className="home-search__wrapper">
                        <h1>Find your dream home</h1>
                        <Search />
                    </div>
                </div>
            </div>
            <Banner 
                heading="Featured properties"
                title="Rent a Home"
                buttonText="Explore Renting"
                linkUrl="/properties?purpose=for-rent"
            />
            <div className="properties-list">
                {isPendingRent && 
                    <>
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                    </>
                }
                {!isPendingRent && Array.isArray(propertiesRent) && propertiesRent.map((property: IProperty) => (
                    <Property property={property} key={property.id} />
                ))}
            </div>
            <FullBackgroundCTA
                image={Savings}
                imageAlignment="center center"
                text="Smart Home Buying Starts Here: Calculate Your Down Payment"
                buttonText="Calculate"
                link="calculator"
            />
            <Banner 
                heading="Featured properties"
                title="Buy a Home"
                buttonText="Explore Buying"
                linkUrl="/properties?purpose=for-sale"
            />
            <div className="properties-list">
                {isPendingSale && 
                    <>
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                    </>
                }
                {!isPendingSale && Array.isArray(propertiesSale) && propertiesSale.map((property: IProperty) => (
                    <Property property={property} key={property.id} />
                ))}
            </div>
            <FullBackgroundCTA
                image={HomeKeys}
                imageAlignment="center bottom"
                text="Your Perfect Home Awaits: Meet the Realtors Who Can Help"
                buttonText="Learn More"
                link="agents"
            />
            <div className="home-about">
                <h2>Prime Estate: Your Trusted Partner in Real Estate</h2>
                <p>Helping You Find the Perfect Home with Ease and Confidence</p>
                <div className="home-about__topics">
                    <div>
                        <img src={IconTeam} alt="Idea"/>
                        <h4>Expert Guidance</h4>
                        <p>Our experienced real estate professionals are here to assist you every step of the way, whether you're buying, selling, or renting.</p>
                    </div>
                    <div>
                        <img src={IconHandshake} />
                        <h4>Personalized Service</h4>
                        <p>We understand that every client is unique, and we tailor our services to match your specific needs and preferences.</p>
                    </div>
                    <div>
                        <img src={IconBulb} />
                        <h4>Seamless Experience</h4>
                        <p>With cutting-edge technology and market insights, we make property searching and transactions smooth, efficient, and stress-free.</p>
                    </div>
                </div>
                {/* About Us */}
            </div>
        </>
    );
};

export default Home;