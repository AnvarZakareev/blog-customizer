import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';

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
	const [styleSettings, setStyleSettings] = useState(defaultArticleState);

	const handleFormChange = (articleStyleSettings: ArticleStateType) => {
		setStyleSettings(articleStyleSettings);
	};

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': styleSettings.fontFamilyOption.value,
					'--font-size': styleSettings.fontSizeOption.value,
					'--font-color': styleSettings.fontColor.value,
					'--container-width': styleSettings.contentWidth.value,
					'--bg-color': styleSettings.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm style={styleSettings} onChange={handleFormChange} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
