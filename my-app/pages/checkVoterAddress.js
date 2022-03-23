import styles from "../styles/Home.module.css";
const CheckVoterAddress = ({
    voterAddressToCheck,
    setVoterAddressToCheck,
    checkAddressVoter,
    voterStatus,
}) => {
    const handleNewAddressToCheckVote = (e) => {
        setVoterAddressToCheck(e.target.value);
    };
    return (
        <div>
            <h4>Check an address vote status</h4>
            <div
                className={styles.description}
                >
                <input
                    value={voterAddressToCheck}
                    onChange={handleNewAddressToCheckVote}
                />
                <button onClick={checkAddressVoter}>Check</button>
            </div>
            {voterStatus !== 'An error has occured' && voterStatus && (
                <div className={styles.description}>
                    <h4>Voter Status</h4>
                    <p>Account: {voterAddressToCheck}</p>
                    <p>Voted: {voterStatus?.voted?.toString()}</p>
                    <p>Vote Weight: {Number(voterStatus?.weight?._hex)}</p>
                </div>
            )}{' '}
            {voterStatus === 'An error has occured' && <p>{voterStatus}</p>}
        </div>
    );
};

export default CheckVoterAddress;