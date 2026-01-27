import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { OptionType } from 'src/constants/articleProps'; 
import styles from './ArticleParamsForm.module.scss';
import { useState } from 'react';
import clsx from 'clsx';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { backgroundColors, contentWidthArr, fontColors, fontFamilyOptions } from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';

type TextProps = {
  font: OptionType | null;
  color: OptionType | null;
  backgroundColors: OptionType | null;
  contentWidth: number | string;
};

export const ArticleParamsForm = (
	props: {
	textProps: TextProps;
	onChange: (props: TextProps) => void;
}

) => {
	const [isOpen, setIsOpen] = useState(false);
	const [font, setFont] = useState(props.textProps.font);
	const [fontColor, setFontColor] = useState(props.textProps.color);
	const [backgroundColor, setBackgroundColor] = useState(props.textProps.backgroundColors);
	const [contentWidth, setContentWidth] = useState(contentWidthArr[0])

	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => setIsOpen(!isOpen)
				}
			/>
			{isOpen && (
				<aside
					className={clsx(styles.container, {
						[styles.container_open]: isOpen,
					})}>
					<form className={styles.form}>
						<Text as='h2' size={31} weight={800} uppercase dynamicLite>
						Задайте параметры</Text>
						<Select selected={font} options={fontFamilyOptions} onChange={setFont} title='шрифт'></Select>
						{/* <RadioGroup name='' options={} selected={
							
						}/> */}
						<Select selected={fontColor} options={fontColors} onChange={setFontColor} title='Цвет шрифта'/>
						<Select selected={backgroundColor} options={backgroundColors} onChange={setBackgroundColor} title='Цвет фона'/>
						<Select selected={contentWidth} options={contentWidthArr} onChange={setContentWidth} title='Ширина контента'/>
						<div className={styles.bottomContainer}>
							<Button title='Сбросить' htmlType='reset' type='clear' />
							<Button title='Применить' htmlType='submit' type='apply' />
						</div>
					</form>
				</aside>
			)}
		</>
	);
};
