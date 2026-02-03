import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [style, setStyle] = useState(defaultArticleState);
	// const [formStyle, setFormStyle] = useState<ArticleStateType>(defaultArticleState)

	// const applyStyle = (newStyle: ArticleStateType) => {
	// 	setFormStyle(newStyle);
	// };
	const handleFormChange = (fromForm: ArticleStateType) => {
		setStyle(fromForm);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': defaultArticleState.fontFamilyOption.value,
					'--font-size': defaultArticleState.fontSizeOption.value,
					'--font-color': defaultArticleState.fontColor.value,
					'--container-width': defaultArticleState.contentWidth.value,
					'--bg-color': defaultArticleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm style={style} onChange={handleFormChange} />
			<Article style={style} />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
