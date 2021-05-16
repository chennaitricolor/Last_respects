
const getZoneList = () => {
    const zones = [
        {
            label: "Select",
            value: "Select"
        },
        {
            label: "South",
            value: "South"
        },
        {
            label: "Central",
            value: "Central"
        },
        {
            label: "North",
            value: "North"
        }
    ];
    return zones;
}

const getSiteList = () => {
    const sites = [
        {
            label: "Select",
            value: "Select"
        },
        {
            label: "Ambattur",
            value: "Ambattur"
        },
        {
            label: "Ayanavaram",
            value: "Ayanavaram"
        },
        {
            label: "Egmore",
            value: "Egmore"
        }
    ];
    return sites;
}

export { getZoneList, getSiteList };