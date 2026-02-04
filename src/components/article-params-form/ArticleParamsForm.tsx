import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';
import React, { useState, useEffect } from 'react';
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
		setFont(style.fontFamilyOption);
		setSize(style.fontSizeOption);
		setFontColor(style.fontColor);
		setBackgroundColor(style.backgroundColor);
		setContentWidth(style.contentWidth);
	}, [style]);

	const [isOpen, setIsOpen] = useState(false);
	const [font, setFont] = useState(style.fontFamilyOption);
	const [size, setSize] = useState(style.fontSizeOption);
	const [color, setFontColor] = useState(style.fontColor);
	const [background, setBackgroundColor] = useState(style.backgroundColor);
	const [width, setContentWidth] = useState(style.contentWidth);

	const formClear = () => {
		setFont(defaultArticleState.fontFamilyOption);
		setSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
	};

	const formSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		onChange({
			fontFamilyOption: font,
			fontSizeOption: size,
			fontColor: color,
			backgroundColor: background,
			contentWidth: width,
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
					<form className={styles.form} onSubmit={formSubmit}>
						<Text as='h2' size={31} weight={800} uppercase dynamicLite>
							Задайте параметры
						</Text>
						<Select
							selected={font}
							options={fontFamilyOptions}
							onChange={setFont}
							title='шрифт'
						/>
						<RadioGroup
							name={'size'}
							options={fontSizeOptions}
							selected={size}
							onChange={setSize}
							title='размер'
						/>
						<Select
							selected={color}
							options={fontColors}
							onChange={setFontColor}
							title='Цвет шрифта'
						/>
						<Separator />
						<Select
							selected={background}
							options={backgroundColors}
							onChange={setBackgroundColor}
							title='Цвет фона'
						/>
						<Select
							selected={width}
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
