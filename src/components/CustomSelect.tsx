import React, { useState } from "react";
import { getCinemas } from "../services/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
interface Option {
    id: number;
    logo: string;
    name: string;
    description: string;
}

// interface CustomSelectProps {
//     options: Option[];
// }

const CustomSelect: React.FC = () => {
    // const options = [
    //     { value: "option1", label: "Option 1" },
    //     { value: "option2", label: "Option 2" },
    //     { value: "option3", label: "Option 3" },
    // ];
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);
    const [options, setOptions] = useState<any[]>([]);

    const onSuccess = ({ data }: { data: any }) => {
        console.log("SUCCESS:", data);
        setOptions(data);
    };

    const onError = ({ data }: { data: any }) => {
        console.log("ERROR:", data);
    };

    const handleSelectToggle = () => {
        getCinemas(onSuccess, onError);
        setIsOpen(!isOpen);
    };

    const handleOptionSelect = (option: Option) => {
        console.log(option);
        setSelectedOption(option);
        setIsOpen(false);
    };

    return (
        <div className={`custom-select ${isOpen ? "open" : ""}`}>
            <div className="select-header" onClick={handleSelectToggle}>
                <FontAwesomeIcon icon={faLocationDot} />
                {selectedOption ? selectedOption.name : "Wybierz swoje kino"}
            </div>
            {isOpen && (
                <div className="select-options">
                    {options.map((option) => (
                        <div
                            key={option.id}
                            className="select-option"
                            onClick={() => {
                                handleOptionSelect(option);
                            }}
                        >
                            <div className="image-container">
                                <div className="image" style={{ backgroundImage: `url("${option.logo}")` }}></div>
                            </div>
                            {option.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomSelect;
