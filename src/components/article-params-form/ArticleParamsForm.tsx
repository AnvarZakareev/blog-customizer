import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	ArticleStateType,
} from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';
import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

interface ArticleParamsFormProps {
	style: ArticleStateType;
	onChange: (newStyle: ArticleStateType) => void;
}

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({
	style,
	onChange,
}) => {
	useEffect(() => {
		setFontFamily(style.fontFamilyOption);
		setFontSize(style.fontSizeOption);
		setFontColor(style.fontColor);
		setBackgroundColor(style.backgroundColor);
		setContentWidth(style.contentWidth);
	}, [style]);

	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [fontFamily, setFontFamily] = useState(style.fontFamilyOption);
	const [fontSize, setFontSize] = useState(style.fontSizeOption);
	const [fontColor, setFontColor] = useState(style.fontColor);
	const [backgroundColor, setBackgroundColor] = useState(style.backgroundColor);
	const [contentWidth, setContentWidth] = useState(style.contentWidth);
	const defaultStyle = useRef<ArticleStateType>(style);

	const clearForm = () => {
		onChange({ ...defaultStyle.current });
		setIsMenuOpen(false);
	};

	const submitForm = (event: React.FormEvent) => {
		event.preventDefault();
		onChange({
			fontFamilyOption: fontFamily,
			fontSizeOption: fontSize,
			fontColor: fontColor,
			backgroundColor: backgroundColor,
			contentWidth: contentWidth,
		});
		setIsMenuOpen(false);
	};

	return (
		<>
			<ArrowButton
				isOpen={isMenuOpen}
				onClick={() => setIsMenuOpen(!isMenuOpen)}
			/>
			{isMenuOpen && (
				<aside
					className={clsx(styles.container, {
						[styles.container_open]: isMenuOpen,
					})}>
					<form className={styles.form} onSubmit={submitForm}>
						<Text as='h2' size={31} weight={800} uppercase dynamicLite>
							Задайте параметры
						</Text>
						<Select
							selected={fontFamily}
							options={fontFamilyOptions}
							onChange={setFontFamily}
							title='шрифт'
						/>
						<RadioGroup
							name={'size'}
							options={fontSizeOptions}
							selected={fontSize}
							onChange={setFontSize}
							title='размер'
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
								onClick={clearForm}
							/>
							<Button title='Применить' htmlType='submit' type='apply' />
						</div>
					</form>
				</aside>
			)}
		</>
	);
};
