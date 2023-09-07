function handleImageError(e) {
    e.target.onerror = null;
    e.target.src = 'https://lumpics.ru/wp-content/uploads/2017/11/Programmyi-dlya-sozdaniya-avatarok.png';
}

export default handleImageError;