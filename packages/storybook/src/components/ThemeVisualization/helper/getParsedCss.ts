import cssParser from 'css';

export const getParsedCss = () => {
  const styleElements = document.querySelectorAll('style');

  const stylesArray = Array.from(styleElements);

  const themeElement = stylesArray.find((element) =>
    element.innerText.startsWith(':root')
  );

  if (!themeElement) {
    throw new Error('Theme style element is not found');
  }

  return cssParser.parse(themeElement?.innerText);
};
