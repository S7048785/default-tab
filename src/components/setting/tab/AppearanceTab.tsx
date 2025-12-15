import {useTheme} from "@/components/theme/ThemeProvider.tsx";
import styled from 'styled-components';

export default function AppearanceTab() {
	const {theme, setTheme} = useTheme();

	return (
			<div className="p-4 rounded-lg flex flex-col gap-4 bg-gray-50 dark:bg-gray-800/50">
				<div className="flex items-center justify-between">
					<div>
						<p className="text-sm font-medium text-gray-900 dark:text-gray-100">{theme === "dark" ? "深色模式" : "浅色模式"}</p>
						<p className="text-xs text-gray-500 dark:text-gray-400">切换深色或浅色主题</p>
					</div>
						<div className="relative mr-4">
							<Switch value={theme === "dark"} onChange={() => setTheme(theme === "dark" ? "light" : "dark")}></Switch>
						</div>
				</div>
			</div>
	)
}


const Switch = ({value, onChange}: {value: boolean, onChange: () => void}) => {
	return (
		<StyledWrapper>
			<label className="switch">
				<input type="checkbox" checked={value} onChange={onChange} />
				<span className="slider" />
			</label>
		</StyledWrapper>
	);
}

const StyledWrapper = styled.div`
  .switch {
    position: absolute;
    top: 50%;
    width: 30px;
    height: 60px;
    padding: 2px;
    left: 50%;
    transform: translate(-50%,-50%);
  }

  .switch input {
    opacity: 0;
    height: 0;
    width: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 20px;
    border: 1px solid rgba(0,0,0,0.2);
    border-style: outset;
    background-color: white;
    transition: 0.4s;
  }

  .slider::before {
    content: "🌞";
    font-size: 22px;
    line-height: 15px;
    border-radius: 100%;
    position: absolute;
    left: -0.8px;
    top: 8px;
    background-color: transparent;
    transition: 0.4s;
  }

  .switch > input:checked + .slider {
    background-color: #000429;
  }

  .switch > input:checked + .slider:before {
    content: "🌑";
    font-size: 22px;
    line-height: 25px;
    background-color: transparent;
    transform: translateY(24px);
  }`;

