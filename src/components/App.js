import React, { Component } from 'react';
import Web3 from 'web3';
import Identicon from 'identicon.js';
import './App.css';
import SocialNetwork from '../abis/SocialNetwork.json'
import TokenSCN from '../abis/TokenSCN.json'
import Navbar from './Navbar'
import Main from './Main'

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
    await this.loadToken()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    // Network ID
    const networkId = await web3.eth.net.getId()
    const networkData = SocialNetwork.networks[networkId]
    if(networkData) {
      const socialNetwork = new web3.eth.Contract(SocialNetwork.abi, networkData.address)
      this.setState({ socialNetwork })
      const postCount = await socialNetwork.methods.postCount().call()
      this.setState({ postCount })
      // Load Posts
      for (let i = 1; i <= postCount; i++) {
        const post = await socialNetwork.methods.posts(i).call()
        this.setState({
          posts: [...this.state.posts, post]
        })
      }
      // Sort posts. Show highest tipped posts first
      this.setState({
        posts: this.state.posts.sort((a,b) => {
          if (b.vote > a.vote) {
            return 1; 
          } else if (b.vote < a.vote) {
            return -1; 
          } else { 
            if (b.tipAmount > a.tipAmount) {
              return 1;
            } else if (b.tipAmount < a.tipAmount) {
              return -1;
            } else {
              return 0;
            }
          }
        })
      })

      const isVoteTemp = this.state.isVotes.concat()
      for (let i = 1; i <= postCount; i++) {
        const status = await this.state.socialNetwork.methods.getVote(this.state.account, i).call();
        isVoteTemp[i-1] = status
      }
      
      this.setState({isVotes: isVoteTemp})
      // console.log("post: ", this.state.posts);
      console.log("vote", this.state.isVotes);
      
      this.setState({ loading: false})
    } else {
      window.alert('SocialNetwork contract not deployed to detected network.')
    }
  }

  async loadToken() {
    const web3 = window.web3
    const networkId = await web3.eth.net.getId()
    const networkData = TokenSCN.networks[networkId]
    if(networkData) {
      const tokenSCN = new web3.eth.Contract(TokenSCN.abi, networkData.address)
      this.setState({tokenSCN})

      const tokenTotal = await tokenSCN.methods.balanceOf(this.state.account).call()
      this.setState({tokenTotal: tokenTotal})
    } else {
      window.alert('No token found')
    }
  }

  createPost(content) {
    this.setState({ loading: true })
    this.state.socialNetwork.methods.createPost(content).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
      this.reloadPage()
    })
  }

  tipPost(id, tipAmount) {
    this.setState({ loading: true })
    this.state.socialNetwork.methods.tipPost(id).send({ from: this.state.account, value: tipAmount })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
      this.reloadPage()
    })
  }

  votePost(id){
    this.setState({ loading: true })
    this.state.socialNetwork.methods.votePost(id).send({ from: this.state.account})
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
      this.reloadPage()
    })
  }

  transferToken(address, value){
    this.setState({ loading: true })
    this.state.tokenSCN.methods.transfer(address, value).send({ from: this.state.account})
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
    this.reloadPage()
  }

  reloadPage() {
    window.location.reload()
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      socialNetwork: null,
      tokenSCN: null,
      postCount: 0,
      posts: [],
      isVotes:[],
      tokenTotal: 0,
      loading: true
    }

    this.createPost = this.createPost.bind(this)
    this.tipPost = this.tipPost.bind(this)
    this.votePost = this.votePost.bind(this)
    this.transferToken = this.transferToken.bind(this)
    this.reloadPage = this.reloadPage.bind(this);
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        { this.state.loading
          ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          : <Main
              posts={this.state.posts}
              createPost={this.createPost}
              tipPost={this.tipPost}
              tokenTotal={this.state.tokenTotal} 
              votePost={this.votePost}
              isVote={this.state.isVotes}
              account={this.state.account}
              transferToken={this.transferToken}
            />
        }
      </div>
    );
  }
}

export default App;
