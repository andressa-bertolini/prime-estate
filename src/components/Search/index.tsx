import ChoiceChips from "../ChoiceChips";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { 
    Autocomplete, 
    TextField,
    Slider,
    InputAdornment
} from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { Option } from "./search.types";

const Search = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    
    const paramQuery = searchParams.get("query") || "";
    const paramPurpose = searchParams.get("purpose") || "rent";
    const paramHomeType = searchParams.get("homeType") || "apartment";
    const paramPriceMin = Number(searchParams.get("priceLimit")) || 0;
    const paramPriceMax = Number(searchParams.get("priceLimit")) || 0;
    const paramBeds = searchParams.get("beds") || 0;
    const paramBaths = searchParams.get("baths") || 0;
    const paramSqft = Number(searchParams.get("sqft")) || 5000;

    const [query, setQuery] = useState(paramQuery);
    const [purpose, setPurpose] = useState(paramPurpose);
    const [homeType, setHomeType] = useState<string>(paramHomeType);
    const [price, setPrice] = useState<number[]>([1000, 5000]);
    const [beds, setBeds] = useState(paramBeds);
    const [baths, setBaths] = useState(paramBaths);
    const [sqft, setSqft] = useState<number>(paramSqft);

    const [openFilter, setOpenFilter] = useState(false);
    const [isSearching, setIsSearching] = useState<boolean>(false);

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
            // setRangeMin(1000);
            // setRangeMax(5000000);
            // if(!priceRange){setPriceRange(5000000)};
        } else if (data === "rent") {
            // setRangeMin(100);
            // setRangeMax(50000);
            // if(!priceRange){setPriceRange(50000)};
        }
    };

    const handlePriceChange = (event: Event, newValue: number | number[]) => {
        setPrice(newValue as number[]);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLImageElement>) => {
        e.preventDefault();
        setOpenFilter(false);
        navigate(`/properties?query=${query}&purpose=${purpose}&homeType=${homeType}&priceLimit=${price[0]}&beds=${beds}&baths=${baths}&sqft=${sqft}`);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSubmit(event);
        }
    };

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
                                options={[]}
                                className="custom-input"
                                onInputChange={(event, newInputValue) => {
                                    setQuery(newInputValue);
                                }}
                                renderInput={(params) => 
                                    <TextField 
                                        {...params}
                                        placeholder="State, city or neighborhood"
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
                                options={["Apartment", "House"]}
                                defaultValue="Apartment"
                                disableClearable
                                className="custom-input"
                                onInputChange={(event, newInputValue) => {
                                    setHomeType(newInputValue);
                                }}
                                renderInput={(params) => (
                                    <TextField 
                                    {...params}
                                    inputProps={{
                                        ...params.inputProps,
                                        readOnly: true, 
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
                        {/* <label>
                            <span>Beds</span>
                            <div className="custom-select" ref={selectRef2}>
                                <div className="custom-select__trigger" onClick={toggleDropdown2}>
                                    <span>{beds}</span>
                                    <div className="arrow"></div>
                                </div>
                                {isOpen2 && (
                                    <div className="custom-options">
                                        <div className="custom-option" onClick={() => handleSelect2(0)}>0</div>
                                        <div className="custom-option" onClick={() => handleSelect2(1)}>1</div>
                                        <div className="custom-option" onClick={() => handleSelect2(2)}>2</div>
                                        <div className="custom-option" onClick={() => handleSelect2(3)}>3</div>
                                        <div className="custom-option" onClick={() => handleSelect2(4)}>4</div>
                                        <div className="custom-option" onClick={() => handleSelect2(5)}>5+</div>
                                    </div>
                                )}
                            </div>

                        </label> */}
                        {/* <label>
                            <span>Baths</span>
                            <div className="custom-select" ref={selectRef3}>
                                <div className="custom-select__trigger" onClick={() => {setIsOpen3(!isOpen3)}}>
                                    <span>{baths}</span>
                                    <div className="arrow"></div>
                                </div>
                                {isOpen3 && (
                                    <div className="custom-options">
                                        <div className="custom-option" onClick={() => handleDropdown3(0)}>0</div>
                                        <div className="custom-option" onClick={() => handleDropdown3(1)}>1</div>
                                        <div className="custom-option" onClick={() => handleDropdown3(2)}>2</div>
                                        <div className="custom-option" onClick={() => handleDropdown3(3)}>3</div>
                                        <div className="custom-option" onClick={() => handleDropdown3(4)}>4</div>
                                        <div className="custom-option" onClick={() => handleDropdown3(5 )}>5+</div>
                                    </div>
                                )}
                            </div>
                        </label> */}
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
                                    valueLabelDisplay="auto"
                                    min={0}
                                    max={10000}
                                    step={100}
                                />
                                {/* <p>${priceRange.toLocaleString('en-US')}</p> */}
                            </div>
                        </label>
                        {/* <label>
                            <span>Square feet</span>
                            <div className="search-options__range">
                                <input 
                                    type="range" 
                                    min={1}
                                    max={5000}
                                    step={1}
                                    value={sqft}
                                    onChange={(e) => {setSqft(Number(e.target.value))}}
                                    style={{
                                        background: `linear-gradient(to right, #1296a9 ${percentage()}%, #8d8c8c ${percentage()}%)`,
                                    }}
                                />
                                <p>{sqft}</p>
                            </div>
                        </label> */}
                    </div>
                </div>
            </div>
            <button type="submit" className="search-bar__submit">Search</button>
        </form>
    );
};

export default Search;
