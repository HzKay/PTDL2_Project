pragma solidity 0.5.0;

contract SocialNetwork {
    uint public postCount = 0;

    mapping(uint => Post) public posts;
    mapping(address => mapping(uint => bool)) public addressVotes;
    mapping(uint => mapping (uint => address)) public voterOfPost; 
    struct Post{
        uint id;
        string content;
        uint tipAmount;
        uint vote;
        address payable author;
    }

    event PostCreate(
        uint id,
        string content,
        uint tipAmount,
        uint vote,
        address payable author
    );

    event PostTipped(
        uint id,
        string content,
        uint tipAmount,
        address payable author
    );

    event Vote(
        uint id,
        address authorPost,
        address voter
    );

    function getVote(address addr, uint index) public view returns (bool) {
        return addressVotes[addr][index];
    }

    function createPost(string memory _content) public{
        // require valid content
        require(bytes(_content).length > 0);// if true continue excution 
        // Increment post
        postCount++;
        // create the post
        address payable payable_addr = address(uint160(msg.sender));
        posts[postCount] = Post(postCount, _content, 0, 0, payable_addr);
        // Trigger event
        emit PostCreate(postCount, _content, 0, 0, payable_addr);
    }

    function tipPost(uint _id) public payable {
        // make sure the id is valid
        require(_id > 0 && _id <= postCount);

        // fetch the post
        Post memory _post = posts[_id];
        // fetch the author
        address payable _author = _post.author;
        address payable payable_addr = address(uint160(_author));
        // pay the author by sending them Ether
        payable_addr.transfer(msg.value); // send and transfer just Object address payable not address
        // Incremet the tip amount
        _post.tipAmount = _post.tipAmount + msg.value;
        // update the post
        posts[_id] = _post;
        // trigger event
        emit PostTipped(postCount, _post.content, _post.tipAmount, _author);
    }

    function votePost(uint _id) public{
        require(_id > 0 && _id <= postCount);
        address payable voter = address(uint160(msg.sender)); 
        require(addressVotes[voter][_id] == false);
        Post memory _post = posts[_id];

        voterOfPost[_id][_post.vote] = voter;
        _post.vote = _post.vote + 1;

        posts[_id] = _post;
        addressVotes[voter][_id] = true;

        emit Vote(_post.id,_post.author, voter);
    }
}
