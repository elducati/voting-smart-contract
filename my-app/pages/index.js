import { Contract, providers } from "ethers";
import { ethers } from "ethers";
import { formatEther } from "ethers/lib/utils";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";
import {
  BALLOT_ABI,
  BALLOT_CONTRACT_ADDRESS,
} from "../constants";
import styles from "../styles/Home.module.css";
import CheckVoterAddress from "./checkVoterAddress";
import Proposals from "./proposal";
import AddVoter from "./addVoter";

export default function Home() {
  const [token, setToken] = useState();
  const [proposals, setProposals] = useState([]);
  const [chairperson, setChairperson] = useState('');
  const [voterAddressToCheck, setVoterAddressToCheck] = useState('');
  const [voterStatus, setVoterStatus] = useState();
  const [checkAddressVoter, setCheckAddressVoter] = useState('');
  const [newVoter, setNewVoter] = useState('');
  const [newVoterStatus, setNewVoterStatus] = ('');


  async function _initialize() {
    await _intializeEthers();
  }

  const _intializeEthers = async () => {
    // ethers connection for the smartcontract
    const _provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = await _provider.getSigner(0);
    const _token = new ethers.Contract(
      BALLOT_CONTRACT_ADDRESS,
      BALLOT_ABI,
      signer
    );

    console.log(_token)
    // get the proposals
    const newProposal = await _token.getAllProposals();

    // get the chairman address
    const newChairperson = await _token.chairperson();
    // save the token data into a hook to reuse it along the app

    setToken(_token);
    setProposals(newProposal);
    setChairperson(newChairperson);
  };
  const voteProposal = async (proposal) => {
    await token.vote(proposal);
  };
  // It gives the right to vote to a new address
	const addNewVoter = async () => {
		try {
			await token.giveRightToVote(newVoter);
			setNewVoterStatus('Success');
		} catch (err) {
			console.log(err);
			setNewVoterStatus('An error has occured');
		}
	};

  // Connects to the smart contract token id (check /contracts/contract-address.json)
  async function init() {
    const [selectedAddress] = await window.ethereum.enable();
    _initialize(selectedAddress);
  }

  useEffect(() => {
    // When the page loads it will initialize the init function
    // that we need to connect the frontend with the smartcontract
    init();
  }, []);

  return (
    <div className={styles.description}>
      <h1>Voting Smart Contract</h1>
      <div>
        <h4>chairperson: {chairperson}</h4>
      </div>      
      <Proposals proposals={proposals} voteProposal={voteProposal} />
      <AddVoter
				addNewVoter={addNewVoter}
				setNewVoter={setNewVoter}
				newVoter={newVoter}
				newVoterStatus={newVoterStatus}
			/>
      <CheckVoterAddress
        voterAddressToCheck = {voterAddressToCheck}
        setVoterAddressToCheck = {setVoterAddressToCheck}
        checkAddressVoter = {checkAddressVoter}
        voterStatus = {voterStatus}
        />
      <footer className={styles.footer}>
        Made with &#10084; by El Ducati
      </footer>
    </div>
  );
}