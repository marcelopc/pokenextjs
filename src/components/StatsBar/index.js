import styles from './style.module.css';

export function StatsBars({stats = "Status", min ="0"}) {
    function calculateBar(min){
        const width = (min * 100) / 180;
        return { width: `${width}%`}
    }

    return (
        <div className={styles.container}>
            <div className={styles.stats}>
                <p>{stats}</p>
                <p>{min}</p>
            </div>
            <div className={styles.statsBars}>
                <div className={styles.bar} style={calculateBar(min)}>
                </div>
            </div>
        </div>
    );
} 