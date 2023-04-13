import React, { Component } from 'react';
import Identicon from 'identicon.js';

class Main extends Component {
  render() {
    return (
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
            <div className="content mr-auto ml-auto">
              <p>&nbsp;</p>
                <form onSubmit={(event) => {
                  event.preventDefault()
                  const content = this.postContent.value
                  this.props.createPost(content)
                }}>
                <div className="form-group mr-sm-2">
                  <input
                    id="postContent"
                    type="text"
                    ref={(input) => { this.postContent = input }}
                    className="form-control"
                    placeholder="What's on your mind?"
                    required />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Share</button>
              </form>
              <p>&nbsp;</p>
              { this.props.posts.map((post, key) => {
                return(
                  <div className="card mb-4" key={key} >
                    <div className="card-header">
                      <img
                        alt='img'
                        className='mr-2'
                        width='30'
                        height='30'
                        src={`data:image/png;base64,${new Identicon(post.author, 30).toString()}`}
                      />
                      <small className="text-muted">{post.author}</small>
                    </div>
                    <ul id="postList" className="list-group list-group-flush">
                      <li className="list-group-item">
                        <p>{post.content}</p>
                      </li>
                      <li key={key}  className="list-group-item py-2">
                        <small className="float-left mt-1 text-muted">
                          TIPS: {window.web3.utils.fromWei(post.tipAmount.toString(), 'Ether')} ETH
                        </small>
                        
                        <button
                          className="btn btn-link btn-sm float-right pt-0"
                          onClick={(event) => {
                            console.log(key+1)
                            this.props.votePost(key+1)                
                          }}
                        >   
                          
                           <svg  version="1.0" width="20" height="20" viewBox="0 0 300.000000 300.000000" preserveAspectRatio="xMidYMid meet">
                            <g transform="translate(0.000000,300.000000) scale(0.100000,-0.100000)" fill={this.props.isVote(this.props.account,30) ? "red" :"black"} stroke="none">
                            <path d="M1587 2989 c-47 -7 -83 -41 -110 -99 -17 -35 -22 -68 -23 -147 -3 -112 -9 -133 -91 -323 -137 -315 -260 -524 -393 -666 -55 -57 -110 -128 -128 -163 l-33 -61 -32 18 c-28 15 -62 17 -272 17 -279 0 -304 -5 -376 -72 -87 -81 -84 -58 -84 -698 0 -628 -1 -616 73 -687 79 -77 86 -78 374 -78 241 0 261 1 303 21 l44 21 193 -21 c259 -28 555 -43 773 -39 l180 3 -74 17 c-53 13 -116 18 -225 18 -180 0 -369 12 -644 41 l-203 21 -51 -21 c-47 -19 -69 -21 -297 -21 l-247 0 -54 32 c-41 25 -60 45 -80 83 l-25 49 -3 530 c-2 353 1 547 8 580 15 71 52 120 113 151 50 25 55 25 285 25 140 0 251 -5 278 -11 42 -11 47 -10 70 12 14 13 35 41 45 62 11 20 58 78 105 127 46 49 116 138 155 197 80 123 235 431 303 604 42 105 46 124 46 201 0 139 27 198 114 252 26 16 32 17 65 3 20 -8 65 -27 101 -41 103 -42 164 -110 196 -220 13 -47 15 -85 11 -175 -4 -101 -12 -139 -57 -296 -55 -189 -82 -317 -73 -344 19 -53 54 -61 170 -37 189 39 449 45 576 11 207 -54 303 -202 256 -391 -11 -43 -10 -50 25 -123 30 -64 37 -90 37 -142 1 -81 -6 -109 -47 -186 -28 -54 -31 -66 -23 -100 5 -21 9 -71 9 -110 0 -91 -22 -151 -84 -231 -34 -45 -46 -69 -46 -94 0 -55 -20 -149 -40 -189 -65 -126 -204 -203 -450 -248 -149 -27 -175 -40 -85 -40 251 -2 490 110 569 267 29 58 50 154 42 194 -5 25 1 38 34 75 96 110 129 250 89 379 -8 27 -5 38 20 80 17 27 38 79 47 116 20 82 10 150 -37 245 -27 56 -29 67 -20 100 6 21 11 70 11 108 0 159 -109 281 -295 330 -134 36 -406 29 -621 -15 -53 -11 -98 -20 -101 -20 -16 0 17 152 79 365 45 152 51 183 55 296 8 177 -22 272 -114 361 -76 73 -210 115 -316 97z"/>
                            <path d="M1607 2840 c-25 -29 -27 -38 -27 -129 0 -91 -3 -103 -44 -206 -109 -272 -251 -551 -348 -688 -28 -40 -87 -111 -132 -158 -52 -54 -94 -111 -116 -155 l-35 -69 -3 -598 -2 -598 27 -28 c26 -25 38 -29 143 -39 284 -28 420 -35 785 -36 380 -1 392 0 470 22 146 42 231 100 278 187 18 32 22 57 22 128 0 86 1 90 31 120 56 56 93 117 105 172 10 46 9 64 -5 117 -9 35 -19 72 -22 83 -4 14 7 39 31 74 81 118 84 192 10 301 -39 58 -42 80 -20 133 21 52 19 140 -5 186 -70 139 -305 180 -677 120 -67 -11 -137 -24 -155 -30 -56 -16 -86 -11 -120 20 l-33 29 1 119 c1 110 4 128 49 278 65 217 74 265 75 371 0 100 -15 157 -56 211 -33 43 -100 81 -155 89 -42 6 -47 4 -72 -26z m147 -44 c67 -39 100 -113 100 -220 -1 -96 -13 -159 -64 -327 -51 -167 -70 -263 -70 -354 0 -84 14 -128 55 -165 36 -34 98 -33 280 3 110 22 170 29 280 29 211 2 321 -30 375 -108 32 -48 33 -121 2 -181 -12 -23 -22 -50 -22 -60 0 -10 21 -48 46 -84 72 -105 69 -183 -12 -280 -38 -46 -43 -82 -17 -132 23 -45 23 -151 -1 -197 -10 -19 -41 -59 -70 -88 l-51 -53 0 -97 c0 -84 -3 -102 -24 -135 -52 -85 -181 -145 -357 -167 -162 -21 -1031 11 -1229 45 l-30 5 0 547 c0 302 -2 566 -4 588 -7 65 44 159 142 263 91 96 149 174 224 302 65 111 175 339 249 515 56 135 59 144 62 240 4 146 5 149 53 142 21 -3 59 -17 83 -31z"/>
                            <path d="M251 1422 c-19 -9 -44 -30 -55 -45 -21 -28 -21 -41 -24 -560 -2 -362 0 -544 8 -569 7 -23 24 -48 47 -65 l36 -28 221 -3 c255 -3 273 1 313 78 l23 43 0 521 c0 521 0 522 -22 566 -39 75 -59 80 -303 80 -180 0 -215 -3 -244 -18z m472 -33 c13 -6 31 -23 40 -39 15 -25 17 -81 17 -555 0 -582 1 -572 -63 -595 -17 -5 -118 -10 -229 -10 -217 0 -244 6 -266 55 -16 34 -17 1076 -2 1105 23 44 54 49 272 50 128 0 216 -4 231 -11z"/>
                            </g>
                          </svg>
                          <i class="fas fa-heart"></i>
                           <span className='vote-number'>{post.vote}</span>
                        </button>
                        <button
                          className="btn btn-link btn-sm float-right pt-0"
                          name={post.id}
                          onClick={(event) => {
                            let tipAmount = window.web3.utils.toWei('0.1', 'Ether')
                            console.log(event.target.name, tipAmount)
                            this.props.tipPost(event.target.name, tipAmount)
                          }}
                        >
                          TIP 0.1 ETH
                        </button>
                      </li>
                    </ul>
                  </div>
                )
              })}
            </div>
          </main>
            <div className='position-absolute wallet' style={{right: '1rem'}}>
              <h4 className='text-center'>My wallet</h4>
              <ul className="navbar-nav">
                  <li className="nav-item active">
                      <p className=''>Token: {this.props.tokenTotal} SCN</p>
                  </li>
                  <li className="nav-item">
                      <div>
                        <p>To address: </p>
                        <input
                            id="toAddress"
                            type="text"
                            ref={(input) => { this.toAddress = input }}
                            className="form-control"
                            placeholder="0xC48.........e43"
                            required />
                        <p>Value: </p>
                          <input
                          id="transferToken"
                          type="number"
                          ref={(input) => { this.transferToken = input }}
                          className="form-control"
                          placeholder="10"
                          required />
                      </div>
                      <button 
                          type="submit"
                          className="btn btn-wallet btn-link btn-sm pt-0"
                          onClick={(event) => {
                            console.log('transfer')
                          }}
                        >
                          Transfer
                      </button>
                  </li>
                  <li className="nav-item">
                       
                  </li>
              </ul>
            </div>
        </div>
      </div>
    );
  }
}

export default Main;
