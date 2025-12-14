import styled from 'styled-components';
import {useState} from "react";
import useThemeStore from "../stores/themeStore.ts";
import {searchArray} from "../lib/selectEngine.ts";


const SearchRadio = () => {
	const selectEngine = localStorage.getItem('search-engine') || searchArray[0].name
	const [select, setSelect] = useState(selectEngine)
	const isDark = useThemeStore().isDark;

	// 动态选择样式组件
	const Wrapper = isDark ? StyledWrapper : StyledWrapperLight;

	// 提取公共渲染逻辑
	const renderRadioInputs = () => (
		searchArray.map((item, index) => (
			<label
				key={index}
				className={"label"}
				onClick={() => {
					localStorage.setItem('search-engine', item.name);
					setSelect(item.name);
				}}
			>
				<input
					type="radio"
					defaultChecked={select === item.name}
					name="value-radio"
				/>
				<p className="text">{item.name}</p>
			</label>
		))
	);

	return (
		<div className={"overflow-y-scroll h-80% p-2 scrollbar"}>
				<Wrapper>
					<div className="radio-input">
						{renderRadioInputs()}
					</div>
				</Wrapper>
		</div>
	);
}

const StyledWrapper = styled.div`
  .radio-input {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .radio-input label {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 0 20px;
    width: 100%;
    cursor: pointer;
    height: 50px;
    position: relative;
    z-index: 1;
  }

  .radio-input label::before {
    position: absolute;
    content: "";
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 45px;
    z-index: -1;
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    border: 2px solid transparent;
  }

  .radio-input label:hover::before {
    transition: all 0.2s ease;
    background-color: #2a2e3c;
    border-radius: 15px;
  }

  .radio-input .label:has(input:checked)::before {
    background-color: #2d3750;
    border-color: #435dd8;
    height: 50px;
    border-radius: 15px;
  }

  .radio-input .label .text {
    color: #fff;
  }

  .radio-input .label input[type="radio"] {
    background-color: #202030;
    appearance: none;
    width: 17px;
    height: 17px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .radio-input .label input[type="radio"]:checked {
    background-color: #435dd8;
    -webkit-animation: puls 0.7s forwards;
    animation: pulse 0.7s forwards;
  }

  .radio-input .label input[type="radio"]:before {
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    transition: all 0.1s cubic-bezier(0.165, 0.84, 0.44, 1);
    background-color: #fff;
    transform: scale(0);
  }

  .radio-input .label input[type="radio"]:checked::before {
    transform: scale(1);
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
    }
    70% {
      box-shadow: 0 0 0 8px rgba(255, 255, 255, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
    }
  }`;

const StyledWrapperLight = styled.div`
  .radio-input {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .radio-input label {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 0 20px;
    width: 100%;
    cursor: pointer;
    height: 50px;
    position: relative;
    z-index: 1;
  }

  .radio-input label::before {
    position: absolute;
    content: "";
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 45px;
    z-index: -1;
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    border-radius: 15px;
    border: 2px solid transparent;
  }

  .radio-input label:hover {
    transition: all 0.2s ease;
    background-color: #efefef;
    border-radius: 15px;
  }

  .radio-input .label:has(input:checked)::before {
    background-color: #fff;
    border-color: #435dd8;
    height: 50px;
  }

  .radio-input .label .text {
    color: #000;
  }

  .radio-input .label input[type="radio"] {
    background-color: #ccc;
    appearance: none;
    width: 17px;
    height: 17px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .radio-input .label input[type="radio"]:checked {
    background-color: #435dd8;
    -webkit-animation: puls 0.7s forwards;
    animation: pulse 0.7s forwards;
  }

  .radio-input .label input[type="radio"]:before {
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    transition: all 0.1s cubic-bezier(0.165, 0.84, 0.44, 1);
    background-color: #fff;
    transform: scale(0);
  }

  .radio-input .label input[type="radio"]:checked::before {
    transform: scale(1);
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
    }
    70% {
      box-shadow: 0 0 0 8px rgba(255, 255, 255, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
    }
  }`;

export default SearchRadio;
