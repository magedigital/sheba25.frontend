const ymId = 96951425;

export default function sendGoal(name: string): void {
    if (window.ym) {
        name.split(',').forEach((key) => {
            window.ym!(ymId, 'reachGoal', key);
        });
    }
}
