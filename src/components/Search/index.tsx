import ChoiceChips from "../ChoiceChips";
import IconCaretDown from "@assets/icons/icon-caret-down.svg";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { 
    Autocomplete, 
    TextField,
    Slider,
    InputAdornment
} from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

interface Option {
    label: string;
    value: string;
  }

const Search = () => {
    const [option, setOption] = useState("");

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setOption(event.target.value as string);
    };

    const [value, setValue] = useState<number[]>([1000, 5000]);

    const handleChange2 = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
      };
    
    const [searchParams] = useSearchParams();
    const paramQuery = searchParams.get("query") || "";
    const paramPurpose = searchParams.get("purpose") || "for-rent";
    const paramHomeType = searchParams.get("homeType") || "apartment";
    const paramPriceLimit = Number(searchParams.get("priceLimit")) || 0;
    const paramBeds = searchParams.get("beds") || 0;
    const paramBaths = searchParams.get("baths") || 0;
    const paramSqft = Number(searchParams.get("sqft")) || 5000;

    const [query, setQuery] = useState(paramQuery);
    const [purpose, setPurpose] = useState(paramPurpose);
    const [rangeMin, setRangeMin] = useState(100);
    const [rangeMax, setRangeMax] = useState(50000);
    const [priceRange, setPriceRange] = useState<number>(paramPriceLimit);
    const [homeType, setHomeType] = useState<string>(paramHomeType);

    const [openFilter, setOpenFilter] = useState(false);
    const [isSearching, setIsSearching] = useState<boolean>(false);

    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => setIsOpen(!isOpen);

    const [isOpen2, setIsOpen2] = useState(false);
    const [beds, setBeds] = useState(paramBeds);
    const toggleDropdown2 = () => setIsOpen2(!isOpen2);

    const [sqft, setSqft] = useState<number>(paramSqft);

    const calculatePercentage = () => 
        ((priceRange - rangeMin) / (rangeMax - rangeMin)) * 100;

    const percentage = () => ((sqft - 1) / (5000 - 1)) * 100;

    const selectRef = useRef<HTMLDivElement | null>(null);
    const selectRef2 = useRef<HTMLDivElement | null>(null);
    const selectRef3 = useRef<HTMLDivElement | null>(null);

    const options: Option[] = [
        { label: 'Apartment', value: '1' },
        { label: 'House', value: '2' }
    ];

    const [selectedValue, setSelectedValue] = useState<Option | null>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLImageElement>) => {
        e.preventDefault();
        setOpenFilter(false);
        navigate(`/properties?query=${query}&purpose=${purpose}&homeType=${homeType}&priceLimit=${priceRange}&beds=${beds}&baths=${baths}&sqft=${sqft}`);
    };

    const [selected, setSelected] = useState<string>("");
    const chips = ["Rent", "Buy"];

    const handlePurposeValue = (data: string) => {
        setPurpose(data);
        if (data === "for-sale") {
            setRangeMin(1000);
            setRangeMax(5000000);
            if(!priceRange){setPriceRange(5000000)};
        } else if (data === "for-rent") {
            setRangeMin(100);
            setRangeMax(50000);
            if(!priceRange){setPriceRange(50000)};
        }
    };

    const handleSelect = (type:string) => {
        setHomeType(type);
        setIsOpen(false);
    }

    const handleSelect2 = (number: number) => {
        const displayValue = number === 5 ? `${number}+` : number;
        setBeds(displayValue);
        setIsOpen2(false);
    }

    const [isOpen3, setIsOpen3] = useState(false);
    const [baths, setBaths] = useState(paramBaths);

    const handleDropdown3 = (baths: number) => {
        const displayValue = baths === 5 ? `${baths}+` : baths;
        setBaths(displayValue);
        setIsOpen3(false);
    }

    const handleClickOutside = (event: MouseEvent) => {
        if(selectRef.current && !selectRef.current.contains(event.target as Node)){
            setIsOpen(false);
        }
        if(selectRef2.current && !selectRef2.current.contains(event.target as Node)){
            setIsOpen2(false);
        }
        if(selectRef3.current && !selectRef3.current.contains(event.target as Node)){
            setIsOpen3(false);
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.addEventListener("mousedown", handleClickOutside);
        };
    },[]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSubmit(event);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = event.currentTarget.value;
        setQuery(newQuery);

        if(newQuery.trim().length === 0){
            setIsSearching(false);
        }else{
            setIsSearching(true);
        }
    }

    const locations = ["abu dabi","Dubai"];

    return (
        <form onSubmit={handleSubmit}>
            <div className="search-options">
                <div className="search-options__tab" onClick={() => setOpenFilter(!openFilter)}>
                    {openFilter ? "Hide filters": "More filters" }
                    <img src={IconCaretDown} alt="Toggle filters" className={(openFilter ? "rotate" : "")}/>
                </div>
                <div className={(openFilter ? "open" : "") + "search-fields"}>
                    <div>
                        <label>
                            <span>Where do you want to live?</span>
                            <Autocomplete
                                freeSolo
                                options={[]}
                                className="custom-input"
                                renderInput={(params) => 
                                    <TextField 
                                        {...params}
                                        placeholder="City, neighborhood, street..."
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
                                    value={value}
                                    onChange={handleChange2}
                                    valueLabelDisplay="auto"
                                    min={0}
                                    max={10000}
                                    step={100}
                                />
                                <p>${priceRange.toLocaleString('en-US')}</p>
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
