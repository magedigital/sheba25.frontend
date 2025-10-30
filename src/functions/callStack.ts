type TaskT = () => Promise<void>;
type CbT = (data: number) => void;

export default function callStack(
    tasks: TaskT[],
    arr?: any[],
    callback?: CbT,
    len?: number,
    endLog?: boolean,
): Promise<any[] | void> {
    const resultArr = arr || [];
    const resultLen = len || tasks.length;

    if (tasks?.length > 0) {
        const task = tasks.shift() as TaskT;

        return task().then(
            (result) => {
                resultArr.push(result);

                if (typeof callback === 'function') {
                    callback(resultLen - tasks.length);
                }

                return callStack(tasks, resultArr, callback, resultLen, endLog);
            },
            (err) => {
                if (err === 'stop') {
                    return Promise.resolve();
                }

                if (typeof callback === 'function') {
                    callback(resultLen - tasks.length);
                }

                return callStack(tasks, resultArr, callback, resultLen, endLog);
            },
        );
    }

    return new Promise((resolve) => {
        if (typeof callback === 'function' || endLog) {
            console.log('Complete call tasks!');
        }

        resolve(resultArr);
    });
}
