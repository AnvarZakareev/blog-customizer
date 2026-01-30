import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import {
	OptionType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';
import React, { useState } from 'react';
import clsx from 'clsx';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

type TextProps = {
	font: OptionType | null;
	size: OptionType | null;
	color: OptionType | null;
	backgroundColors: OptionType | null;
	contentWidth: number | string;
};

export const ArticleParamsForm = (props: {
	textProps: TextProps;
	onChange: (props: TextProps) => void;
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [font, setFont] = useState(props.textProps.font);
	const [fontColor, setFontColor] = useState(props.textProps.color);
	const [backgroundColor, setBackgroundColor] = useState(
		props.textProps.backgroundColors
	);
	const [contentWidth, setContentWidth] = useState(contentWidthArr[0]);

	const formClear = () => {
		console.log('clear');
		setFont(props.textProps.font);
		setFontColor(props.textProps.color);
		setBackgroundColor(props.textProps.backgroundColors);
		setContentWidth(contentWidthArr[0]);
	};

	const formSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		console.log('submit');
		props.onChange({
			font,
			size: fontSizeOptions[0],
			color: fontColor,
			backgroundColors: backgroundColor,
			contentWidth: contentWidth.value,
		});

		// setIsOpen(false);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			{isOpen && (
				<aside
					className={clsx(styles.container, {
						[styles.container_open]: isOpen,
					})}>
					{/* <form className={styles.form}> */}
					<form className={styles.form} onSubmit={formSubmit}>
						<Text as='h2' size={31} weight={800} uppercase dynamicLite>
							Задайте параметры
						</Text>
						<Select
							selected={font}
							options={fontFamilyOptions}
							onChange={setFont}
							title='шрифт'></Select>
						<RadioGroup
							name={''}
							options={fontSizeOptions}
							selected={{
								title: fontSizeOptions[0].title,
								value: '',
								className: '',
								optionClassName: undefined,
							}}
							title={'размер'}
						/>
						<Select
							selected={fontColor}
							options={fontColors}
							onChange={setFontColor}
							title='Цвет шрифта'
						/>
						<Separator />
						<Select
							selected={backgroundColor}
							options={backgroundColors}
							onChange={setBackgroundColor}
							title='Цвет фона'
						/>
						<Select
							selected={contentWidth}
							options={contentWidthArr}
							onChange={setContentWidth}
							title='Ширина контента'
						/>
						<div className={styles.bottomContainer}>
							<Button
								title='Сбросить'
								htmlType='reset'
								type='clear'
								onClick={formClear}
							/>

							<Button title='Применить' htmlType='submit' type='apply' />
						</div>
					</form>
				</aside>
			)}
		</>
	);
};
