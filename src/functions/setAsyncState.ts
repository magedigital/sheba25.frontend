const setAsyncState = function <T extends React.Component>(
    this: T,
    data: Partial<T['state']>,
): Promise<void> {
    return new Promise((resolve) => {
        this.setState({ ...(data as any) }, resolve);
    });
};

export default setAsyncState;
