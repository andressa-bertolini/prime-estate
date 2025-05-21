import { useSearch } from "@context/SearchContext";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { 
    Autocomplete, 
    TextField,
    Slider,
    InputAdornment
} from '@mui/material';
import { SearchService } from "@services/search/SearchService";
import ChoiceChips from "../ChoiceChips";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { Option } from "./search.types";
import { searchDefaultValues } from "@context/SearchContext";

const Search = () => {
    const [urlSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const { searchParams: {
        query, purpose, homeType, price, beds, baths, sqft
    }, setSearchParams } = useSearch();

    const [minPrice, setMinPrice] = useState(purpose === "sale" ? 50000 : 1000);
    const [maxPrice, setMaxPrice] = useState(purpose === "sale" ? 1000000 : 10000);
    const [places, setPlaces] = useState([]);
    const [openFilter, setOpenFilter] = useState(false);
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const options = ["Apartment", "House"].map(opt => opt.toLowerCase());
    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    const setQuery = (newQuery: string) => {
        setSearchParams(prev => ({
            ...prev,
            query: newQuery
        }));
    };

    const setPurpose = (newPurpose: string) => {
        setSearchParams(prev => ({
            ...prev,
            purpose: newPurpose
        }));
    };

    const setHomeType = (newHomeType: string) => {
        setSearchParams(prev => ({
            ...prev,
            homeType: newHomeType
        }));
    };

    const setPrice = (newPrice: [number, number]) => {
        setSearchParams(prev => ({
            ...prev,
            price: newPrice
        }));
    };

    const setBeds = (newBeds: number) => {
        setSearchParams(prev => ({
            ...prev,
            beds: newBeds
        }));
    };

    const setBaths = (newBaths: number) => {
        setSearchParams(prev => ({
            ...prev,
            baths: newBaths
        }));
    };

    const setSqft = (newSqft: number) => {
        setSearchParams(prev => ({
            ...prev,
            sqft: newSqft
        }));
    };

    const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = event.currentTarget.value;
        setQuery(newQuery);

        if(newQuery.trim().length === 0){
            setIsSearching(false);
        }else{
            setIsSearching(true);
        }
    }

    const handlePurposeValue = (data: string) => {
        setPurpose(data);
        if (data === "sale") {
          setMinPrice(50000);
          setMaxPrice(1000000);
          setPrice([50000, 1000000]);
        } else {
          setMinPrice(1000);
          setMaxPrice(10000);
          setPrice([1000, 10000]);
        }
    };

    const handlePriceChange = (event: Event, newValue: number | number[]) => {
        setPrice(newValue as [number, number]);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLImageElement>) => {
        const params = new URLSearchParams();
        if (query) params.append('query', query);
        if (purpose) params.append('purpose', purpose);
        if (homeType) params.append('homeType', homeType);
        if (price[0] !== minPrice) params.append('priceMin', String(price[0]));
        if (price[1] !== maxPrice) params.append('priceMax', String(price[1]));
        if (beds) params.append('beds', String(beds));
        if (baths) params.append('baths', String(baths));
        if (sqft) params.append('sqft', String(sqft));

        e.preventDefault();
        setOpenFilter(false);
        navigate(`/properties?${params.toString()}`);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSubmit(event);
        }
    };

    useEffect(() => {
        let isCalled = false;

        const loadPlaces = async () => {
            if (isCalled) return;
            isCalled = true;

            const placesData = await SearchService.fetchPlaces();
            const states = placesData.map((state) => ({
                name: state.name,
                type: "state"
            }));

            const cities = placesData.flatMap(state =>
                state.cities ? state.cities.map(city => ({ name: city, type: "city" })) : []
            );

            setPlaces([...states, ...cities]);
        };

        loadPlaces();
    },[])

    useEffect(() => {
        const hasQueryParams = Array.from(urlSearchParams.keys()).length > 0;
        
        if (hasQueryParams) {
            const queryParam = urlSearchParams.get("query") || '';
            const purposeParam = urlSearchParams.get("purpose") || searchDefaultValues.purpose;
            const homeTypeParam = urlSearchParams.get("homeType") || searchDefaultValues.homeType;
            
            const isPurposeSale = purposeParam === 'sale';
            const defaultMinPrice = isPurposeSale ? 50000 : 1000;
            const defaultMaxPrice = isPurposeSale ? 1000000 : 10000;
            
            const priceMin = Number(urlSearchParams.get("priceMin")) || defaultMinPrice;
            const priceMax = Number(urlSearchParams.get("priceMax")) || defaultMaxPrice;
            const bedsParam = Number(urlSearchParams.get("beds")) || "";
            const bathsParam = Number(urlSearchParams.get("baths")) || "";
            const sqftParam = Number(urlSearchParams.get("sqft")) || "";
            
            setMinPrice(isPurposeSale ? 50000 : 1000);
            setMaxPrice(isPurposeSale ? 1000000 : 10000);
            
            setSearchParams({
                query: queryParam,
                purpose: purposeParam,
                homeType: homeTypeParam,
                price: [priceMin, priceMax],
                beds: bedsParam,
                baths: bathsParam,
                sqft: sqftParam,
            });
        }
    }, [urlSearchParams]);

    return (
        <form onSubmit={handleSubmit}>
            <div className="search-options">
                <div className="search-options__tab" onClick={() => setOpenFilter(!openFilter)}>
                    {openFilter ? "Hide filters": "More filters" }
                    open{/* <img src={IconCaretDown} alt="Toggle filters" className={(openFilter ? "rotate" : "")}/> */}
                </div>
                <div className={(openFilter ? "open" : "") + "search-fields"}>
                    <div>
                        <label>
                            <span>Where do you want to live?</span>
                            <Autocomplete
                                freeSolo
                                value={places.find(p => p.name === query) || { name: query, type: '' }}
                                options={places}
                                getOptionLabel={(option) => option.name || ''}
                                groupBy={(option) => option.type}
                                className="custom-input"
                                onInputChange={(event, newInputValue) => {
                                    setQuery(newInputValue);
                                }}
                                renderGroup={(params) => (
                                    <li key={params.key}>
                                      <div
                                        style={{
                                          position: 'sticky',
                                          top: -8,
                                          zIndex: 1,
                                          backgroundColor: '#fff',
                                          textTransform: 'uppercase',
                                          fontWeight: 'bold',
                                          padding: '8px 12px',
                                          borderBottom: '1px solid #eee',
                                          margin: 0,
                                        }}
                                      >
                                        {params.group}
                                      </div>
                                      <ul style={{ paddingLeft: 0, margin: 0 }}>{params.children}</ul>
                                    </li>
                                )}
                                renderInput={(params) => 
                                    <TextField 
                                        {...params}
                                        placeholder="State or city"
                                        InputProps={{
                                            ...params.InputProps,
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LocationOnOutlinedIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                }
                            />
                        </label>
                        <label>
                            <span>Property Type</span>
                            <Autocomplete
                                options={options}
                                value={homeType}
                                disableClearable
                                className="custom-input"
                                onChange={(event, newValue) => {
                                    setHomeType(newValue);
                                }}
                                getOptionLabel={(option) => capitalize(option)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        inputProps={{
                                            ...params.inputProps,
                                            readOnly: true,
                                            value: capitalize(homeType),
                                        }}
                                        InputProps={{
                                            ...params.InputProps,
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <HomeOutlinedIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                )}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            <span>Transaction Type</span>
                            <ChoiceChips purposeValue={handlePurposeValue} />
                        </label>
                        <label>
                            <span>Price limit</span>
                            <div className="search-options__range">
                                <Slider
                                    className="custom-slider"
                                    value={price}
                                    onChange={handlePriceChange}
                                    valueLabelDisplay="off"
                                    min={minPrice}
                                    max={maxPrice}
                                    step={100}
                                />
                                <p>
                                    from&nbsp;
                                    <strong>${price && price[0] ? price[0].toLocaleString('en-US') : minPrice.toLocaleString('en-US')}</strong>&nbsp;
                                    to&nbsp;
                                    <strong>${price && price[1] ? price[1].toLocaleString('en-US') : maxPrice.toLocaleString('en-US')}</strong>
                                </p>
                            </div>
                        </label>
                    </div>
                </div>
            </div>
            <button type="submit" className="search-bar__submit">Search</button>
        </form>
    );
};

export default Search;