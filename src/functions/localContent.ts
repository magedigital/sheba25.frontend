const getLocalKey = (name: string): string => `content-${name}`;

const setLocalContent = <T extends {}>(name: string, data: T): void => {
    const localKey = getLocalKey(name);

    localStorage.setItem(localKey, JSON.stringify(data));
};

const deleteLocalContent = (name: string): void => {
    const localKey = getLocalKey(name);

    localStorage.removeItem(localKey);
};

const getLocalContent = <T extends {}>(name: string): T | undefined => {
    const localKey = getLocalKey(name);

    const data = localStorage.getItem(localKey);

    if (data) {
        try {
            return JSON.parse(data);
        } catch (error) {}
    }
};

export { setLocalContent, getLocalContent, deleteLocalContent };
