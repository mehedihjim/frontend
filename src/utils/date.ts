export const getLastAndFirstDayOfYear = (year?: number) => {
    year = year || new Date().getFullYear();
    const firstDay = new Date(year, 0, 1).toLocaleDateString("en-CA");
    const lastDay = new Date(year, 11, 31).toLocaleDateString("en-CA");
    return { firstDay, lastDay };
}