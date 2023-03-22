import Decentragram from '../abis/Decentragram.json'
import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from '../scenes/homePage/HomePage';
import { useMemo } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme/theme";
import { useAlert } from 'react-alert';
import ReactLoading from "react-loading";
import { useEffect } from "react";
require("dotenv").config();

//Declare IPFS
const ipfsClient = require('ipfs-http-client');
const projectId = "2NKrBI1kOXqIoQI9AKldOjK6eqI";
const projectSecret = "ec1c887351c1c0c40a9ad2b9cab08ded";
const auth =
  'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const ipfs = ipfsClient({
  host: 'ipfs.infura.io', port: 5001, protocol: 'https', headers: {
    authorization: auth,
  },
}) 
let images =[];
let SortedImages;

const App = () => {

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, [images]);


  const [account, setAccount] = React.useState('');
  const [decentragram, setDecentragram] = React.useState(null);
  // const [images, setImages] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [mode, setmode] = React.useState("light");
  const [buffer, setBuffer] = React.useState(null);

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  const setMode = () => {
    setmode(mode === "light" ? "dark" : "light")
  }

  alert = useAlert();

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      alert.error('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  const loadBlockchainData = async () => {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    setAccount(accounts[0]);
    // Network ID
    const networkId = await web3.eth.net.getId()
    const networkData = Decentragram.networks[networkId]
    if (networkData) {
      const decentragram = new web3.eth.Contract(Decentragram.abi, networkData.address)
      setDecentragram(decentragram)
      const imagesCount = await decentragram.methods.imageCount().call()
      // Load images
      for (var i = 1; i <= imagesCount; i++) {
        const image = await decentragram.methods.images(i).call()
        images.push(image);

        // let NewArray = [...images, image];
        // setImages(NewArray)
      }

      // Sort images. Show highest tipped images first
      SortedImages = images.sort((a, b) => b.tipAmount - a.tipAmount);
      console.log(images.sort((a, b) => b.tipAmount - a.tipAmount));
      // setImages(images.sort((a, b) => b.tipAmount - a.tipAmount))

      setLoading(false);
    } else {
      alert.error('Decentragram contract not deployed to detected network.')
    }
  }

  const captureFile = (acceptedFile) => {
    const file = acceptedFile;

    // preprocess the file to upload in IPFS.
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      setBuffer(Buffer(reader.result))
      console.log('buffer', buffer)
    }
  }

  const uploadImage = (description) => {
    console.log("Submitting file to ipfs...")

    //adding file to the IPFS
    ipfs.add(buffer, (error, result) => {
      console.log('Ipfs result', result)
      if (error) {
        console.log("error")
        console.error(error)
        return
      }
      setLoading(true)
      decentragram.methods.uploadImage(result[0].hash, description).send({ from: account }).on('transactionHash', (hash) => {
        setLoading(false);
      })
    })
  }

  const tipImageOwner = (id, tipAmount) => {
    setLoading(true)
    decentragram.methods.tipImageOwner(id).send({ from: account, value: tipAmount }).on('transactionHash', (hash) => {
      setLoading(false);
    })
  }
  return (
    // <div>
    //   <Navbar account={this.state.account} />
    //   {this.state.loading
    //     ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
    //     : <Main
    //       images={this.state.images}
    //       captureFile={this.captureFile}
    //       uploadImage={this.uploadImage}
    //       tipImageOwner={this.tipImageOwner}
    //     />
    //   }
    //   </div>
    <div className="app">

      {loading ?
        <div className="loader"><ReactLoading type="spokes" color="black" /></div> :
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
              <Route
                path="/"
                element={<HomePage
                  setMode={setMode}
                  account={account}
                  images={SortedImages}
                  captureFile={captureFile}
                  uploadImage={uploadImage}
                  tipImageOwner={tipImageOwner}
                  decentragram={decentragram}
                  buffer={buffer}
                  setBuffer={setBuffer}
                />}
              />
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
      }
    </div>
  );
}

export default App;
