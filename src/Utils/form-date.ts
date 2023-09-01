function formatDate(dateString: number): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

export default formatDate;
